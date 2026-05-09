<?php

use App\Enums\NotifyBarEnum;
use App\Models\User;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;

use function Livewire\Volt\{layout, rules, state, title};

layout('livewire.layout.auth');
title('Reset Password');
state([
    'token' => '',
    'password' => '',
    "showPassword" => false,
    "passwordType" => "password",
]);

state(['email'])->url()->locked();

rules([
    'email' => ['required', 'string', 'email', 'exists:users,email'],
    "password" => ["required", "string", "min:5"],
]);

$togglePassword = function () {
    $this->showPassword = !$this->showPassword;
    $this->passwordType = $this->showPassword ? "text" : "password";
};

$passwordReset = function () {
    $this->validate();

    $status = Password::reset(
        [
            'token' => $this->token,
            'email' => $this->email,
            'password' => $this->password,
            'password_confirmation' => $this->password,
        ],
        function (User $user, string $password) {
            $user->forceFill([
                'password' => Hash::make($password)
            ])->setRememberToken(Str::random(60));

            $user->save();

            event(new PasswordReset($user));
        }
    );

    if ($status === Password::PasswordReset) {
        session()->flash('status', NotifyBarEnum::PASSWORD_RESET);
        return $this->redirectRoute('auth.login');
    }

    return $this->redirectRoute('password.request');
};

?>

<div class="flex flex-col justify-center items-center md:h-screen md:overflow-y-auto md:min-h-[650px]">

    <div class="flex flex-col gap-6 max-w-lg px-4 py-8 w-full">

        <livewire:util.light-dark-mode />

        <div class="flex flex-col items-center gap-2">
            <h2 class="text-4xl">
                PASSWORD RESET
            </h2>

            <p class="">
                Reset your password
            </p>

        </div>

        <form
            wire:submit="passwordReset"
            class="flex flex-col gap-4 w-full">

            <div class="flex flex-col border px-2 py-1 gap-1 rounded bg-slate-100 cursor-not-allowed">

                <div class="flex items-center gap-1">
                    <livewire:svg.email class="size-4" />

                    <label
                        for="email"
                        class="text-sm font-medium">
                        Email
                    </label>
                </div>

                <input
                    readonly
                    wire:model="email"
                    value="{{$this->email}}"
                    id="email"
                    type="text"
                    placeholder="safi@gmail.com"
                    class="outline-none cursor-not-allowed" />

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

            <button
                type="submit"
                class="border py-1 rounded-full hover:underline">
                Update Password
            </button>

        </form>

    </div>

</div>