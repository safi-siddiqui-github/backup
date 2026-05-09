<?php

use App\Enums\ToastBarEnum;
use App\Http\Requests\AuthRequest;
use App\Models\Booking;

use function Livewire\Volt\state;

$authRequest = new AuthRequest();

state(['bookings' => Booking::where('isPending', true)->count()]);

$submitForm = function () use ($authRequest) {
    $authRequest->attemptLogoutFN();
    //
    session()->flash('status', ToastBarEnum::LOGOUT_SUCCESS);
    //
    $this->redirectRoute('app.home', navigate: true);
};

?>

<div>
    <flux:header
        class="items-center border-b border-zinc-200 bg-zinc-50 pt-2 lg:pt-0 dark:border-zinc-700 dark:bg-zinc-900"
        container
    >
        <flux:sidebar.toggle
            class="lg:hidden"
            icon="bars-2"
            inset="left"
        />

        <flux:brand
            class="max-lg:hidden dark:hidden"
            name="Booking App"
            href="{{ route('app.home') }}"
            logo="{{ asset('icons8-checkmark-150-black.png') }}"
        />

        <flux:brand
            class="hidden max-lg:hidden! dark:flex"
            name="Booking App"
            href="{{ route('app.home') }}"
            logo="{{ asset('icons8-checkmark-150-white.png') }}"
        />

        <flux:navbar class="max-lg:hidden">
            <flux:navbar.item
                :current="request()->routeIs('app.home')"
                href="{{ route('app.home') }}"
                icon="home"
            >
                Home
            </flux:navbar.item>

            @auth
                <flux:navbar.item
                    :badge="$bookings"
                    :current="request()->routeIs('app.bookings')"
                    href="{{ route('app.bookings') }}"
                    icon="bookmark"
                >
                    Bookings
                </flux:navbar.item>
            @else
                <flux:modal.trigger name="app-login">
                    <flux:navbar.item
                        :badge="$bookings"
                        href="#"
                        icon="bookmark"
                    >
                        Bookings
                    </flux:navbar.item>
                </flux:modal.trigger>
            @endauth
        </flux:navbar>

        <flux:spacer />

        @auth
            <flux:dropdown
                align="start"
                position="top"
            >
                <flux:profile avatar="{{ asset('avatar.jpg') }}" />

                <flux:menu>
                    <flux:menu.item icon="user-circle">Safi Siddiqui</flux:menu.item>

                    <flux:menu.separator />

                    <flux:menu.item
                        wire:click="submitForm"
                        icon="arrow-left-end-on-rectangle"
                    >
                        Logout
                    </flux:menu.item>
                </flux:menu>
            </flux:dropdown>
        @else
            <flux:modal.trigger name="app-login">
                <flux:button icon="arrow-right-start-on-rectangle">Login</flux:button>
            </flux:modal.trigger>
        @endauth
    </flux:header>

    <flux:sidebar
        class="border border-zinc-200 bg-zinc-50 lg:hidden rtl:border-r-0 rtl:border-l dark:border-zinc-700 dark:bg-zinc-900"
        stashable
        sticky
    >
        <flux:sidebar.toggle
            class="lg:hidden"
            icon="x-mark"
        />

        <flux:brand
            class="max-lg:hidden dark:hidden"
            name="Booking App"
            href="{{ route('app.home') }}"
            logo="{{ asset('icons8-checkmark-150-black.png') }}"
        />

        <flux:brand
            class="hidden max-lg:hidden! dark:flex"
            name="Booking App"
            href="{{ route('app.home') }}"
            logo="{{ asset('icons8-checkmark-150-white.png') }}"
        />

        <flux:navlist variant="outline">
            <flux:navlist.item
                current
                href="{{ route('app.home') }}"
                icon="home"
            >
                Home
            </flux:navlist.item>

            @auth
                <flux:navbar.item
                    :badge="$bookings"
                    href="{{ route('app.bookings') }}"
                    icon="bookmark"
                >
                    Bookings
                </flux:navbar.item>
            @else
                <flux:modal.trigger name="app-login">
                    <flux:navbar.item
                        :badge="$bookings"
                        href="#"
                        icon="bookmark"
                    >
                        Bookings
                    </flux:navbar.item>
                </flux:modal.trigger>
            @endauth
        </flux:navlist>

        <flux:spacer />

        <flux:navlist variant="outline">
            @auth
                <flux:navlist.item
                    href="#"
                    icon="user-circle"
                >
                    Safi Siddiqui
                </flux:navlist.item>
                <flux:navlist.item
                    wire:click="submitForm"
                    icon="arrow-left-end-on-rectangle"
                >
                    Logout
                </flux:navlist.item>
            @else
                <flux:modal.trigger name="app-login">
                    <flux:navlist.item
                        href="#"
                        icon="wrench"
                    >
                        Login
                    </flux:navlist.item>
                </flux:modal.trigger>
            @endauth
        </flux:navlist>
    </flux:sidebar>
</div>
