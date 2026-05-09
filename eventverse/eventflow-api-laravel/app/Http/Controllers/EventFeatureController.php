<?php

namespace App\Http\Controllers;

use App\Http\Traits\UtilTrait;
use App\Models\EventFeature;
use App\Models\EventFeatureCategory;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Str;

class EventFeatureController extends Controller
{
    use UtilTrait;

    public function index(Request $request)
    {
        return $this->responseHelper(function () use ($request) {
            //
            $eventFeatures = EventFeature::query()
                //
                ->when($request->boolean('only_active'), function (
                    $query,
                    $value,
                ) {
                    $query->whereNull('deactivated_at');
                })
                //
                ->when($request->boolean('only_inactive'), function (
                    $query,
                    $value,
                ) {
                    $query->whereNotNull('deactivated_at');
                })
                //
                ->when(
                    $request->integer('event_feature_category_id'),
                    function ($query, $value) {
                        $query->where('event_feature_category_id', $value);
                    },
                )
                //
                ->when($request->integer('event_model_id'), function (
                    $query,
                    $value,
                ) {
                    $query->where('event_model_id', $value);
                })
                //
                ->when($request->input('search'), function ($query, $value) {
                    $query->whereLike('slug', "%$value%");
                })
                //
                ->when(
                    $request->boolean('with_event_feature_category'),
                    function ($query, $value) {
                        $query->with('eventFeatureCategory');
                    },
                )
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
                    'eventFeatures' => $eventFeatures,
                ],
            ]);
            //
        });
    }

    public function show(Request $request, $id)
    {
        return $this->responseHelper(function () use ($request, $id) {
            //
            $eventFeature = EventFeature::withTrashed()->find($id);
            //
            if (!$eventFeature) {
                throw ValidationException::withMessages([
                    'id' => ['Invalid id'],
                ]);
            }
            //
            if ($request->boolean('with_event_feature_category')) {
                $eventFeature->load('eventFeatureCategory');
            }
            //
            if ($request->boolean('with_event_model')) {
                $eventFeature->load('eventModel');
            }
            //
            return response([
                'success' => true,
                'data' => [
                    'eventFeature' => $eventFeature,
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
                'event_feature_category_id' => [
                    'required',
                    'integer',
                    'exists:event_feature_categories,id',
                ],
                'event_model_id' => [
                    'required',
                    'integer',
                    'exists:event_models,id',
                ],
            ]);
            //
            $eventFeatureCategory = EventFeatureCategory::withTrashed()
                ->where('id', $request->input('event_feature_category_id'))
                ->whereNotNull('parent_id')
                ->first();
            //
            // Must be a Child
            if (!$eventFeatureCategory) {
                throw ValidationException::withMessages([
                    'event_feature_category_id' =>
                        'Event Feature category must be child.',
                ]);
            }
            //
            // Duplicate Check
            $eventFeature =
                EventFeature::withTrashed()
                    ->where(
                        'event_feature_category_id',
                        $request->input('event_feature_category_id'),
                    )
                    ->where('event_model_id', $request->input('event_model_id'))
                    ->first() ?? null;
            //
            if ($eventFeature) {
                throw ValidationException::withMessages([
                    'event_feature' => 'Event feature already exist.',
                ]);
            }
            //
            // Ticketing System Present, Then RSVP Management Cannot be Activated
            if ($eventFeatureCategory?->slug == 'rsvp-management') {
                //
                $ticketingSystem =
                    EventFeatureCategory::withTrashed()
                        ->where('slug', 'ticketing-system')
                        ->first() ?? null;
                //
                if ($ticketingSystem) {
                    //
                    $eventFeatureExist =
                        EventFeature::withTrashed()
                            ->where(
                                'event_feature_category_id',
                                $ticketingSystem?->id,
                            )
                            ->where(
                                'event_model_id',
                                $request->input('event_model_id'),
                            )
                            ->whereNull('deactivated_at')
                            ->first() ?? null;
                    //
                    if ($eventFeatureExist) {
                        throw ValidationException::withMessages([
                            'event_feature_category_id' =>
                                'Rsvp Management cannot be activated including ticketing system.',
                        ]);
                    }
                }
                //
            }
            //
            // RSVP Management Present, Then Ticketing System Cannot be Activated
            if ($eventFeatureCategory?->slug == 'ticketing-system') {
                //
                $rsvpManagement =
                    EventFeatureCategory::withTrashed()
                        ->where('slug', 'rsvp-management')
                        ->first() ?? null;
                //
                if ($rsvpManagement) {
                    //
                    $eventFeatureExist =
                        EventFeature::withTrashed()
                            ->where(
                                'event_feature_category_id',
                                $rsvpManagement?->id,
                            )
                            ->where(
                                'event_model_id',
                                $request->input('event_model_id'),
                            )
                            ->whereNull('deactivated_at')
                            ->first() ?? null;
                    //
                    if ($eventFeatureExist) {
                        throw ValidationException::withMessages([
                            'event_feature_category_id' =>
                                'Ticketing system cannot be activated including Rsvp Management',
                        ]);
                    }
                }
                //
            }
            //
            $baseSlug =
                $eventFeatureCategory?->name . '-' . $this->uuidHelper();
            $slug = $this->slugifyHelper($baseSlug);
            //
            $eventFeature = new EventFeature();
            $eventFeature->slug = $slug;
            $eventFeature->event_feature_category_id = $request->input(
                'event_feature_category_id',
            );
            $eventFeature->event_model_id = $request->input('event_model_id');
            $eventFeature->save();
            //
            return response([
                'success' => true,
                'data' => [
                    'eventFeature' => $eventFeature,
                ],
            ]);
        });
    }

    public function update(Request $request, $id)
    {
        return $this->responseHelper(function () use ($request, $id) {
            //
            $request->validate([
                'deactivate' => ['nullable', 'boolean'],
                'restore' => ['nullable', 'boolean'],
            ]);
            //
            $eventFeature = EventFeature::withTrashed()->find($id);
            //
            if (!$eventFeature) {
                throw ValidationException::withMessages([
                    'id' => ['Invalid id'],
                ]);
            }
            //
            if ($request->has('deactivate')) {
                //
                if ($request->boolean('deactivate')) {
                    //
                    $eventFeature->deactivated_at = now();
                    //
                } else {
                    //
                    // Activating
                    //
                    // Ticketing System Active, Then RSVP Cannot be Activated
                    if (
                        Str::contains(
                            $eventFeature?->slug,
                            'rsvp-management',
                        ) &&
                        $eventFeature?->deactivated_at !== null
                    ) {
                        //
                        $ticketingSystem =
                            EventFeatureCategory::withTrashed()
                                ->where('slug', 'ticketing-system')
                                ->first() ?? null;
                        //
                        if ($ticketingSystem) {
                            //
                            $eventFeatureExist =
                                EventFeature::withTrashed()
                                    ->where(
                                        'event_feature_category_id',
                                        $ticketingSystem?->id,
                                    )
                                    ->where(
                                        'event_model_id',
                                        $eventFeature?->event_model_id,
                                    )
                                    ->whereNull('deactivated_at')
                                    ->first() ?? null;
                            //
                            if ($eventFeatureExist) {
                                throw ValidationException::withMessages([
                                    'event_feature_category_id' =>
                                        'Rsvp Management cannot be activated including ticketing system.',
                                ]);
                            }
                        }
                        //
                    }
                    //
                    // RSVP Active, Then Ticketing System Cannot be Activated
                    if (
                        Str::contains(
                            $eventFeature?->slug,
                            'ticketing-system',
                        ) &&
                        $eventFeature?->deactivated_at !== null
                    ) {
                        //
                        $rsvpManagement =
                            EventFeatureCategory::withTrashed()
                                ->where('slug', 'rsvp-management')
                                ->first() ?? null;
                        //

                        if ($rsvpManagement) {
                            //
                            $eventFeatureExist =
                                EventFeature::withTrashed()
                                    ->where(
                                        'event_feature_category_id',
                                        $rsvpManagement?->id,
                                    )
                                    ->where(
                                        'event_model_id',
                                        $eventFeature?->event_model_id,
                                    )
                                    ->whereNull('deactivated_at')
                                    ->first() ?? null;
                            //
                            if ($eventFeatureExist) {
                                throw ValidationException::withMessages([
                                    'event_feature_category_id' =>
                                        'Ticketing System cannot be activated including Rsvp Management.',
                                ]);
                            }
                        }
                        //
                    }

                    //
                    $eventFeature->deactivated_at = null;
                    //
                }
            }
            //
            if ($eventFeature->isDirty()) {
                $eventFeature->save();
            }
            //
            if ($request->has('restore') && $request->boolean('restore')) {
                $eventFeature->restore();
            }
            //
            return response([
                'success' => true,
                'data' => [
                    'eventFeature' => $eventFeature,
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
            $eventFeature = EventFeature::withTrashed()->find($id);
            //
            if (!$eventFeature) {
                throw ValidationException::withMessages([
                    'id' => ['Invalid id'],
                ]);
            }
            //
            $eventFeature->delete();
            //
            if ($request->boolean('force_delete')) {
                $eventFeature->forceDelete();
            }
            //
            return response([
                'success' => true,
            ]);
        });
    }
}
