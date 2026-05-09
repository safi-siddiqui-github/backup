<?php

use App\Enums\ToastBarEnum;
use App\Http\Requests\BookingRequest;
use App\Http\Resources\TimeslotResource;
use App\Models\Timeslot;
use Illuminate\Support\Facades\Auth;

use function Livewire\Volt\rules;
use function Livewire\Volt\state;

$bookingRequest = new BookingRequest();
state([
    'name' => '',
    'description' => '',
    'email' => '',
    'date' => now()->format('Y-m-d'),
    'timeslot_id' => '',
    'timeslot_two_id' => '',
    'timeslot_three_id' => '',
    'timeslots' => TimeslotResource::collection(Timeslot::all())->resolve(),
]);

rules($bookingRequest->bookingRules());

$submitForm = function () use ($bookingRequest) {
    $this->validate();
    //
    $bookingRequest->mergeIfMissing([
        'email' => $this->email,
        'name' => $this->name,
        'description' => $this->description,
        'date' => $this->date,
        'timeslot_id' => $this->timeslot_id,
        'timeslot_two_id' => $this->timeslot_two_id,
        'timeslot_three_id' => $this->timeslot_three_id,
    ]);
    //
    $bookingRequest->attemptBooking();
    //
    session()->flash('status', ToastBarEnum::BOOKING_SUCCESS);
    //
    if (Auth::user()) {
        $this->redirectRoute('app.bookings', navigate: false);
    } else {
        $this->redirectRoute('app.home', navigate: false);
    }
};
?>

<flux:modal
    class="md:w-96"
    name="book-now"
>
    <form
        class="space-y-6"
        wire:submit="submitForm"
    >
        <div>
            <flux:heading size="lg">Book Event</flux:heading>
            <flux:text>Create your booking now!</flux:text>
        </div>

        <flux:input
            name="name"
            description="Enter your event name."
            wire:model="name"
        />

        <flux:input
            name="email"
            description="Enter your email address."
            wire:model="email"
        />

        <flux:input
            name="date"
            :value="$date"
            description="Enter your event date."
            disabled
            type="date"
        />

        <flux:select
            name="timeslot_id"
            description="Enter your first timeslot."
            wire:model="timeslot_id"
            placeholder="Choose timeslots..."
        >
            @foreach ($timeslots as $each)
                <flux:select.option value="{{ $each['id'] }}">
                    {{ $each['name'] }} / {{ $each['start'] }} -- {{ $each['stop'] }}
                </flux:select.option>
            @endforeach
        </flux:select>

        <div
            x-show="$wire.timeslot_id !== ''"
            x-transition
        >
            <flux:select
                name="timeslot_two_id"
                description="Optional. Select second timeslot"
                wire:model="timeslot_two_id"
                placeholder="Choose timeslots..."
            >
                <template
                    :key="`${timeslot.id}-two`"
                    x-for="timeslot in $wire.timeslots"
                >
                    <template x-if="parseInt(timeslot.id) !== parseInt($wire.timeslot_id)">
                        <flux:select.option x-bind:value="timeslot.id">
                            <li
                                x-text="`${timeslot.name} / ${timeslot.start} - ${timeslot.stop}`"
                            ></li>
                        </flux:select.option>
                    </template>
                </template>
            </flux:select>
        </div>

        <div
            x-show="$wire.timeslot_two_id !== ''"
            x-transition
        >
            <flux:select
                name="timeslot_three_id"
                description="Optional. Select third timeslot"
                wire:model="timeslot_three_id"
                placeholder="Choose timeslots..."
            >
                <template
                    :key="`${timeslot.id}-three`"
                    x-for="timeslot in $wire.timeslots"
                >
                    <template
                        x-if="
                            parseInt(timeslot.id) !== parseInt($wire.timeslot_id) &&
                                parseInt(timeslot.id) !== parseInt($wire.timeslot_two_id)
                        "
                    >
                        <flux:select.option x-bind:value="timeslot.id">
                            <li
                                x-text="`${timeslot.name} / ${timeslot.start} - ${timeslot.stop}`"
                            ></li>
                        </flux:select.option>
                    </template>
                </template>
            </flux:select>
        </div>

        <flux:textarea
            name="description"
            description="Enter your event description."
            wire:model="description"
            rows="auto"
        />

        <div class="flex">
            <flux:spacer />
            <flux:button
                type="submit"
                variant="primary"
            >
                Submit
            </flux:button>
        </div>
    </form>
</flux:modal>
