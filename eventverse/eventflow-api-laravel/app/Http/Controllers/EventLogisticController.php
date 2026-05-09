<?php

namespace App\Http\Controllers;

use App\Enums\AgeRestrictionType;
use App\Enums\ParkingCostInterval;
use App\Enums\ParkingType;
use App\Http\Traits\UtilTrait;
use App\Models\EventLogistic;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;

class EventLogisticController extends Controller
{
    use UtilTrait;

    public function index(Request $request)
    {
        return $this->responseHelper(function () use ($request) {
            //
            $eventLogistics = EventLogistic::query()
                //
                ->when($request->input('search'), function ($query, $value) {
                    $query
                        ->whereLike('slug', "%$value%")
                        ->orWhereLike('age_restriction_note', "%$value%")
                        ->orWhereLike('start_time', "%$value%")
                        ->orWhereLike('check_in_instructions', "%$value%")
                        ->orWhereLike('parking_details', "%$value%")
                        ->orWhereLike('map_link', "%$value%")
                        ->orWhereLike('alternative_transportation', "%$value%");
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
                ->when(
                    $request->integer('event_age_restriction_type_id'),
                    function ($query, $value) {
                        $query->where('event_age_restriction_type_id', $value);
                    },
                )
                //
                ->when(
                    $request->boolean('with_event_age_restriction_type'),
                    function ($query, $value) {
                        $query->with('eventAgeRestrictionType');
                    },
                )
                //
                ->when($request->integer('event_parking_type_id'), function (
                    $query,
                    $value,
                ) {
                    $query->where('event_parking_type_id', $value);
                })
                //
                ->when($request->boolean('with_event_parking_type'), function (
                    $query,
                    $value,
                ) {
                    $query->with('eventParkingType');
                })
                //
                ->when(
                    $request->integer('event_parking_cost_interval_id'),
                    function ($query, $value) {
                        $query->where('event_parking_cost_interval_id', $value);
                    },
                )
                //
                ->when(
                    $request->boolean('with_event_parking_cost_interval'),
                    function ($query, $value) {
                        $query->with('eventParkingCostInterval');
                    },
                )
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
                    'eventLogistics' => $eventLogistics,
                ],
            ]);
            //
        });
    }

    public function show(Request $request, $id)
    {
        return $this->responseHelper(function () use ($request, $id) {
            //
            $eventLogistic = EventLogistic::withTrashed()->find($id);
            //
            if (!$eventLogistic) {
                throw ValidationException::withMessages([
                    'id' => ['Invalid id'],
                ]);
            }
            //
            if ($request->boolean('with_event_model')) {
                $eventLogistic->load('eventModel');
            }
            //
            if ($request->boolean('with_event_age_restriction_type')) {
                $eventLogistic->load('eventAgeRestrictionType');
            }
            //
            if ($request->boolean('with_event_parking_cost_interval')) {
                $eventLogistic->load('eventParkingCostInterval');
            }
            //
            if ($request->boolean('with_event_parking_type')) {
                $eventLogistic->load('eventParkingType');
            }
            //
            return response([
                'success' => true,
                'data' => [
                    'eventLogistic' => $eventLogistic,
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
                'restore' => ['nullable', 'boolean'],
                //
                'has_age_restriction' => ['nullable', 'boolean'],
                'event_age_restriction_type_id' => [
                    'nullable',
                    'exists:event_age_restriction_types,id',
                ],
                'minimum_age' => ['nullable', 'integer', 'lt:maximum_age'],
                'maximum_age' => ['nullable', 'integer', 'gt:minimum_age'],
                'is_guardian_required_for_minors' => ['nullable', 'boolean'],
                'age_restriction_note' => ['nullable', 'string'],
                //
                'has_check_in_instructions' => ['nullable', 'boolean'],
                'start_time' => ['nullable', 'string'],
                'is_early_check_in_allowed' => ['nullable', 'boolean'],
                'is_late_check_in_allowed' => ['nullable', 'boolean'],
                'check_in_instructions' => ['nullable', 'string'],
                //
                'has_parking_information' => ['nullable', 'boolean'],
                'event_parking_type_id' => [
                    'nullable',
                    'exists:event_parking_types,id',
                ],
                'parking_cost' => ['nullable', 'integer'],
                'event_parking_cost_interval_id' => [
                    'nullable',
                    'exists:event_parking_cost_intervals,id',
                ],
                'has_parking_validation' => ['nullable', 'boolean'],
                'has_parking_reservation' => ['nullable', 'boolean'],
                'parking_details' => ['nullable', 'string'],
                'map_link' => ['nullable', 'string', 'url'],
                'alternative_transportation' => ['nullable', 'string'],
                //
            ]);
            //
            $eventLogistic =
                EventLogistic::withTrashed()
                    ->where('event_model_id', $request->input('event_model_id'))
                    ->first() ?? null;
            //
            if (!$eventLogistic) {
                //
                $baseSlug =
                    'event-logistic' .
                    '-' .
                    $request->input('event_model_id') .
                    '-' .
                    $this->uuidHelper();
                $slug = $this->slugifyHelper($baseSlug);
                //
                $eventLogistic = new EventLogistic();
                $eventLogistic->slug = $slug;
                $eventLogistic->event_model_id = $request->input(
                    'event_model_id',
                );
                //
            }
            //
            // Age Restriction
            if ($request->has('has_age_restriction')) {
                $eventLogistic->has_age_restriction = $request->boolean(
                    'has_age_restriction',
                );
            }
            //
            if ($request->has('event_age_restriction_type_id')) {
                $eventLogistic->event_age_restriction_type_id = $request->input(
                    'event_age_restriction_type_id',
                );
            }
            //
            if ($request->has('maximum_age')) {
                $eventLogistic->maximum_age = $request->input('maximum_age');
            }
            //
            if ($request->has('minimum_age')) {
                $eventLogistic->minimum_age = $request->input('minimum_age');
            }
            //
            if ($request->has('is_guardian_required_for_minors')) {
                $eventLogistic->is_guardian_required_for_minors = $request->boolean(
                    'is_guardian_required_for_minors',
                );
            }
            //
            if ($request->has('age_restriction_note')) {
                $eventLogistic->age_restriction_note = $request->input(
                    'age_restriction_note',
                );
            }
            //
            // Check In
            if ($request->has('has_check_in_instructions')) {
                $eventLogistic->has_check_in_instructions = $request->boolean(
                    'has_check_in_instructions',
                );
            }
            //
            if ($request->has('start_time')) {
                $eventLogistic->start_time = $request->input('start_time');
            }
            //
            if ($request->has('is_early_check_in_allowed')) {
                $eventLogistic->is_early_check_in_allowed = $request->boolean(
                    'is_early_check_in_allowed',
                );
            }
            //
            if ($request->has('is_late_check_in_allowed')) {
                $eventLogistic->is_late_check_in_allowed = $request->boolean(
                    'is_late_check_in_allowed',
                );
            }
            //
            if ($request->has('check_in_instructions')) {
                $eventLogistic->check_in_instructions = $request->input(
                    'check_in_instructions',
                );
            }
            //
            // Parking Information
            if ($request->has('has_parking_information')) {
                $eventLogistic->has_parking_information = $request->boolean(
                    'has_parking_information',
                );
            }
            //
            if ($request->has('event_parking_type_id')) {
                $eventLogistic->event_parking_type_id = $request->input(
                    'event_parking_type_id',
                );
            }
            //
            if ($request->has('parking_cost')) {
                $eventLogistic->parking_cost = $request->input('parking_cost');
            }
            //
            if ($request->has('event_parking_cost_interval_id')) {
                $eventLogistic->event_parking_cost_interval_id = $request->input(
                    'event_parking_cost_interval_id',
                );
            }
            //
            if ($request->has('has_parking_validation')) {
                $eventLogistic->has_parking_validation = $request->boolean(
                    'has_parking_validation',
                );
            }
            //
            if ($request->has('has_parking_reservation')) {
                $eventLogistic->has_parking_reservation = $request->boolean(
                    'has_parking_reservation',
                );
            }
            //
            if ($request->has('parking_details')) {
                $eventLogistic->parking_details = $request->input(
                    'parking_details',
                );
            }
            //
            if ($request->has('map_link')) {
                $eventLogistic->map_link = $request->input('map_link');
            }
            //
            if ($request->has('alternative_transportation')) {
                $eventLogistic->alternative_transportation = $request->input(
                    'alternative_transportation',
                );
            }
            //
            if ($eventLogistic->isDirty()) {
                $eventLogistic->save();
            }
            //
            if ($request->has('restore') && $request->boolean('restore')) {
                $eventLogistic->restore();
            }
            //
            return response([
                'success' => true,
                'data' => [
                    'eventLogistic' => $eventLogistic,
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
            $eventLogistic = EventLogistic::withTrashed()->find($id);
            //
            if (!$eventLogistic) {
                throw ValidationException::withMessages([
                    'id' => ['Invalid id'],
                ]);
            }
            //
            $eventLogistic->delete();
            //
            if ($request->boolean('force_delete')) {
                $eventLogistic->forceDelete();
            }
            //
            return response([
                'success' => true,
            ]);
        });
    }
}
