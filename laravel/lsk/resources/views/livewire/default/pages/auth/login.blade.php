<?php

use App\Enums\NotifyBarEnum;
use App\Http\Requests\AuthRequest;
use Illuminate\Validation\ValidationException;

use function Livewire\Volt\{layout, rules, state, title};

layout('livewire.default.layout.auth');
title('Livewire Login');

$authRequest = new AuthRequest();
state($authRequest->loginState());
rules($authRequest->loginRules());

$submitForm = function () use ($authRequest) {
    try {
        $this->errors = [];
        $this->resetErrorBag();
        $this->validate();
        //
        $authRequest->mergeIfMissing([
            'email' => $this->email,
            'password' => $this->password,
            'remember' => $this->remember,
        ]);
        //
        $authRequest->attemptLoginFN();
        //
        session()->flash('status', NotifyBarEnum::LOGIN_SUCCESS);
        //
    } catch (ValidationException $e) {
        $this->errors = $e->validator->getMessageBag()->toArray();
        return;
    }

    $this->redirectIntended(route('livewire.profile.overview'), navigate: true);
};

$forgotPasswordRequest = function () use ($authRequest) {
    try {
        $this->errors = [];
        $this->resetErrorBag();
        $this->validate($authRequest->passwordRequestRules(), [
            'email.required' => 'Email is required to reset password.',
        ]);
        //

        $authRequest->mergeIfMissing([
            'email' => $this->email,
        ]);
        //
        $authRequest->throttlePasswordRequestFN();
        //
        session()->flash('status', NotifyBarEnum::PASSWORD_REQUEST);
        //
    } catch (ValidationException $e) {
        $this->errors = $e->validator->getMessageBag()->toArray();
        return;
    }

    $this->redirectRoute('livewire.password.reset', ['email' => $this->email], navigate: true);
};

?>

<div class="flex flex-col gap-6 px-4 py-8">
    <div class="flex flex-col items-center gap-2">
        <h2 class="text-4xl">LOGIN</h2>

        <a
            href="{{ route('livewire.register') }}"
            class="flex flex-wrap items-center gap-1"
            wire:navigate
        >
            <span class="tracking-tight">Create your new account?</span>
            <span class="font-medium">Sign Up</span>
        </a>
    </div>

    <livewire:default.components.social-login />

    <form
        wire:submit="submitForm"
        class="flex w-full flex-col gap-4"
    >
        <div class="flex flex-col gap-1">
            <label
                for="email"
                class="w-fit font-medium"
            >
                Email
            </label>

            <input
                wire:model="email"
                id="email"
                type="text"
                placeholder="safi@gmail.com"
                autocomplete="on"
                class="w-full rounded border px-2 py-1"
            />

            <p
                x-show="$wire.errors?.email"
                x-transition
                x-text="$wire.errors?.email?.[0]"
                class="text-red-500"
            ></p>
        </div>

        <div
            class="group flex flex-col gap-1"
            x-data="{
                show: false,
                toggle() {
                    this.show = ! this.show
                },
            }"
        >
            <label
                for="password"
                class="w-fit font-medium"
            >
                Password
            </label>

            <div class="flex rounded border px-2 py-1 group-focus-within:outline">
                <input
                    wire:model="password"
                    id="password"
                    :type="show ? 'text' : 'password'"
                    placeholder="**********"
                    autocomplete="true"
                    class="flex-1 outline-none"
                />

                <button
                    class="flex outline-none"
                    type="button"
                    @click="toggle()"
                >
                    <span x-show="!show">
                        <livewire:default.svg.eye-slash />
                    </span>
                    <span x-show="show">
                        <livewire:default.svg.eye />
                    </span>
                </button>
            </div>

            <p
                x-show="$wire.errors?.password"
                x-transition
                x-text="$wire.errors?.password?.[0]"
                class="text-red-500"
            ></p>
        </div>

        <div class="flex items-center justify-between">
            <div class="flex w-fit cursor-pointer items-center gap-2">
                <input
                    id="remember"
                    type="checkbox"
                    wire:model="remember"
                    class="size-4"
                />

                <label
                    for="remember"
                    class="font-medium"
                >
                    Remember Me
                </label>
            </div>

            <button
                type="button"
                wire:click="forgotPasswordRequest"
                class="rounded px-2 py-1 font-medium"
            >
                Forgot Password?
            </button>
        </div>

        <button
            type="submit"
            class="relative flex items-center justify-center gap-2 rounded border py-1 font-medium"
            wire:loading.attr="disabled"
        >
            <span
                wire:loading
                class="absolute right-2"
            >
                <livewire:default.svg.loader class="size-4 animate-spin" />
            </span>
            <span>Sign In</span>
        </button>
    </form>
</div>
