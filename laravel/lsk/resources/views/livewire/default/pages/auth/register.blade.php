<?php

use App\Enums\NotifyBarEnum;
use App\Http\Requests\AuthRequest;
use Illuminate\Validation\ValidationException;

use function Livewire\Volt\{layout, rules, state, title};

layout('livewire.default.layout.auth');
title('Livewire Register');

$authRequest = new AuthRequest();
state($authRequest->registerState());
rules($authRequest->registerRules());

$submitForm = function () use ($authRequest) {
    try {
        $this->errors = [];
        $this->resetErrorBag();
        $this->validate();
        //
        $authRequest->mergeIfMissing([
            'email' => $this->email,
            'password' => $this->password,
            'username' => $this->username,
        ]);
        //
        $authRequest->attemptRegisterFN();
        //
        session()->flash('status', NotifyBarEnum::REGISTER_SUCCESS);
        //
    } catch (ValidationException $e) {
        $this->errors = $e->validator->getMessageBag()->toArray();
        return;
    }

    $this->redirectRoute('livewire.verification.notice', navigate: true);
};

?>

<div class="flex flex-col gap-6 px-4 py-8">
    <div class="flex flex-col items-center gap-2">
        <h2 class="text-4xl">REGISTER</h2>

        <a
            href="{{ route('livewire.login') }}"
            class="flex flex-wrap items-center gap-1"
            wire:navigate
        >
            <span class="tracking-tight">Already have an account?</span>
            <span class="font-medium">Sign In</span>
        </a>
    </div>

    <livewire:default.components.social-login />

    <form
        wire:submit="submitForm"
        class="flex w-full flex-col gap-4"
    >
        <div class="flex flex-col gap-1">
            <label
                for="username"
                class="w-fit font-medium"
            >
                Username
            </label>

            <input
                wire:model="username"
                id="username"
                type="text"
                placeholder="safi.siddiqui.1"
                autocomplete="on"
                class="w-full rounded border px-2 py-1"
            />

            <p
                x-show="$wire.errors?.username"
                x-transition
                x-text="$wire.errors?.username?.[0]"
                class="text-red-500"
            ></p>
        </div>

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
                    class="flex-1 outline-none"
                    autocomplete="new-password"
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
                for="password_confirmation"
                class="w-fit font-medium"
            >
                Password Confirmation
            </label>

            <div class="flex rounded border px-2 py-1 group-focus-within:outline">
                <input
                    wire:model="password_confirmation"
                    id="password_confirmation"
                    :type="show ? 'text' : 'password'"
                    placeholder="**********"
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
                x-show="$wire.errors?.password_confirmation"
                x-transition
                x-text="$wire.errors?.password_confirmation?.[0]"
                class="text-red-500"
            ></p>
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
            <span>Sign Up</span>
        </button>
    </form>
</div>
