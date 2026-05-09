<?php

namespace App\Http\Controllers;

use App\Http\Traits\UtilTrait;
use App\Models\EventVenueType;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;

class EventVenueTypeController extends Controller
{
    use UtilTrait;

    public function index(Request $request)
    {
        return $this->responseHelper(function () use ($request) {
            //
            $eventVenueTypes = EventVenueType::query()
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
                    'eventVenueTypes' => $eventVenueTypes,
                ],
            ]);
            //
        });
    }

    public function show(Request $request, $id)
    {
        return $this->responseHelper(function () use ($request, $id) {
            //
            $eventVenueType = EventVenueType::withTrashed()->find($id);
            //
            if (!$eventVenueType) {
                throw ValidationException::withMessages([
                    'id' => ['Invalid id'],
                ]);
            }
            //
            return response([
                'success' => true,
                'data' => [
                    'eventVenueType' => $eventVenueType,
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
                    'unique:event_venue_types,name',
                ],
            ]);
            //
            $slug = $this->slugifyHelper($request->input('name'));
            //
            $eventVenueType = new EventVenueType();
            $eventVenueType->slug = $slug;
            $eventVenueType->name = $request->input('name');
            $eventVenueType->save();
            //
            return response([
                'success' => true,
                'data' => [
                    'eventVenueType' => $eventVenueType,
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
                    Rule::unique('event_venue_types')->ignore($id),
                ],
                'restore' => ['nullable', 'boolean'],
            ]);
            //
            $eventVenueType = EventVenueType::withTrashed()->find($id);
            //
            if (!$eventVenueType) {
                throw ValidationException::withMessages([
                    'id' => ['Invalid id'],
                ]);
            }
            //
            // Not allowed to be null
            if ($request->input('name')) {
                $eventVenueType->name = $request->input('name');
            }
            //
            if ($eventVenueType->isDirty()) {
                $eventVenueType->save();
            }
            //
            if ($request->has('restore') && $request->boolean('restore')) {
                $eventVenueType->restore();
            }
            //
            return response([
                'success' => true,
                'data' => [
                    'eventVenueType' => $eventVenueType,
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
            $eventVenueType = EventVenueType::withTrashed()->find($id);
            //
            if (!$eventVenueType) {
                throw ValidationException::withMessages([
                    'id' => ['Invalid id'],
                ]);
            }
            //
            $eventVenueType->delete();
            //
            if ($request->boolean('force_delete')) {
                $eventVenueType->forceDelete();
            }
            //
            return response([
                'success' => true,
            ]);
        });
    }
}
