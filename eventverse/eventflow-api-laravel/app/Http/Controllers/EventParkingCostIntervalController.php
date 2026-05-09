<?php

namespace App\Http\Controllers;

use App\Http\Traits\UtilTrait;
use App\Models\EventParkingCostInterval;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;

class EventParkingCostIntervalController extends Controller
{
    use UtilTrait;

    public function index(Request $request)
    {
        return $this->responseHelper(function () use ($request) {
            //
            $eventParkingCostInterval = EventParkingCostInterval::query()
                //
                ->when($request->input('search'), function ($query, $value) {
                    $query->whereLike('name', "%$value%");
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
                    'eventParkingCostInterval' => $eventParkingCostInterval,
                ],
            ]);
            //
        });
    }

    public function show(Request $request, $id)
    {
        return $this->responseHelper(function () use ($request, $id) {
            //
            $eventParkingCostInterval = EventParkingCostInterval::withTrashed()->find(
                $id,
            );
            //
            if (!$eventParkingCostInterval) {
                throw ValidationException::withMessages([
                    'id' => ['Invalid id'],
                ]);
            }
            //
            return response([
                'success' => true,
                'data' => [
                    'eventParkingCostInterval' => $eventParkingCostInterval,
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
                'name' => [
                    'required',
                    'string',
                    'unique:event_parking_cost_intervals,name',
                ],
            ]);
            //
            $slug = $this->slugifyHelper($request->input('name'));
            //
            $eventParkingCostInterval = new EventParkingCostInterval();
            $eventParkingCostInterval->slug = $slug;
            $eventParkingCostInterval->name = $request->input('name');
            $eventParkingCostInterval->save();
            //
            return response([
                'success' => true,
                'data' => [
                    'eventParkingCostInterval' => $eventParkingCostInterval,
                ],
            ]);
        });
    }

    public function update(Request $request, $id)
    {
        return $this->responseHelper(function () use ($request, $id) {
            //
            $request->validate([
                'name' => [
                    'nullable',
                    'string',
                    Rule::unique('event_parking_cost_intervals')->ignore($id),
                ],
                'restore' => ['nullable', 'boolean'],
            ]);
            //
            $eventParkingCostInterval = EventParkingCostInterval::withTrashed()->find(
                $id,
            );
            //
            if (!$eventParkingCostInterval) {
                throw ValidationException::withMessages([
                    'id' => ['Invalid id'],
                ]);
            }
            //
            // Not allowed to be null
            if ($request->input('name')) {
                $eventParkingCostInterval->name = $request->input('name');
            }
            //
            if ($eventParkingCostInterval->isDirty()) {
                $eventParkingCostInterval->save();
            }
            //
            if ($request->has('restore') && $request->boolean('restore')) {
                $eventParkingCostInterval->restore();
            }
            //
            return response([
                'success' => true,
                'data' => [
                    'eventParkingCostInterval' => $eventParkingCostInterval,
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
            $eventParkingCostInterval = EventParkingCostInterval::withTrashed()->find(
                $id,
            );
            //
            if (!$eventParkingCostInterval) {
                throw ValidationException::withMessages([
                    'id' => ['Invalid id'],
                ]);
            }
            //
            $eventParkingCostInterval->delete();
            //
            if ($request->boolean('force_delete')) {
                $eventParkingCostInterval->forceDelete();
            }
            //
            return response([
                'success' => true,
            ]);
        });
    }
}
