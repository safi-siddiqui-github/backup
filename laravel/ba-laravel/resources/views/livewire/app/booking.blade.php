<?php

use App\Enums\ToastBarEnum;
use App\Http\Requests\BookingRequest;
use App\Http\Resources\BookingResource;
use App\Models\Booking;

use function Livewire\Volt\layout;
use function Livewire\Volt\state;
use function Livewire\Volt\title;

layout('livewire.layouts.app');
title('Bookings - Booking App');

state([
    'today' => now()->format('l, jS \of F - Y'),
    'days' => now()->daysInMonth,
    'bookings' => BookingResource::collection(
        Booking::latest()->get(),
    )->resolve(),
]);

$bookingRequest = new BookingRequest();
$submitForm = function ($id, $status) use ($bookingRequest) {
    $bookingRequest->attemptBookingStatus($id, $status);
    //
    session()->flash('status', ToastBarEnum::BOOKING_UPDATED);
    //
    $this->redirectRoute('app.bookings', navigate: false);
};

?>

<div class="flex flex-col gap-10 px-4 py-20">
    <div class="flex flex-col items-center justify-center gap-6 text-center">
        <flux:text class="text-5xl font-semibold">Bookings</flux:text>

        <flux:text class="max-w-96">
            Manage all bookings by accepting and rejecting each booking. Only approved bookings will
            be available to users.
        </flux:text>

        <flux:heading size="xl">Today! {{ $today }}</flux:heading>
    </div>

    <div class="mx-auto grid w-full max-w-5xl grid-cols-1 gap-6">
        @foreach ($bookings as $booking)
            <div class="flex min-w-fit flex-col gap-2 rounded-md border p-4">
                <div class="flex items-start justify-between gap-2">
                    <div class="flex flex-col gap-4">
                        <flux:text class="flex items-center gap-1">
                            <flux:icon.at-symbol class="size-7" />
                            {{ $booking['email'] }}
                        </flux:text>

                        <div class="flex flex-col">
                            <flux:heading size="xl">{{ $booking['name'] }}</flux:heading>
                            <flux:text>{{ $booking['description'] }}</flux:text>
                        </div>
                    </div>

                    <div class="flex flex-col items-center gap-4 md:flex-row">
                        <div class="flex flex-col">
                            <div class="font-bold">{{ $booking['timeslot_one']['name'] }}</div>
                            <div>
                                {{ $booking['timeslot_one']['start'] }} -
                                {{ $booking['timeslot_one']['stop'] }}
                            </div>
                        </div>

                        <flux:separator
                            class="hidden md:flex"
                            variant="subtle"
                            vertical
                        />
                        <flux:separator
                            class="md:hidden"
                            variant="subtle"
                        />

                        @if (count($booking['timeslot_two']) > 0)
                            <div class="flex flex-col">
                                <div class="font-bold">{{ $booking['timeslot_two']['name'] }}</div>
                                <div>
                                    {{ $booking['timeslot_two']['start'] }} -
                                    {{ $booking['timeslot_two']['stop'] }}
                                </div>
                            </div>
                        @else
                            <flux:text
                                class="py-1 italic"
                                variant="subtle"
                            >
                                No second timeslot
                            </flux:text>
                        @endif

                        <flux:separator
                            class="hidden md:flex"
                            variant="subtle"
                            vertical
                        />
                        <flux:separator
                            class="md:hidden"
                            variant="subtle"
                        />

                        @if (count($booking['timeslot_three']) > 0)
                            <div class="flex flex-col">
                                <div class="font-bold">
                                    {{ $booking['timeslot_three']['name'] }}
                                </div>
                                <div>
                                    {{ $booking['timeslot_three']['start'] }} -
                                    {{ $booking['timeslot_three']['stop'] }}
                                </div>
                            </div>
                        @else
                            <flux:text
                                class="py-1 italic"
                                variant="subtle"
                            >
                                No third timeslot
                            </flux:text>
                        @endif
                    </div>
                </div>

                <flux:separator text="Status / Actions" />

                <div class="flex items-center justify-between">
                    <div class="flex flex-col items-center gap-1">
                        <flux:text>
                            @if ($booking['isPending'])
                                <flux:badge color="orange">Pending</flux:badge>
                            @elseif ($booking['isApproved'])
                                <flux:badge color="green">Approved</flux:badge>
                            @else
                                <flux:badge color="red">Rejected</flux:badge>
                            @endif
                        </flux:text>
                        <flux:text>
                            {{ $booking['date'] }}
                        </flux:text>
                    </div>

                    <flux:button.group>
                        @if ($booking['isPending'])
                            <flux:button
                                wire:click="submitForm({{ $booking['id'] }}, 'approve')"
                                icon="check-circle"
                            >
                                Approve
                            </flux:button>

                            <flux:button
                                wire:click="submitForm({{ $booking['id'] }}, 'reject')"
                                icon="x-circle"
                            >
                                Reject
                            </flux:button>
                        @elseif ($booking['isApproved'])
                            <flux:button
                                wire:click="submitForm({{ $booking['id'] }}, 'pending')"
                                icon="exclamation-triangle"
                            >
                                Pending
                            </flux:button>

                            <flux:button
                                wire:click="submitForm({{ $booking['id'] }}, 'reject')"
                                icon="x-circle"
                            >
                                Reject
                            </flux:button>
                        @elseif ($booking['isRejected'])
                            <flux:button
                                wire:click="submitForm({{ $booking['id'] }}, 'approve')"
                                icon="check-circle"
                            >
                                Approve
                            </flux:button>
                            <flux:button
                                wire:click="submitForm({{ $booking['id'] }}, 'pending')"
                                icon="exclamation-triangle"
                            >
                                Pending
                            </flux:button>
                        @endif
                    </flux:button.group>
                </div>
            </div>
        @endforeach

        @if (count($bookings) == 0)
            <div
                class="flex min-w-fit flex-col items-center justify-center gap-2 rounded-md border px-4 py-20"
            >
                <flux:heading size="xl">No bookings to show</flux:heading>
                <flux:text variant="subtle">
                    All bookings maybe currently pending or may not exist. Kindly make some bookings
                    and approve them
                </flux:text>
            </div>
        @endif
    </div>
</div>
