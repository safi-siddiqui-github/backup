<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BookingResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        // return parent::toArray($request);
        return [
            "id" => $this->id,
            "name" => $this->name,
            "email" => $this->email,
            "description" => $this->description,
            "date" => new Carbon($this->date)->format('Y-m-d'),
            "timeslot_id" => $this->timeslot_id,
            "timeslot_two_id" => $this->timeslot_two_id,
            "timeslot_three_id" => $this->timeslot_three_id,
            "isPending" => $this->isPending,
            "isApproved" => $this->isApproved,
            "isRejected" => $this->isRejected,
            "created_at" => $this->created_at,
            "updated_at" => $this->updated_at,
            'timeslot_one' => (new TimeslotResource($this->timeslot_one))->resolve(),
            'timeslot_two' => (new TimeslotResource($this->timeslot_two))->resolve(),
            'timeslot_three' => (new TimeslotResource($this->timeslot_three))->resolve(),
        ];
    }
}
