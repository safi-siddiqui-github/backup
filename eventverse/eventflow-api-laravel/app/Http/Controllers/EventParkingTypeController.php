<?php

namespace App\Http\Controllers;

use App\Http\Traits\UtilTrait;
use App\Models\EventParkingType;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;

class EventParkingTypeController extends Controller
{
    use UtilTrait;

    public function index(Request $request)
    {
        return $this->responseHelper(function () use ($request) {
            //
            $eventParkingTypes = EventParkingType::query()
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
                    'eventParkingTypes' => $eventParkingTypes,
                ],
            ]);
            //
        });
    }

    public function show(Request $request, $id)
    {
        return $this->responseHelper(function () use ($request, $id) {
            //
            $eventParkingType = EventParkingType::withTrashed()->find($id);
            //
            if (!$eventParkingType) {
                throw ValidationException::withMessages([
                    'id' => ['Invalid id'],
                ]);
            }
            //
            return response([
                'success' => true,
                'data' => [
                    'eventParkingType' => $eventParkingType,
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
                    'unique:event_parking_types,name',
                ],
            ]);
            //
            $slug = $this->slugifyHelper($request->input('name'));
            //
            $eventParkingType = new EventParkingType();
            $eventParkingType->slug = $slug;
            $eventParkingType->name = $request->input('name');
            $eventParkingType->save();
            //
            return response([
                'success' => true,
                'data' => [
                    'eventParkingType' => $eventParkingType,
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
                    Rule::unique('event_parking_types')->ignore($id),
                ],
                'restore' => ['nullable', 'boolean'],
            ]);
            //
            $eventParkingType = EventParkingType::withTrashed()->find($id);
            //
            if (!$eventParkingType) {
                throw ValidationException::withMessages([
                    'id' => ['Invalid id'],
                ]);
            }
            //
            // Not allowed to be null
            if ($request->input('name')) {
                $eventParkingType->name = $request->input('name');
            }
            //
            if ($eventParkingType->isDirty()) {
                $eventParkingType->save();
            }
            //
            if ($request->has('restore') && $request->boolean('restore')) {
                $eventParkingType->restore();
            }
            //
            return response([
                'success' => true,
                'data' => [
                    'eventParkingType' => $eventParkingType,
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
            $eventParkingType = EventParkingType::withTrashed()->find($id);
            //
            if (!$eventParkingType) {
                throw ValidationException::withMessages([
                    'id' => ['Invalid id'],
                ]);
            }
            //
            $eventParkingType->delete();
            //
            if ($request->boolean('force_delete')) {
                $eventParkingType->forceDelete();
            }
            //
            return response([
                'success' => true,
            ]);
        });
    }
}
