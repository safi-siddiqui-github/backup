<?php

namespace App\Http\Controllers;

use App\Models\EventVenue;
use App\Http\Traits\UtilTrait;
use App\Models\VenueType;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class EventVenueController extends Controller
{
    use UtilTrait;

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return $this->responseHelper(function () {
            //
            $eventVenue = EventVenue::all();
            return response([
                'success' => true,
                'data' => [
                    'eventVenue' => $eventVenue,
                ],
            ]);
            //
        });
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        return $this->responseHelper(function () use ($request) {
            //
            $request->validate([
                'event_module_id' => ['required', 'integer', 'exists:event_modules,id'],
                'venue_type_id' => ['required', 'integer', 'exists:venue_types,id'],
                'name' => ['required', 'string'],
                'capacity' => ['string'],
                'features' => ['string'],
            ]);
            //
            $venueType = VenueType::find($request->input('venue_type_id'));
            if ($venueType) {
                //
                $physical = Str::of($venueType->slug)->contains('physical-location');
                $virtual = Str::of($venueType->slug)->contains('virtual-event');
                $hybrid = Str::of($venueType->slug)->contains('hybrid-physical-vitual');
                //
                if ($physical) {
                    $request->validate([
                        'physical_address' => ['required', 'string'],
                    ]);
                } elseif ($virtual) {
                    $request->validate([
                        'virtual_link' => ['required', 'string', 'url'],
                    ]);
                } elseif ($hybrid) {
                    $request->validate([
                        'physical_address' => ['required', 'string'],
                        'virtual_link' => ['required', 'string', 'url'],
                    ]);
                }
                //
            }
            //
            $slug = $this->slugifyHelper($request->input('name'));
            //
            $eventVenue = new EventVenue();
            $eventVenue->event_module_id = $request->input('event_module_id');
            $eventVenue->venue_type_id = $request->input('venue_type_id');
            $eventVenue->name = $request->input('name');
            $eventVenue->slug = $slug;
            $eventVenue->capacity = $request->input('capacity');
            $eventVenue->features = $request->input('features');
            $eventVenue->physical_address = $request->input('physical_address');
            $eventVenue->virtual_link = $request->input('virtual_link');
            $eventVenue->save();
            //
            return response([
                'success' => true,
                'data' => [
                    'eventVenue' => $eventVenue,
                ],
            ]);
            //
        });
    }

    /**
     * Display the specified resource.
     */
    public function show(EventVenue $eventVenue)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, EventVenue $eventVenue)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(EventVenue $eventVenue)
    {
        //
    }
}
