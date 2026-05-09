<?php

use App\Enums\NotifyBarEnum;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

use function Livewire\Volt\{layout, rules, state, title};

layout('livewire.layout.auth');
title('Login');

state([
    "emailUsername" => "",
    "password" => "",
    "remember" => true,
    "showPassword" => false,
    "passwordType" => "password",
]);

rules([
    "emailUsername" => ["required", "string"],
    "password" => ["required", "string", "min:5"],
    "remember" => ["boolean"],
]);

$login = function () {
    $this->validate();

    $user = User::orWhere('username', $this->emailUsername)
        ->orWhere('email', $this->emailUsername)
        ->first();

    if (!$user) {
        throw ValidationException::withMessages([
            'emailUsername' => 'Email/Username is not valid.'
        ]);
    }

    $passEmail = false;
    $passUsername = false;

    if (Auth::attempt(
        [
            'email' => $this->emailUsername,
            'password' => $this->password,
            // 'active' => 1
        ],
        $this->remember
    )) {
        $passEmail = true;
    }

    if (Auth::attempt(
        [
            'username' => $this->emailUsername,
            'password' => $this->password,
            // 'active' => 1
        ],
        $this->remember
    )) {
        $passUsername = true;
    }

    if ($passEmail || $passUsername) {
        request()->session()->regenerate();
        
        session()->flash('status', NotifyBarEnum::LOGIN_SUCCESS);
        return $this->redirectIntended(route('home'));
    }

    throw ValidationException::withMessages([
        'password' => 'Password is incorrect.'
    ]);
};

$togglePassword = function () {
    $this->showPassword = !$this->showPassword;
    $this->passwordType = $this->showPassword ? "text" : "password";
};

?>

<div class="flex flex-col justify-center items-center md:h-screen md:overflow-y-auto md:min-h-[500px]">

    <div class="flex flex-col gap-6 max-w-lg px-4 py-8 w-full">

        <livewire:util.light-dark-mode />

        <div class="flex flex-col items-center gap-2">
            <h2 class="text-4xl">
                LOGIN
            </h2>

            <div class="flex flex-wrap gap-1 items-center">
                <p class="">
                    Create your new account?
                </p>
                <a
                    href="{{route('auth.register')}}"
                    class="font-medium">
                    Sign Up
                </a>
            </div>

        </div>

        <livewire:auth.social-login />

        <form
            wire:submit="login"
            class="flex flex-col gap-4 w-full">

            <div class="flex flex-col border px-2 py-1 gap-1 rounded">

                <div class="flex items-center gap-1">
                    <livewire:svg.username class="size-4" />

                    <label
                        for="emailUsername"
                        class="text-sm font-medium">
                        Email/Username
                    </label>
                </div>

                <input
                    wire:model="emailUsername"
                    id="emailUsername"
                    type="text"
                    placeholder="safi@gmail.com/safi.siddiqui"
                    autocomplete="true"
                    class="outline-none" />

                @error('emailUsername')
                <p
                    wire:transition
                    class="text-red-500 text-sm">
                    {{$message}}
                </p>
                @enderror

            </div>

            <div class="flex flex-col border px-2 py-1 gap-1 rounded">

                <div class="flex items-center gap-1">
                    <livewire:svg.password class="size-4" />

                    <label
                        for="password"
                        class="text-sm font-medium">
                        Password
                    </label>
                </div>

                <div class="flex">
                    <input
                        wire:model="password"
                        id="password"
                        type="{{$passwordType}}"
                        placeholder="**********"
                        autocomplete="true"
                        class="outline-none flex-1" />

                    <button class="cursor-pointer" type="button" wire:click="togglePassword">
                        @if(!$showPassword)
                        <livewire:svg.eye-slash />
                        @else
                        <livewire:svg.eye />
                        @endif
                    </button>
                </div>

                @error('password')
                <p
                    wire:transition
                    class="text-red-500 text-sm">
                    {{$message}}
                </p>
                @enderror

            </div>

            <div class="flex justify-between flex-wrap">

                <div class="flex gap-2 items-center">
                    <input
                        id="remember"
                        type="checkbox"
                        wire:model="remember"
                        class="size-4" />

                    <label
                        for="remember"
                        class="">
                        Remember me
                    </label>
                </div>

                <a
                    href="{{route('password.request')}}"
                    class="font-medium">
                    Forgot Password?
                </a>
            </div>

            <button
                type="submit"
                class="border py-1 rounded-full hover:underline">
                Sign In
            </button>

        </form>

    </div>

</div>