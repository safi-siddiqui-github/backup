<?php

use App\Enums\NotifyBarEnum;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Support\Facades\Auth;

use function Livewire\Volt\{layout, rules, state, title};

layout('livewire.layout.auth');
title('Register');

state([
    "username" => "",
    "email" => "",
    "password" => "",
    "remember" => true,
    "showPassword" => false,
    "passwordType" => "password",
]);

rules([
    "username" => ["required", "string", "unique:users,username", "max:100"],
    "email" => ["required", "string", "email", "unique:users,email", "max:100"],
    "password" => ["required", "string", "min:5", "max:100"],
    "remember" => ["boolean"],
]);

$register = function () {
    $this->validate();

    $user = new User();
    $user->username = $this->username;
    $user->email = $this->email;
    $user->password = $this->password;
    $user->save();

    // Verifiaction Email
    event(new Registered($user));

    // Verifiaction Notice Requires Auth
    Auth::login($user, $remember = true);
    session()->regenerate();
    
    session()->flash('status', NotifyBarEnum::REGISTER_SUCCESS);
    $this->redirectRoute('verification.notice', navigate: true);
};

$togglePassword = function () {
    $this->showPassword = !$this->showPassword;
    $this->passwordType = $this->showPassword ? "text" : "password";
};

?>

<div class="flex flex-col justify-center items-center md:h-screen md:overflow-y-auto md:min-h-[650px]">

    <div class="flex flex-col gap-6 max-w-lg px-4 py-8 w-full">

        <livewire:util.light-dark-mode />

        <div class="flex flex-col items-center gap-2">
            <h2 class="text-4xl">
                REGISTER
            </h2>

            <div class="flex flex-wrap gap-1 items-center">
                <p class="">
                    Already have an account?
                </p>
                <a
                    href="{{route('auth.login')}}"
                    class="font-medium">
                    Sign In
                </a>
            </div>

        </div>

        <livewire:auth.social-login />

        <form
            wire:submit="register"
            class="flex flex-col gap-4 w-full">

            <div class="flex flex-col border px-2 py-1 gap-1 rounded">

                <div class="flex items-center gap-1">
                    <livewire:svg.email class="size-4" />

                    <label
                        for="email"
                        class="text-sm font-medium">
                        Email
                    </label>
                </div>

                <input
                    wire:model="email"
                    id="email"
                    type="text"
                    placeholder="safi@gmail.com"
                    autocomplete="true"
                    class="outline-none" />

                @error('email')
                <p
                    wire:transition
                    class="text-red-500 text-sm">
                    {{$message}}
                </p>
                @enderror

            </div>

            <div class="flex flex-col border px-2 py-1 gap-1 rounded">

                <div class="flex items-center gap-1">
                    <livewire:svg.username class="size-4" />

                    <label
                        for="username"
                        class="text-sm font-medium">
                        Username
                    </label>
                </div>

                <input
                    wire:model="username"
                    id="username"
                    type="text"
                    placeholder="safi@gmail.com"
                    autocomplete="true"
                    class="outline-none" />

                @error('username')
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

            <button
                type="submit"
                class="border py-1 rounded-full hover:underline">
                Sign Up
            </button>

        </form>

    </div>

</div>