<?php

namespace App\Http\Requests;

use App\Models\Booking;
use Carbon\Carbon;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;

class BookingRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            //
        ];
    }

    public function bookingRules(): array
    {
        return [
            'name' => ['required', 'string', 'min:3', 'max:100'],
            'description' => ['required', 'string', 'min:10', 'max:100'],
            'email' => ['required', 'string', 'email', 'max:100'],
            'date' => ['required', Rule::date()->todayOrAfter()],
            'timeslot_id' => ['required', 'exists:timeslots,id'],
            'timeslot_two_id' => ['nullable', 'exists:timeslots,id'],
            'timeslot_three_id' => ['nullable', 'exists:timeslots,id'],
        ];
    }

    public function attemptBooking(): void
    {
        $booking = Booking::where('isRejected', false)
            ->whereDate('date', $this->date)
            ->where(function ($query){
                $query->where('timeslot_id', $this->timeslot_id)
                    ->orWhere('timeslot_two_id', $this->timeslot_id)
                    ->orWhere('timeslot_three_id', $this->timeslot_id);
            })
            ->first();

        if ($booking) {
            throw ValidationException::withMessages([
                'timeslot_id' => 'Timeslot not available'
            ]);
        }

        if($this->timeslot_two_id){
            $booking = Booking::where('isRejected', false)
            ->whereDate('date', $this->date)
            ->where(function ($query){
                $query->where('timeslot_id', $this->timeslot_two_id)
                    ->orWhere('timeslot_two_id', $this->timeslot_two_id)
                    ->orWhere('timeslot_three_id', $this->timeslot_two_id);
            })
            ->first();
            
            if ($booking) {
                throw ValidationException::withMessages([
                    'timeslot_two_id' => 'Timeslot not available'
                ]);
            }
        }

        if($this->timeslot_three_id){

            $booking = Booking::where('isRejected', false)
            ->whereDate('date', $this->date)
            ->where(function ($query){
                $query->where('timeslot_id', $this->timeslot_three_id)
                ->orWhere('timeslot_two_id', $this->timeslot_three_id)
                ->orWhere('timeslot_three_id', $this->timeslot_three_id);
            })
            ->first();
            
            if ($booking) {
                throw ValidationException::withMessages([
                    'timeslot_three_id' => 'Timeslot not available'
                ]);
            }
        }

        $booking = new Booking();
        $booking->name = $this->name;
        $booking->description = $this->description;
        $booking->email = $this->email;
        $booking->date = new Carbon()->createFromDate($this->date);
        $booking->timeslot_id = $this->timeslot_id;

        if($this->timeslot_two_id) {
            $booking->timeslot_two_id = $this->timeslot_two_id;
        }

        if($this->timeslot_three_id) {
            $booking->timeslot_three_id = $this->timeslot_three_id;
        }
        $booking->save();
    }

    public function attemptBookingStatus($id = null, $action = null): void
    {
        $booking = Booking::find($id);

        if ($booking && $action) {
            $booking->isPending = false;
            $booking->isApproved = false;
            $booking->isRejected = false;

            switch ($action) {
                case 'pending':
                    $booking->isPending = true;
                    break;
                case 'approve':
                    $booking->isApproved = true;
                case 'reject':
                    $booking->isRejected = true;
                    break;

                default:
                    break;
            }

            $booking->save();
        }
    }
}
