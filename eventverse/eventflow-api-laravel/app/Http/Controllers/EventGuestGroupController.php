<?php

namespace App\Http\Controllers;

use App\Http\Traits\UtilTrait;
use App\Models\EventGuestGroup;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class EventGuestGroupController extends Controller
{
    use UtilTrait;

    public function index(Request $request)
    {
        return $this->responseHelper(function () use ($request) {
            //
            $eventGuestGroups = EventGuestGroup::query()
                //
                ->when($request->input('search'), function ($query, $value) {
                    $query
                        ->whereLike('name', "%$value%")
                        ->orWhereLike('description', "%$value%");
                })
                //
                ->when($request->integer('event_model_id'), function (
                    $query,
                    $value,
                ) {
                    $query->where('event_model_id', $value);
                })
                //
                ->when($request->integer('event_color_id'), function (
                    $query,
                    $value,
                ) {
                    $query->where('event_color_id', $value);
                })
                //
                ->when($request->boolean('with_event_model'), function (
                    $query,
                    $value,
                ) {
                    $query->with('eventModel');
                })
                //
                ->when($request->boolean('with_event_color'), function (
                    $query,
                    $value,
                ) {
                    $query->with('eventColor');
                })
                //
                ->when($request->boolean('with_trashed'), function (
                    $query,
                    $value,
                ) {
                    $query->withTrashed();
                })
                //
                ->when($request->boolean('only_trashed'), function (
                    $query,
                    $value,
                ) {
                    $query->onlyTrashed();
                })
                //
                ->get();
            //
            return response([
                'success' => true,
                'data' => [
                    'eventGuestGroups' => $eventGuestGroups,
                ],
            ]);
            //
        });
    }

    public function show(Request $request, $id)
    {
        return $this->responseHelper(function () use ($request, $id) {
            //
            $eventGuestGroup = EventGuestGroup::withTrashed()->find($id);
            //
            if (!$eventGuestGroup) {
                throw ValidationException::withMessages([
                    'id' => ['Invalid id'],
                ]);
            }
            //
            if ($request->boolean('with_event_model')) {
                $eventGuestGroup->load('eventModel');
            }
            //
            if ($request->boolean('with_event_color')) {
                $eventGuestGroup->load('eventColor');
            }
            //
            return response([
                'success' => true,
                'data' => [
                    'eventGuestGroup' => $eventGuestGroup,
                ],
            ]);
            //
        });
    }

    public function store(Request $request)
    {
        return $this->responseHelper(function () use ($request) {
            //
            $request->validate([
                'event_model_id' => [
                    'nullable',
                    'integer',
                    'exists:event_models,id',
                ],
                'event_color_id' => [
                    'nullable',
                    'integer',
                    'exists:event_colors,id',
                ],
                'name' => ['required', 'string'],
                'capacity' => ['nullable', 'integer'],
                'description' => ['nullable', 'string'],
            ]);
            //
            $eventGuestGroup =
                EventGuestGroup::withTrashed()
                    ->where(
                        'event_model_id',
                        $request->integer('event_model_id'),
                    )
                    ->where('name', $request->input('name'))
                    ->first() ?? null;
            //
            if ($eventGuestGroup) {
                throw ValidationException::withMessages([
                    'name' => ['Group already exist'],
                ]);
            }
            //
            $baseSlug = $request->input('name') . '-' . $this->uuidHelper();
            $slug = $this->slugifyHelper($baseSlug);
            //
            $eventGuestGroup = new EventGuestGroup();
            $eventGuestGroup->slug = $slug;
            $eventGuestGroup->event_model_id = $request->input(
                'event_model_id',
            );
            $eventGuestGroup->event_color_id = $request->input(
                'event_color_id',
            );
            $eventGuestGroup->name = $request->input('name');
            $eventGuestGroup->capacity = $request->input('capacity');
            $eventGuestGroup->description = $request->input('description');
            $eventGuestGroup->save();
            //
            return response([
                'success' => true,
                'data' => [
                    'eventGuestGroup' => $eventGuestGroup,
                ],
            ]);
        });
    }

    public function update(Request $request, $id)
    {
        return $this->responseHelper(function () use ($request, $id) {
            //
            $request->validate([
                'event_model_id' => [
                    'nullable',
                    'integer',
                    'exists:event_models,id',
                ],
                'event_color_id' => [
                    'nullable',
                    'integer',
                    'exists:event_colors,id',
                ],
                'name' => ['nullable', 'string'],
                'capacity' => ['nullable', 'integer'],
                'description' => ['nullable', 'string'],
                'restore' => ['nullable', 'boolean'],
            ]);
            //
            $eventGuestGroup = EventGuestGroup::withTrashed()->find($id);
            //
            if (!$eventGuestGroup) {
                throw ValidationException::withMessages([
                    'id' => ['Invalid id'],
                ]);
            }
            //
            $eventGuestGroupSecond =
                EventGuestGroup::withTrashed()
                    ->where('event_model_id', $eventGuestGroup?->event_model_id)
                    ->where('name', $request->input('name'))
                    ->first() ?? null;
            //
            if ($eventGuestGroupSecond && $eventGuestGroupSecond?->id != $id) {
                throw ValidationException::withMessages([
                    'name' => ['Group already exist'],
                ]);
            }
            //
            // Should not be null
            if ($request->input('name')) {
                $eventGuestGroup->name = $request->input('name');
            }
            //
            // Dont Update Event Model id
            // if ($request->input('event_model_id')) {
            //     $eventGuestGroup->event_model_id = $request->input(
            //         'event_model_id',
            //     );
            // }
            //
            if ($request->has('event_color_id')) {
                $eventGuestGroup->event_color_id = $request->input(
                    'event_color_id',
                );
            }
            //
            if ($request->has('description')) {
                $eventGuestGroup->description = $request->input('description');
            }
            //
            if ($request->has('capacity')) {
                $eventGuestGroup->capacity = $request->input('capacity');
            }
            //
            if ($eventGuestGroup->isDirty()) {
                $eventGuestGroup->save();
            }
            //
            if ($request->has('restore') && $request->boolean('restore')) {
                $eventGuestGroup->restore();
            }
            //
            return response([
                'success' => true,
                'data' => [
                    'eventGuestGroup' => $eventGuestGroup,
                ],
            ]);
        });
    }

    public function destroy(Request $request, $id)
    {
        return $this->responseHelper(function () use ($request, $id) {
            //
            $request->validate([
                'force_delete' => ['nullable', 'boolean'],
            ]);
            //
            $eventGuestGroup = EventGuestGroup::withTrashed()->find($id);
            //
            if (!$eventGuestGroup) {
                throw ValidationException::withMessages([
                    'id' => ['Invalid id'],
                ]);
            }
            //
            $eventGuestGroup->delete();
            //
            if ($request->boolean('force_delete')) {
                $eventGuestGroup->forceDelete();
            }
            //
            return response([
                'success' => true,
            ]);
        });
    }
}
