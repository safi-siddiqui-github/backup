<?php

use Illuminate\Support\Facades\Auth;
use Livewire\Attributes\Session;
use Livewire\Volt\Component;

new class extends Component {
    public $user = null;
    public $userName = null;
    public $userImage = null;
    public $userEmail = null;

    public function mount()
    {
        $this->user = Auth::user();
        $this->userName = ucfirst($this?->user?->name ?? 'guest');
        $this->userImage = $this?->user?->avatar ?? asset('images/user-placeholder.png');
        $this->userEmail = $this?->user?->email ?? 'Viewing as guest';
    }
};
?>

<div class="flex items-center justify-between border-b border-gray-200 p-4">
    <x-ui.link
        :href="route('general.home')"
        class="text-large text-primary"
    >
        EventFlow
    </x-ui.link>

    <div class="text-secondary hidden items-center gap-4 text-lg font-medium tracking-tight lg:flex">
        <x-ui.link
            :href="route('general.home')"
            wire:current.exact="text-primary"
        >
            Home
        </x-ui.link>
        <x-ui.link
            :href="route('general.create-event')"
            wire:current.exact="text-primary"
        >
            Create Event
        </x-ui.link>
        <x-ui.link
            :href="route('general.discover-event')"
            wire:current.exact="text-primary"
        >
            Discover Event
        </x-ui.link>
        <x-ui.link
            :href="route('general.about')"
            wire:current.exact="text-primary"
        >
            About
        </x-ui.link>
        <x-ui.link
            :href="route('general.contact')"
            wire:current.exact="text-primary"
        >
            Contact
        </x-ui.link>
    </div>

    <div class="hidden items-center gap-2 lg:flex">
        <x-ui.link
            :href="route('general.create-event')"
            class="button-filled-primary"
        >
            <x-ui.icon icon="plus" />
            Create Event
        </x-ui.link>

        @auth
            <div
                class="relative flex flex-col"
                x-data="{
                    open: false,
                    toggle(value) {
                        this.open = value
                    },
                }"
            >
                <button
                    class="button-filled-secondary"
                    @click="toggle(true)"
                >
                    <x-ui.icon icon="user" />
                </button>

                <div
                    class="box-shadow absolute top-10 right-0 z-20 w-82"
                    x-show="open"
                    x-transition
                    @click.outside="toggle(false)"
                >
                    <img
                        src="{{ $userImage }}"
                        alt="{{ $userImage }}"
                        class="h-20 w-20 self-center rounded-full object-cover"
                    />
                    <div class="flex flex-col items-center">
                        <p class="font-medium">{{ $userName }}</p>
                        <p class="">{{ $userEmail }}</p>
                    </div>

                    <div class="flex-secondary">
                        <x-ui.divider />

                        <x-ui.link
                            :href="route('dashboard.home')"
                            class="box-input-secondary"
                        >
                            <x-ui.icon icon="dashboard" />
                            Dashboard
                        </x-ui.link>
                        <x-ui.link
                            :href="route('general.home')"
                            class="box-input-secondary"
                        >
                            <x-ui.icon icon="setting" />
                            Setting
                        </x-ui.link>

                        <x-ui.divider />

                        @auth
                            <button
                                class="flex items-center gap-2 py-1"
                                @click="$dispatch('modal-event', {type: 'sign-out'})"
                            >
                                <livewire:svg.logout />
                                <p class="heading-four">Sign Out</p>
                            </button>
                        @else
                            <a
                                href="{{ route('login') }}"
                                wire:nagivate
                                class="flex items-center gap-2 py-1"
                            >
                                <livewire:svg.login />
                                <p class="heading-four">Sign In</p>
                            </a>
                        @endauth
                    </div>
                </div>
            </div>
        @else
            <x-ui.link
                :href="route('login')"
                class="button-filled-secondary"
            >
                <x-ui.icon icon="signin" />
                Sign In
            </x-ui.link>
        @endauth
    </div>

    <button
        @click="$dispatch('modal-event', {type: 'sidebar-show'})"
        class="lg:hidden"
    >
        <x-ui.icon
            icon="menu"
            class="text-primary size-8"
        />
    </button>
</div>
