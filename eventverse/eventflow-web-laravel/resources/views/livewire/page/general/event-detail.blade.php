<?php

use Illuminate\Support\Facades\Auth;
use Livewire\Attributes\Layout;
use Livewire\Attributes\Title;
use Livewire\Volt\Component;

new #[Title('Event Detail')] #[Layout('livewire.layout.app')] class extends Component {};
?>

<div class="flex-secondary">
    <img
        src="{{ asset('images/carousel-image-one.png') }}"
        alt="carousel-image-one.png"
        class="h-96 w-full object-cover"
    />

    <div
        class="flex-primary gap-10"
        x-data="{
            show: 'about',
            updateShow(value) {
                this.show = value
            },
        }"
    >
        <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div class="button-outlined-primary sm:max-w-md">
                <button
                    class="flex-1"
                    :class="{'underline': show === 'about'}"
                    @click="updateShow('about')"
                >
                    About
                </button>
                <span class="">|</span>
                <button
                    class="flex-1"
                    :class="{'underline': show === 'location'}"
                    @click="updateShow('location')"
                >
                    Location
                </button>
                <span class="">|</span>
                <button
                    class="flex-1"
                    :class="{'underline': show === 'organizer'}"
                    @click="updateShow('organizer')"
                >
                    Organizer
                </button>
            </div>

            <div class="box-input-secondary">
                <button class="button-filled-secondary">
                    <livewire:svg.heart-outlined />
                    Favourite
                </button>

                <button class="button-filled-secondary">
                    <livewire:svg.share-outlined />
                    Share
                </button>
            </div>
        </div>

        <div class="flex-secondary lg:flex-row">
            <div class="flex-secondary items-start lg:flex-1">
                <p class="text-large">Summer Music Festival 2025</p>
                <div class="button-outlined-primary flex-0 text-sm">Music</div>
                <p class="text-leading">
                    Enjoy an evening of smooth jazz performances by local and international artists. Dinner packages available.
                </p>
            </div>

            <div class="flex-secondary items-start lg:flex-1">
                <div class="button-outlined-primary">
                    <x-ui.icon icon="calendar" />
                    <p class="">Friday 11 June, 11:50</p>
                </div>
                <div class="button-outlined-primary">
                    <x-ui.icon icon="location" />
                    <p class="">Central Park, New York</p>
                </div>

                <button
                    class="button-filled-primary"
                    @click="updateShowModal(true)"
                >
                    <x-ui.icon icon="ticket" />
                    Ticket for $99.99
                </button>

                <p class="text-leading">Refund Policy: Refunds available up to 7 days before the event.</p>

                <x-ui.link
                    class="text-primary box-input-secondary"
                    :href="route('general.event-detail')"
                >
                    <p>Terms & Conditions</p>
                    <x-ui.icon icon="link" />
                </x-ui.link>
            </div>
        </div>

        <div
            class="flex-secondary"
            x-transition
            x-show="show === 'about'"
        >
            <p class="text-medium">About</p>

            <ul class="flex-secondary list-outside list-disc">
                <p class="font-medium">What you'll get</p>

                <div class="flex flex-col pl-8">
                    <li>Access to all event activities</li>
                    <li>Networking opportunities with like-minded people</li>
                    <li>Certificate of participation</li>
                    <li>Reserved seating</li>
                </div>
            </ul>

            <ul class="flex-secondary list-outside list-disc">
                <p class="font-medium">Who Should Attend</p>

                <div class="flex flex-col pl-8">
                    <li>Enthusiasts and professionals in the field</li>
                    <li>People looking to expand their network</li>
                    <li>Anyone interested in learning more about Music</li>
                </div>
            </ul>

            <div class="flex-secondary">
                <p class="font-medium">Event Schedule</p>

                <div class="flex-secondary pl-4">
                    @for ($i=1;$i< 4;$i++)
                        <div class="border-primary flex-secondary gap-2 border-y-0 border-r-0 border-l-4 p-4">
                            <p class="text-leading">11:50 AM</p>
                            <p class="text-medium">Registration & Welcome</p>

                            <p class="text-leading">Check in and collect your event materials</p>
                        </div>
                    @endfor
                </div>
            </div>
        </div>

        <div
            class="flex-secondary"
            x-transition
            x-show="show === 'location'"
        >
            <div class="flex-secondary items-start">
                <p class="text-medium">Location</p>
                <div class="button-outlined-primary">
                    <x-ui.icon icon="location" />
                    <p class="">Central Park, New York</p>
                </div>

                <p class="text-leading">Full address and directions will be provided after registration</p>
            </div>

            <div class="flex-secondary h-96 items-center justify-center gap-0 bg-gray-200">
                <x-ui.icon icon="location" />
                <p class="">Map Loading</p>
            </div>
        </div>

        <div
            class="flex-secondary"
            x-transition
            x-show="show === 'organizer'"
        >
            <p class="text-medium">Organizer</p>

            <flex class="flex-secondary">
                <div class="flex flex-wrap items-center gap-2">
                    <img
                        src="{{ asset('images/user.png') }}"
                        alt="user.png"
                        class="h-20 w-20 rounded-full object-cover"
                    />

                    <div class="flex flex-col flex-1">
                        <p class="text-medium">John Doe</p>
                        <p class="text-leading">Event Organizer</p>
                    </div>
                </div>

                <p class="text-leading max-w-md">
                    Jazz Collective specializes in creating memorable music events. With years of experience in the industry, they bring quality and
                    professionalism to every event they organize.
                </p>
            </flex>

            <div class="flex-secondary items-start">
                <p class="text-medium">Contact the organizer</p>

                <p class="text-leading">
                    <span class="">Have questions about this event?</span>
                    <span class="font-medium text-black">Contact the organizer directly.</span>
                </p>

                <button class="button-filled-primary">
                    <livewire:svg.mail-outlined />
                    Message Organizer
                </button>
            </div>
        </div>
    </div>

    <div
        class="oveflow-y-auto absolute flex h-full w-full flex-col items-center bg-black/10 p-4 py-10 backdrop-blur"
        x-show="showModal"
        x-transition
    >
        <div
            class="border-box flex w-full max-w-xl flex-col gap-4 bg-white"
            @click.outside="updateShowModal(false)"
        >
            <p class="heading-two">Choose your ticket category</p>
            <hr class="border-light" />

            <div class="flex flex-col gap-4">
                <div class="pill-red">Popular</div>

                <div class="flex flex-col gap-4">
                    <div class="flex flex-col gap-2">
                        <div class="flex flex-col gap-2 sm:flex-row sm:gap-4">
                            <div class="flex items-center gap-2">
                                <livewire:svg.ticket-outlined class="text-primary" />
                                <p class="heading-three">Early Bird</p>
                            </div>

                            <p class="leading-one flex items-center gap-2">
                                <livewire:svg.users />
                                <span class="">57 available</span>
                            </p>
                        </div>

                        <p class="heading-four text-red-500">Limited time offer - Save 25%</p>
                    </div>
                </div>
            </div>

            <hr class="border-light" />

            <div class="flex flex-col">
                <div class="pill-purple">Premium</div>
            </div>

            <hr class="border-light" />

            <div class="flex flex-wrap items-center justify-between gap-2">
                <p class="heading-four">Total $254</p>

                <div class="flex flex-wrap items-center gap-2">
                    <a
                        class="purple-button w-fit"
                        wire:navigate
                        href="{{ route('general.event-ticket') }}"
                    >
                        <livewire:svg.ticket-outlined />
                        Continue
                    </a>

                    <button
                        class="gray-box w-fit"
                        @click="updateShowModal(false)"
                    >
                        <livewire:svg.cross />
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>
