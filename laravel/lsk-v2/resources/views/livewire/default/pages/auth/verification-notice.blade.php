<?php

use App\Enums\NotifyBarEnum;
use App\Http\Requests\AuthRequest;
use Illuminate\Validation\ValidationException;

use function Livewire\Volt\{layout, rules, state, title};

layout('livewire.default.layout.auth');
title('Livewire Verification Notice');

$authRequest = new AuthRequest();
state($authRequest->verificationState());
rules($authRequest->verificationRules());

$submitForm = function () use ($authRequest) {
    try {
        $this->errors = [];
        $this->resetErrorBag();
        $this->validate();
        //
        $authRequest->mergeIfMissing([
            'email' => $this->email,
            'pin' => $this->pin,
        ]);
        //
        $authRequest->attemptEmailVerificationFN();
        //
        session()->flash('status', NotifyBarEnum::VERIFICATION_SUCCESS);
        //
    } catch (ValidationException $e) {
        $this->errors = $e->validator->getMessageBag()->toArray();
        return;
    }

    $this->redirectRoute('livewire.profile.overview', navigate: true);
};

$resendPin = function () use ($authRequest) {
    try {
        $this->errors = [];
        $this->resetErrorBag();
        //
        $authRequest->mergeIfMissing([
            'email' => $this->email,
        ]);
        //
        $authRequest->attemptEmailVerificationResendFN();
        //
    } catch (ValidationException $e) {
        $this->errors = $e->validator->getMessageBag()->toArray();
        return;
    }
};

?>

<div class="flex flex-col gap-6 px-4 py-8">
    <div class="flex flex-col items-center gap-2">
        <h2 class="text-2xl">EMAIL VERIFICATION</h2>

        <button
            wire:click="resendPin"
            type="button"
            class="flex flex-wrap items-center gap-1 outline-none hover:underline"
        >
            <span class="tracking-tight">Get verfication Email?</span>
            <span class="font-medium">Resend</span>
        </button>
    </div>

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
                value="{{ $this->email }}"
                disabled="true"
                type="text"
                class="w-full rounded border px-2 py-1"
            />

            <p
                x-show="$wire.errors?.email"
                x-transition
                x-text="$wire.errors?.email?.[0]"
                class="text-red-500"
            ></p>
        </div>

        <div class="flex flex-col gap-1">
            <label
                for="pin"
                class="w-fit font-medium"
            >
                Pin Code
            </label>

            <input
                wire:model="pin"
                id="pin"
                type="text"
                placeholder="0000"
                class="w-full rounded border px-2 py-1"
            />

            <p
                x-show="$wire.errors?.pin"
                x-transition
                x-text="$wire.errors?.pin?.[0]"
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
            <span>Verify Email</span>
        </button>
    </form>
</div>
