<?php

use App\Enums\NotifyBarEnum;
use Illuminate\Support\Facades\Auth;

use function Livewire\Volt\{computed, state};

$logout = function () {
    auth()->guard('web')->logout();

    session()->invalidate();
    session()->regenerateToken();
    
    session()->flash('status', NotifyBarEnum::LOGOUT_SUCCESS);
    $this->redirectRoute('auth.login');
};

$username = computed(function(){
    return ucfirst(Auth::user()->username);
});

?>

<header class="flex flex-wrap px-4 py-2 gap-4 justify-between items-center border-b border-slate-500">

    <a
        href="{{route('home')}}"
        class="font-medium">
        Safi Siddiqui
    </a>

    <div class="flex flex-wrap gap-2">

        @auth
        <button
            type="button"
            class="flex gap-1 border px-2 py-1 rounded items-center min-w-fit">
            <p class="">
                {{$this->username}}
            </p>
            <livewire:svg.menu />
        </button>

        <button
            type="button"
            wire:click="logout"
            class="outlined-btn">
            Logout
        </button>
        @endauth

        @guest
        <a
            href="{{route('auth.login')}}"
            class="">
            Login
        </a>
        @endguest

        <livewire:util.light-dark-mode />
    </div>

</header>