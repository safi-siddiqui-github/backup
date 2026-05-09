<?php

use App\Enums\NotifyBarEnum;
use App\Http\Requests\AuthRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

use function Livewire\Volt\{computed, state};

$authRequest = new AuthRequest();
state($authRequest->logoutState());

$logout = function () use ($authRequest) {
    try {
        $this->errors = [];
        $this->resetErrorBag();
        //
        $authRequest->attemptLogoutFN();
        //
        session()->flash('status', NotifyBarEnum::LOGOUT_SUCCESS);
        //
    } catch (ValidationException $e) {
        $this->errors = $e->validator->getMessageBag()->toArray();
        return;
    }

    $this->redirectRoute('livewire.home', navigate: true);
};

$username = computed(function () {
    return Auth::user()->username;
    return ucfirst(Auth::user()->username);
});

?>

<header class="flex flex-wrap items-center justify-center gap-4 border-b border-slate-500 py-1 pr-4 sm:justify-between sm:py-0">
    <div class="flex flex-wrap items-center justify-center">
        <a
            wire:navigate
            href="{{ route('livewire.home') }}"
            class="flex gap-1 bg-black p-2 text-white md:px-6 dark:bg-white dark:text-black"
        >
            <livewire:default.svg.laravel class="size-7" />
            <span class="text-lg font-medium">Livewire</span>
        </a>
        <a
            wire:navigate
            href="{{ route('react.home') }}"
            class="flex gap-1 p-2 md:px-6"
        >
            <livewire:default.svg.react class="size-7" />
            <span class="text-lg font-medium">React</span>
        </a>
        <a
            wire:navigate
            href="{{ route('vue.home') }}"
            class="flex gap-1 p-2 md:px-6"
        >
            <livewire:default.svg.vue class="size-7" />
            <span class="text-lg font-medium">Vue</span>
        </a>
    </div>

    <div class="flex flex-wrap items-center gap-2">
        @auth
            <a
                wire:navigate
                href="{{ route('livewire.profile.overview') }}"
                class="flex min-w-fit items-center gap-1 px-2 py-1"
            >
                <livewire:default.svg.user class="size-6" />
                <p class="font-medium">
                    {{ $this->username }}
                </p>
            </a>

            <button
                type="button"
                wire:click="logout"
                class="flex min-w-fit items-center gap-1 rounded px-2 py-1"
            >
                <livewire:default.svg.sign-out class="size-6" />
                <span class="font-medium">Logout</span>
            </button>
        @endauth

        @guest
            <a
                wire:navigate
                href="{{ route('livewire.login') }}"
                class="flex min-w-fit items-center gap-1 px-2 py-1"
            >
                <livewire:default.svg.sign-in class="size-6" />
                <p class="font-medium">Login</p>
            </a>
        @endguest

        <livewire:default.components.mode-toggler />
    </div>
</header>
