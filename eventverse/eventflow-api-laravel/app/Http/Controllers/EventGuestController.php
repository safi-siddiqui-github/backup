<?php

namespace App\Http\Controllers;

use App\Http\Traits\UtilTrait;
use App\Models\EventGuest;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class EventGuestController extends Controller
{
    use UtilTrait;

    public function index(Request $request)
    {
        return $this->responseHelper(function () use ($request) {
            //
            $eventGuests = EventGuest::query()
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
                ->when($request->integer('event_guest_group_id'), function (
                    $query,
                    $value,
                ) {
                    $query->where('event_guest_group_id', $value);
                })
                //
                ->when($request->boolean('with_event_model'), function (
                    $query,
                    $value,
                ) {
                    $query->with('eventModel');
                })
                //
                ->when($request->boolean('with_event_guest_group'), function (
                    $query,
                    $value,
                ) {
                    $query->with('eventGuestGroup');
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
                    'eventGuests' => $eventGuests,
                ],
            ]);
            //
        });
    }

    public function show(Request $request, $id)
    {
        return $this->responseHelper(function () use ($request, $id) {
            //
            $eventGuest = EventGuest::withTrashed()->find($id);
            //
            if (!$eventGuest) {
                throw ValidationException::withMessages([
                    'id' => ['Invalid id'],
                ]);
            }
            //
            if ($request->boolean('with_event_model')) {
                $eventGuest->load('eventModel');
            }
            //
            if ($request->boolean('with_event_guest_group')) {
                $eventGuest->load('eventGuestGroup');
            }
            //
            return response([
                'success' => true,
                'data' => [
                    'eventGuest' => $eventGuest,
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
                'event_guest_group_id' => [
                    'nullable',
                    'integer',
                    'exists:event_guest_groups,id',
                ],
                'name' => ['required', 'string'],
                'email' => ['required', 'string', 'email'],
                'phone' => ['required', 'string'],
                'plus_one' => ['nullable', 'integer'],
                'dietary_restriction' => ['nullable', 'string'],
                'note' => ['nullable', 'string'],
            ]);
            //
            $eventGuest =
                EventGuest::withTrashed()
                    ->where(
                        'event_model_id',
                        $request->integer('event_model_id'),
                    )
                    ->where(function ($query) use ($request) {
                        $query
                            ->where('name', $request->input('name'))
                            ->orWhere('email', $request->input('email'))
                            ->orWhere('phone', $request->input('phone'));
                    })
                    ->first() ?? null;
            //
            if ($eventGuest) {
                throw ValidationException::withMessages([
                    'name' => ['Guest already exist'],
                ]);
            }
            //
            $baseSlug = $request->input('email') . '-' . $this->uuidHelper();
            $slug = $this->slugifyHelper($baseSlug);
            //
            $eventGuest = new EventGuest();
            $eventGuest->slug = $slug;
            $eventGuest->event_model_id = $request->input('event_model_id');
            $eventGuest->event_guest_group_id = $request->input(
                'event_guest_group_id',
            );
            $eventGuest->name = $request->input('name');
            $eventGuest->email = $request->input('email');
            $eventGuest->phone = $request->input('phone');
            $eventGuest->plus_one = $request->input('plus_one');
            $eventGuest->dietary_restriction = $request->input(
                'dietary_restriction',
            );
            $eventGuest->note = $request->input('note');
            $eventGuest->save();
            //
            return response([
                'success' => true,
                'data' => [
                    'eventGuest' => $eventGuest,
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
                'event_guest_group_id' => [
                    'nullable',
                    'integer',
                    'exists:event_guest_groups,id',
                ],
                'name' => ['nullable', 'string'],
                'email' => ['nullable', 'string', 'email'],
                'phone' => ['nullable', 'string'],
                'plus_one' => ['nullable', 'integer'],
                'dietary_restriction' => ['nullable', 'string'],
                'note' => ['nullable', 'string'],
                'restore' => ['nullable', 'boolean'],
            ]);
            //
            $eventGuest = EventGuest::withTrashed()->find($id);
            //
            if (!$eventGuest) {
                throw ValidationException::withMessages([
                    'id' => ['Invalid id'],
                ]);
            }
            //
            $eventGuestSecond =
                EventGuest::withTrashed()
                    ->where('event_model_id', $eventGuest?->event_model_id)
                    ->where(function ($query) use ($request) {
                        $query
                            ->where('name', $request->input('name'))
                            ->orWhere('email', $request->input('email'))
                            ->orWhere('phone', $request->input('phone'));
                    })
                    ->first() ?? null;
            //
            if ($eventGuestSecond && $eventGuestSecond?->id != $id) {
                throw ValidationException::withMessages([
                    'name' => ['Guest already exist'],
                ]);
            }
            //
            // Should not be null
            if ($request->input('name')) {
                $eventGuest->name = $request->input('name');
            }
            // Should not be null
            if ($request->input('email')) {
                $eventGuest->email = $request->input('email');
            }
            // Should not be null
            if ($request->input('phone')) {
                $eventGuest->phone = $request->input('phone');
            }
            //
            // Dont Update Event Model id
            // if ($request->input('event_model_id')) {
            //     $eventGuest->event_model_id = $request->input(
            //         'event_model_id',
            //     );
            // }
            //
            if ($request->has('event_guest_group_id')) {
                $eventGuest->event_guest_group_id = $request->input(
                    'event_guest_group_id',
                );
            }
            //
            if ($request->has('plus_one')) {
                $eventGuest->plus_one = $request->input('plus_one');
            }
            //
            if ($request->has('dietary_restriction')) {
                $eventGuest->dietary_restriction = $request->input(
                    'dietary_restriction',
                );
            }
            //
            if ($request->has('note')) {
                $eventGuest->note = $request->input('note');
            }
            //
            if ($eventGuest->isDirty()) {
                $eventGuest->save();
            }
            //
            if ($request->has('restore') && $request->boolean('restore')) {
                $eventGuest->restore();
            }
            //
            return response([
                'success' => true,
                'data' => [
                    'eventGuest' => $eventGuest,
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
            $eventGuest = EventGuest::withTrashed()->find($id);
            //
            if (!$eventGuest) {
                throw ValidationException::withMessages([
                    'id' => ['Invalid id'],
                ]);
            }
            //
            $eventGuest->delete();
            //
            if ($request->boolean('force_delete')) {
                $eventGuest->forceDelete();
            }
            //
            return response([
                'success' => true,
            ]);
        });
    }
}
