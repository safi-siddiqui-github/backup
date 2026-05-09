<?php

namespace App\Http\Controllers;

use App\Http\Traits\UtilTrait;
use App\Models\EventAgeRestrictionType;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;

class EventAgeRestrictionTypeController extends Controller
{
    use UtilTrait;

    public function index(Request $request)
    {
        return $this->responseHelper(function () use ($request) {
            //
            $eventAgeRestrictionTypes = EventAgeRestrictionType::query()
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
                    'eventAgeRestrictionTypes' => $eventAgeRestrictionTypes,
                ],
            ]);
            //
        });
    }

    public function show(Request $request, $id)
    {
        return $this->responseHelper(function () use ($request, $id) {
            //
            $eventAgeRestrictionType = EventAgeRestrictionType::withTrashed()->find(
                $id,
            );
            //
            if (!$eventAgeRestrictionType) {
                throw ValidationException::withMessages([
                    'id' => ['Invalid id'],
                ]);
            }
            //
            return response([
                'success' => true,
                'data' => [
                    'eventAgeRestrictionType' => $eventAgeRestrictionType,
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
                    'unique:event_age_restriction_types,name',
                ],
            ]);
            //
            $slug = $this->slugifyHelper($request->input('name'));
            //
            $eventAgeRestrictionType = new EventAgeRestrictionType();
            $eventAgeRestrictionType->slug = $slug;
            $eventAgeRestrictionType->name = $request->input('name');
            $eventAgeRestrictionType->save();
            //
            return response([
                'success' => true,
                'data' => [
                    'eventAgeRestrictionType' => $eventAgeRestrictionType,
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
                    Rule::unique('event_age_restriction_types')->ignore($id),
                ],
                'restore' => ['nullable', 'boolean'],
            ]);
            //
            $eventAgeRestrictionType = EventAgeRestrictionType::withTrashed()->find(
                $id,
            );
            //
            if (!$eventAgeRestrictionType) {
                throw ValidationException::withMessages([
                    'id' => ['Invalid id'],
                ]);
            }
            //
            // Not allowed to be null
            if ($request->input('name')) {
                $eventAgeRestrictionType->name = $request->input('name');
            }
            //
            if ($eventAgeRestrictionType->isDirty()) {
                $eventAgeRestrictionType->save();
            }
            //
            if ($request->has('restore') && $request->boolean('restore')) {
                $eventAgeRestrictionType->restore();
            }
            //
            return response([
                'success' => true,
                'data' => [
                    'eventAgeRestrictionType' => $eventAgeRestrictionType,
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
            $eventAgeRestrictionType = EventAgeRestrictionType::withTrashed()->find(
                $id,
            );
            //
            if (!$eventAgeRestrictionType) {
                throw ValidationException::withMessages([
                    'id' => ['Invalid id'],
                ]);
            }
            //
            $eventAgeRestrictionType->delete();
            //
            if ($request->boolean('force_delete')) {
                $eventAgeRestrictionType->forceDelete();
            }
            //
            return response([
                'success' => true,
            ]);
        });
    }
}
