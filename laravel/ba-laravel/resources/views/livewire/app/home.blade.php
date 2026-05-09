<?php

use App\Http\Resources\BookingResource;
use App\Models\Booking;

use function Livewire\Volt\layout;
use function Livewire\Volt\state;
use function Livewire\Volt\title;

layout('livewire.layouts.app');
title('Home - Booking App');

state([
    'today' => now()->format('l, jS \of F - Y'),
    'days' => now()->daysInMonth,
    'bookings' => BookingResource::collection(
        Booking::whereDate('date', now())
            ->where('isApproved', true)
            ->get(),
    )->resolve(),
]);

?>

<div class="flex flex-col gap-10 px-4 py-20">
    <div class="flex flex-col items-center justify-center gap-6 text-center">
        <flux:text class="text-5xl font-semibold">Book Your Next Event</flux:text>

        <flux:text class="max-w-96">
            Our event managers inline your events to track all possible booked events. Hurry up to
            book to your event !
        </flux:text>

        <flux:heading size="xl">Today! {{ $today }}</flux:heading>

        <flux:modal.trigger name="book-now">
            <flux:button icon="calendar-days">Book Now</flux:button>
        </flux:modal.trigger>
    </div>

    <div class="mx-auto grid w-full max-w-7xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
        @foreach ($bookings as $booking)
            <div class="flex flex-col gap-4 rounded-md border p-4">
                <flux:text class="flex items-center gap-1">
                    <flux:icon.at-symbol class="size-7" />
                    {{ $booking['email'] }}
                </flux:text>

                <flux:separator />

                <div class="flex flex-col">
                    <flux:heading>{{ $booking['name'] }}</flux:heading>
                    <flux:text>{{ $booking['description'] }}</flux:text>
                </div>

                <flux:separator text="Timestamps" />

                <div class="flex flex-col">
                    <div class="font-bold">{{ $booking['timeslot_one']['name'] }}</div>
                    <div>
                        {{ $booking['timeslot_one']['start'] }} -
                        {{ $booking['timeslot_one']['stop'] }}
                    </div>
                </div>

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

                @if (count($booking['timeslot_three']) > 0)
                    <div class="flex flex-col">
                        <div class="font-bold">{{ $booking['timeslot_three']['name'] }}</div>
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
        @endforeach

        @if (count($bookings) == 0)
            <div
                class="flex min-w-fit flex-col items-center justify-center gap-2 rounded-md border px-4 py-20 sm:col-span-2 lg:col-span-3"
            >
                <flux:heading size="xl">No bookings to show</flux:heading>
                <flux:text variant="subtle">
                    All bookings maybe currently pending or may not exist. Kindly make some bookings
                    and approve them
                </flux:text>
            </div>
        @endif
    </div>

    <livewire:app.partials.book />
</div>
