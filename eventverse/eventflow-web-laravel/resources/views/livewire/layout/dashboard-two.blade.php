<?php

use Illuminate\Support\Facades\Auth;
use Livewire\Attributes\Layout;
use Livewire\Attributes\Title;
use Livewire\Volt\Component;

new class extends Component {};

?>

<x-layouts.app :title="$title ?? null">
    <livewire:components.header />

    <div class="flex flex-col gap-8 bg-gray-50 p-4 lg:p-8">
        <p class="heading-one">Event Name</p>

        <div class="flex flex-col gap-8 lg:flex-row lg:items-start">
            <div class="border-box w-full gap-4 lg:max-w-xs">
                <p class="heading-three">Event Details</p>

                <p class="">
                    <span class="font-medium">Date</span>
                    <span class="">June 14, 2026</span>
                </p>

                <p class="">
                    <span class="font-medium">Location</span>
                    <span class="">Will be added later</span>
                </p>

                <button class="purple-button">
                    <livewire:svg.plus />
                    <span>Add Location Now</span>
                </button>

                <div class="border-light"></div>

                <p class="">
                    <span class="font-medium">Status</span>
                    <span class="">Planning</span>
                </p>
            </div>

            <div class="flex flex-col gap-8 lg:w-full">
                <div class="flex flex-col gap-2">
                    <p class="heading-three">Event Modules</p>
                    <p class="leading-one">Access and manage all your event modules from one central location</p>
                </div>

                <div class="flex flex-wrap gap-2">
                    <div class="white-button">
                        10
                        <span class="text-black">Total Modules</span>
                    </div>
                    <div class="white-button">
                        10
                        <span class="text-black">Active Modules</span>
                    </div>
                    <div class="white-button">
                        5
                        <span class="text-black">Categories</span>
                    </div>
                    <div class="white-button">
                        0
                        <span class="text-black">Beta Features</span>
                    </div>
                </div>

                <div class="white-button py-1 pr-1">
                    <livewire:svg.search class="min-w-fit" />
                    <input
                        type="text"
                        class="w-full py-2 outline-none"
                        placeholder="Search..."
                    />
                    <button class="purple-button w-fit">Search</button>
                </div>
            </div>
        </div>

        <div class="flex flex-col gap-8 lg:flex-row">
            <div
                class="flex flex-1 flex-col gap-4 lg:max-w-xs"
                x-data="{
                    show: false,
                    toggle() {
                        this.show = ! this.show
                    },
                }"
                x-init="
                    if (window.innerWidth > 1024) {
                        show = true
                    }
                "
            >
                <button
                    class="gray-box lg:hidden"
                    @click="toggle()"
                >
                    <livewire:svg.menu />
                    View Modules
                </button>

                <div
                    class="flex w-full flex-col gap-6"
                    x-transition
                    x-show="show"
                >
                    <div
                        class="border-box gap-4"
                        x-data="{
                            show: true,
                            toggle() {
                                this.show = ! this.show
                            },
                            init() {
                                if (window.innerWidth < 1024) {
                                    this.show = false
                                }
                            },
                        }"
                    >
                        <button
                            class="flex items-center justify-between"
                            @click="toggle()"
                        >
                            <p class="heading-three">Event Management</p>

                            <span
                                class="transition"
                                :class="{'rotate-180': show}"
                            >
                                <livewire:svg.chevron-up-outlined class="!size-4" />
                            </span>
                        </button>

                        <div
                            class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1"
                            x-transition
                            x-show="show"
                        >
                            <a
                                href="{{ route('rsvp-page') }}"
                                class="purple-button"
                                wire:navigate
                            >
                                RSVP Management
                                <span class="pill-blue">Active</span>
                            </a>
                            <a
                                href="{{ route('rsvp-page') }}"
                                class="white-button"
                                wire:navigate
                            >
                                Schedules & Timeline
                                <span class="pill-red">Inactive</span>
                            </a>
                            <a
                                href="{{ route('rsvp-page') }}"
                                class="white-button"
                                wire:navigate
                            >
                                Ticketing System
                                <span class="pill-red">Inactive</span>
                            </a>
                            <a
                                href="{{ route('rsvp-page') }}"
                                class="white-button"
                                wire:navigate
                            >
                                Seating Arrangement
                                <span class="pill-red">Inactive</span>
                            </a>
                        </div>
                    </div>
                    <div
                        class="border-box gap-4"
                        x-data="{
                            show: true,
                            toggle() {
                                this.show = ! this.show
                            },
                            init() {
                                if (window.innerWidth < 1024) {
                                    this.show = false
                                }
                            },
                        }"
                    >
                        <button
                            class="flex items-center justify-between"
                            @click="toggle()"
                        >
                            <p class="heading-three">Financial</p>

                            <span
                                class="transition"
                                :class="{'rotate-180': show}"
                            >
                                <livewire:svg.chevron-up-outlined class="!size-4" />
                            </span>
                        </button>

                        <div
                            class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1"
                            x-transition
                            x-show="show"
                        >
                            <a
                                href="{{ route('rsvp-page') }}"
                                class="white-button"
                                wire:navigate
                            >
                                Budget Planning
                                <span class="pill-red">Inactive</span>
                            </a>
                        </div>
                    </div>
                    <div
                        class="border-box gap-4"
                        x-data="{
                            show: true,
                            toggle() {
                                this.show = ! this.show
                            },
                            init() {
                                if (window.innerWidth < 1024) {
                                    this.show = false
                                }
                            },
                        }"
                    >
                        <button
                            class="flex items-center justify-between"
                            @click="toggle()"
                        >
                            <p class="heading-three">Guest Engagement</p>

                            <span
                                class="transition"
                                :class="{'rotate-180': show}"
                            >
                                <livewire:svg.chevron-up-outlined class="!size-4" />
                            </span>
                        </button>

                        <div
                            class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1"
                            x-transition
                            x-show="show"
                        >
                            <a
                                href="{{ route('rsvp-page') }}"
                                class="white-button"
                                wire:navigate
                            >
                                Announcement
                                <span class="pill-red">Inactive</span>
                            </a>
                            <a
                                href="{{ route('rsvp-page') }}"
                                class="white-button"
                                wire:navigate
                            >
                                Games & Activities
                                <span class="pill-red">Inactive</span>
                            </a>
                            <a
                                href="{{ route('rsvp-page') }}"
                                class="white-button"
                                wire:navigate
                            >
                                Survey & Feedback
                                <span class="pill-red">Inactive</span>
                            </a>
                        </div>
                    </div>
                    <div
                        class="border-box gap-4"
                        x-data="{
                            show: true,
                            toggle() {
                                this.show = ! this.show
                            },
                            init() {
                                if (window.innerWidth < 1024) {
                                    this.show = false
                                }
                            },
                        }"
                    >
                        <button
                            class="flex items-center justify-between"
                            @click="toggle()"
                        >
                            <p class="heading-three">Content</p>

                            <span
                                class="transition"
                                :class="{'rotate-180': show}"
                            >
                                <livewire:svg.chevron-up-outlined class="!size-4" />
                            </span>
                        </button>

                        <div
                            class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1"
                            x-transition
                            x-show="show"
                        >
                            <a
                                href="{{ route('rsvp-page') }}"
                                class="white-button"
                                wire:navigate
                            >
                                Media Management
                                <span class="pill-red">Inactive</span>
                            </a>
                        </div>
                    </div>
                    <div
                        class="border-box gap-4"
                        x-data="{
                            show: true,
                            toggle() {
                                this.show = ! this.show
                            },
                            init() {
                                if (window.innerWidth < 1024) {
                                    this.show = false
                                }
                            },
                        }"
                    >
                        <button
                            class="flex items-center justify-between"
                            @click="toggle()"
                        >
                            <p class="heading-three">Analytics & Insights</p>

                            <span
                                class="transition"
                                :class="{'rotate-180': show}"
                            >
                                <livewire:svg.chevron-up-outlined class="!size-4" />
                            </span>
                        </button>

                        <div
                            class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1"
                            x-transition
                            x-show="show"
                        >
                            <a
                                href="{{ route('rsvp-page') }}"
                                class="white-button"
                                wire:navigate
                            >
                                Analytics & Reporting
                                <span class="pill-red">Inactive</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div class="flex min-w-0 flex-col gap-8 lg:flex-1">
                {{ $slot }}
            </div>
        </div>
    </div>

    <livewire:components.footer />
</x-layouts.app>
