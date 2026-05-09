<?php

use Livewire\Attributes\Title;
use Livewire\Attributes\Url;
use Livewire\Volt\Component;

new #[Title('Dashboard')] class extends Component {};
?>

<x-layouts.app :title="$title ?? null">
    <livewire:components.header />

    <div
        class="flex flex-col bg-gray-50 lg:flex-row"
        x-data="{
            showMenu: false,
            toggleMenu() {
                if (window.innerWidth >= 1024) {
                    this.showMenu = true
                    return
                }
                this.showMenu = ! this.showMenu
            },
        }"
        x-init="
            if (window.innerWidth >= 1024) {
                showMenu = true
            }
        "
    >
        <div class="flex-primary flex-1 lg:max-w-96">
            <button
                class="box-input-secondary justify-between lg:hidden"
                @click="toggleMenu()"
            >
                <p class="text-medium">Details Menu</p>
                <x-ui.icon
                    icon="menu"
                    class="size-7"
                />
            </button>

            <div
                class="flex-secondary grid grid-cols-1 items-start md:grid-cols-2 lg:grid-cols-1"
                x-show="showMenu"
                x-transition
            >
                <div
                    class="box-shadow"
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
                        class="box-input-secondary flex-1 justify-between"
                        @click="toggle()"
                    >
                        <p class="text-medium">Event Details</p>

                        <span
                            class="transition"
                            :class="{'rotate-90': show}"
                        >
                            <x-ui.icon icon="arrow-right" />
                        </span>
                    </button>

                    <div
                        class="box-input-primary gap-2"
                        x-transition
                        x-show="show"
                    >
                        <x-ui.link
                            :href="route('dashboard.event-dashboard', ['id' => $id ])"
                            :class="$eventDashboardRoute ? 'button-filled-primary' : 'button-outlined-primary'"
                        >
                            Event Details
                        </x-ui.link>
                    </div>
                </div>
                <div
                    class="box-shadow"
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
                        class="box-input-secondary flex-1 justify-between"
                        @click="toggle()"
                    >
                        <p class="text-medium">Event Management</p>

                        <span
                            class="transition"
                            :class="{'rotate-90': show}"
                        >
                            <x-ui.icon icon="arrow-right" />
                        </span>
                    </button>

                    <div
                        class="box-input-primary gap-2"
                        x-transition
                        x-show="show"
                    >
                        <x-ui.link
                            :href="route('dashboard.rsvp-page', ['id' => $id ])"
                            :class="$rsvpRoute ? 'button-filled-primary' : 'button-outlined-primary'"
                        >
                            RSVP Management
                        </x-ui.link>
                        <x-ui.link
                            :href="route('dashboard.rsvp-page', ['id' => $id ])"
                            class="button-outlined-primary"
                        >
                            Schedules & Timeline
                        </x-ui.link>
                        <x-ui.link
                            :href="route('dashboard.rsvp-page', ['id' => $id ])"
                            class="button-outlined-primary"
                        >
                            Ticketing System
                        </x-ui.link>
                        <x-ui.link
                            :href="route('dashboard.seating-page', ['id' => $id ])"
                            :class="$seatingRoute ? 'button-filled-primary' : 'button-outlined-primary'"
                        >
                            Seating Arrangement
                        </x-ui.link>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex-primary min-w-0 flex-1 lg:pl-0">
            {{ $slot }}
        </div>
    </div>

    <livewire:components.footer />
</x-layouts.app>
