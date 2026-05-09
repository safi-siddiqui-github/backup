<?php

use App\Enums\ToastBarEnum;
use App\Http\Requests\AuthRequest;
use Illuminate\Support\Facades\Auth;

use function Livewire\Volt\layout;
use function Livewire\Volt\state;
use function Livewire\Volt\title;

layout('livewire.layouts.auth');
title('Verification Notice');

state(['email' => Auth::user()->email])->locked();

$resend = function () {
    $authRequest = new AuthRequest();
    //
    $authRequest->attemptEmailVerificationResendFN();
    //
    session()->flash('status', ToastBarEnum::VERIFICATION_SUCCESS);
};

?>

<div class="flex flex-col items-center gap-6 p-4">
    <div class="flex flex-col text-center">
        <flux:heading size="xl">Email Verification</flux:heading>
        <flux:text>Kindly verify your email to access in-app pages.</flux:text>
    </div>

    <form
        class="flex flex-col gap-2"
        wire:submit="resend"
    >
        <flux:input
            class="min-w-72"
            name="email"
            label="Email"
            wire:model="email"
        />

        <flux:button
            type="submit"
            variant="primary"
        >
            Resend
        </flux:button>
    </form>
</div>
