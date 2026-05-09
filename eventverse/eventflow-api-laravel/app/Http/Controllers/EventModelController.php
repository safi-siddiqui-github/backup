<?php

namespace App\Http\Controllers;

use App\Http\Traits\UtilTrait;
use App\Models\EventModel;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class EventModelController extends Controller
{
    use UtilTrait;

    public function index(Request $request)
    {
        return $this->responseHelper(function () use ($request) {
            //
            $eventModels = EventModel::query()
                //
                ->when($request->input('search'), function ($query, $value) {
                    $query
                        ->whereLike('name', "%$value%")
                        ->orWhereLike('description', "%$value%");
                })
                //
                ->when($request->boolean('only_public'), function (
                    $query,
                    $value,
                ) {
                    $query->where('is_private', false);
                })
                //
                ->when($request->boolean('only_private'), function (
                    $query,
                    $value,
                ) {
                    $query->where('is_private', true);
                })
                //
                ->when($request->integer('event_category_id'), function (
                    $query,
                    $value,
                ) {
                    $query->where('event_category_id', $value);
                })
                //
                ->when($request->integer('event_launch_strategy_id'), function (
                    $query,
                    $value,
                ) {
                    $query->where('event_launch_strategy_id', $value);
                })
                //
                ->when($request->boolean('with_event_category'), function (
                    $query,
                    $value,
                ) {
                    $query->with('eventCategory');
                })
                //
                ->when(
                    $request->boolean('with_event_launch_strategy'),
                    function ($query, $value) {
                        $query->with('eventLaunchStrategy');
                    },
                )
                //
                ->when($request->boolean('with_event_features'), function (
                    $query,
                    $value,
                ) {
                    $query->with('eventFeatures');
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
                    'eventModels' => $eventModels,
                ],
            ]);
            //
        });
    }

    public function show(Request $request, $id)
    {
        return $this->responseHelper(function () use ($request, $id) {
            //
            $eventModel = EventModel::withTrashed()->find($id);
            //
            if (!$eventModel) {
                throw ValidationException::withMessages([
                    'id' => ['Invalid id'],
                ]);
            }
            //
            if ($request->boolean('with_event_category')) {
                $eventModel->load('eventCategory');
            }
            //
            if ($request->boolean('with_event_launch_strategy')) {
                $eventModel->load('eventLaunchStrategy');
            }
            //
            if ($request->boolean('with_event_features')) {
                $eventModel->load('eventFeatures');
            }
            //
            return response([
                'success' => true,
                'data' => [
                    'eventModel' => $eventModel,
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
                'event_category_id' => [
                    'required',
                    'integer',
                    'exists:event_categories,id',
                ],
                'event_launch_strategy_id' => [
                    'nullable',
                    'integer',
                    'exists:event_launch_strategies,id',
                ],
                'name' => ['required', 'string'],
            ]);
            //
            $baseSlug = $request->input('name') . '-' . $this->uuidHelper();
            $slug = $this->slugifyHelper($baseSlug);
            //
            $eventModel = new EventModel();
            $eventModel->slug = $slug;
            $eventModel->event_category_id = $request->input(
                'event_category_id',
            );
            $eventModel->event_launch_strategy_id = $request->input(
                'event_launch_strategy_id',
            );
            $eventModel->name = $request->input('name');
            $eventModel->save();
            //
            return response([
                'success' => true,
                'data' => [
                    'eventModel' => $eventModel,
                ],
            ]);
        });
    }

    public function update(Request $request, $id)
    {
        return $this->responseHelper(function () use ($request, $id) {
            //
            $request->validate([
                'event_category_id' => [
                    'nullable',
                    'integer',
                    'exists:event_categories,id',
                ],
                'event_launch_strategy_id' => [
                    'nullable',
                    'integer',
                    'exists:event_launch_strategies,id',
                ],
                'name' => ['nullable', 'string'],
                'is_private' => ['nullable', 'boolean'],
                'restore' => ['nullable', 'boolean'],
            ]);
            //
            $eventModel = EventModel::withTrashed()->find($id);
            //
            if (!$eventModel) {
                throw ValidationException::withMessages([
                    'id' => ['Invalid id'],
                ]);
            }
            //
            // Should not be null
            if ($request->input('name')) {
                $eventModel->name = $request->input('name');
            }
            //
            // Not Nullable
            if ($request->input('event_category_id')) {
                $eventModel->event_category_id = $request->input(
                    'event_category_id',
                );
            }
            //
            if ($request->has('is_private')) {
                $eventModel->is_private = $request->boolean('is_private');
            }
            //
            if ($request->has('event_launch_strategy_id')) {
                $eventModel->event_launch_strategy_id = $request->input(
                    'event_launch_strategy_id',
                );
            }
            //
            if ($request->has('description')) {
                $eventModel->description = $request->input('description');
            }
            //
            if ($eventModel->isDirty()) {
                $eventModel->save();
            }
            //
            if ($request->has('restore') && $request->boolean('restore')) {
                $eventModel->restore();
            }
            //
            return response([
                'success' => true,
                'data' => [
                    'eventModel' => $eventModel,
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
            $eventModel = EventModel::withTrashed()->find($id);
            //
            if (!$eventModel) {
                throw ValidationException::withMessages([
                    'id' => ['Invalid id'],
                ]);
            }
            //
            $eventModel->delete();
            //
            if ($request->boolean('force_delete')) {
                $eventModel->forceDelete();
            }
            //
            return response([
                'success' => true,
            ]);
        });
    }
}
