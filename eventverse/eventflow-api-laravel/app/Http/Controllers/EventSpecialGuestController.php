<?php

namespace App\Http\Controllers;

use App\Http\Traits\UtilTrait;
use App\Models\EventSpecialGuest;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class EventSpecialGuestController extends Controller
{
    use UtilTrait;

    public function index(Request $request)
    {
        return $this->responseHelper(function () use ($request) {
            //
            $eventSpecialGuests = EventSpecialGuest::query()
                //
                ->when($request->input('search'), function ($query, $value) {
                    $query
                        ->whereLike('name', "%$value%")
                        ->orWhereLike('role', "%$value%")
                        ->orWhereLike('description', "%$value%")
                        ->orWhereLike('linkedin_url', "%$value%")
                        ->orWhereLike('twitter_url', "%$value%")
                        ->orWhereLike('website', "%$value%");
                })
                //
                ->when($request->integer('event_model_id'), function (
                    $query,
                    $value,
                ) {
                    $query->where('event_model_id', $value);
                })
                //
                ->when($request->boolean('with_event_model'), function (
                    $query,
                    $value,
                ) {
                    $query->with('eventModel');
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
                    'eventSpecialGuests' => $eventSpecialGuests,
                ],
            ]);
            //
        });
    }

    public function show(Request $request, $id)
    {
        return $this->responseHelper(function () use ($request, $id) {
            //
            $eventSpecialGuest = EventSpecialGuest::withTrashed()->find($id);
            //
            if (!$eventSpecialGuest) {
                throw ValidationException::withMessages([
                    'id' => ['Invalid id'],
                ]);
            }
            //
            if ($request->boolean('with_event_model')) {
                $eventSpecialGuest->load('eventModel');
            }
            //
            return response([
                'success' => true,
                'data' => [
                    'eventSpecialGuest' => $eventSpecialGuest,
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
                    'required',
                    'integer',
                    'exists:event_models,id',
                ],
                'name' => ['required', 'string'],
                'role' => ['nullable', 'string'],
                'description' => ['nullable', 'string'],
                'linkedin_url' => ['nullable', 'string', 'url'],
                'twitter_url' => ['nullable', 'string', 'url'],
                'website' => ['nullable', 'string', 'url'],
                'achievements' => ['nullable', 'string', 'json'],
            ]);
            //
            $baseSlug = $request->input('name') . '-' . $this->uuidHelper();
            $slug = $this->slugifyHelper($baseSlug);
            //
            $eventSpecialGuest = new EventSpecialGuest();
            $eventSpecialGuest->slug = $slug;
            $eventSpecialGuest->event_model_id = $request->input(
                'event_model_id',
            );
            $eventSpecialGuest->name = $request->input('name');
            $eventSpecialGuest->role = $request->input('role');
            $eventSpecialGuest->description = $request->input('description');
            $eventSpecialGuest->linkedin_url = $request->input('linkedin_url');
            $eventSpecialGuest->twitter_url = $request->input('twitter_url');
            $eventSpecialGuest->website = $request->input('website');
            $eventSpecialGuest->achievements = $request->input('achievements');
            $eventSpecialGuest->save();
            //
            return response([
                'success' => true,
                'data' => [
                    'eventSpecialGuest' => $eventSpecialGuest,
                ],
            ]);
        });
    }

    public function update(Request $request, $id)
    {
        return $this->responseHelper(function () use ($request, $id) {
            //
            $request->validate([
                'name' => ['nullable', 'string'],
                'role' => ['nullable', 'string'],
                'description' => ['nullable', 'string'],
                'linkedin_url' => ['nullable', 'string', 'url'],
                'twitter_url' => ['nullable', 'string', 'url'],
                'website' => ['nullable', 'string', 'url'],
                'achievements' => ['nullable', 'string', 'json'],
                'restore' => ['nullable', 'boolean'],
            ]);
            //
            $eventSpecialGuest = EventSpecialGuest::withTrashed()->find($id);
            //
            if (!$eventSpecialGuest) {
                throw ValidationException::withMessages([
                    'id' => ['Invalid id'],
                ]);
            }
            //
            // Should not be null
            if ($request->input('name')) {
                $eventSpecialGuest->name = $request->input('name');
            }
            //
            if ($request->has('role')) {
                $eventSpecialGuest->role = $request->input('role');
            }
            //
            if ($request->has('description')) {
                $eventSpecialGuest->description = $request->input(
                    'description',
                );
            }
            //
            if ($request->has('linkedin_url')) {
                $eventSpecialGuest->linkedin_url = $request->input(
                    'linkedin_url',
                );
            }
            //
            if ($request->has('twitter_url')) {
                $eventSpecialGuest->twitter_url = $request->input(
                    'twitter_url',
                );
            }
            //
            if ($request->has('website')) {
                $eventSpecialGuest->website = $request->input('website');
            }
            //
            if ($request->has('achievements')) {
                $eventSpecialGuest->achievements = $request->input(
                    'achievements',
                );
            }
            //
            if ($eventSpecialGuest->isDirty()) {
                $eventSpecialGuest->save();
            }
            //
            if ($request->has('restore') && $request->boolean('restore')) {
                $eventSpecialGuest->restore();
            }
            //
            return response([
                'success' => true,
                'data' => [
                    'eventSpecialGuest' => $eventSpecialGuest,
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
            $eventSpecialGuest = EventSpecialGuest::withTrashed()->find($id);
            //
            if (!$eventSpecialGuest) {
                throw ValidationException::withMessages([
                    'id' => ['Invalid id'],
                ]);
            }
            //
            $eventSpecialGuest->delete();
            //
            if ($request->boolean('force_delete')) {
                $eventSpecialGuest->forceDelete();
            }
            //
            return response([
                'success' => true,
            ]);
        });
    }
}
