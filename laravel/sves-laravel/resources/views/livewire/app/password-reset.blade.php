<?php

use App\Enums\ToastBarEnum;
use App\Http\Requests\AuthRequest;

use function Livewire\Volt\layout;
use function Livewire\Volt\rules;
use function Livewire\Volt\state;
use function Livewire\Volt\title;

layout('livewire.layouts.auth');
title('Password Reset');

state('token')->locked();
state('email')
    ->url()
    ->locked();
$authRequest = new AuthRequest();
state($authRequest->passwordResetState());
rules($authRequest->passwordResetRules());

$resend = function () use ($authRequest) {
    //
    $this->validate();
    //
    $authRequest->mergeIfMissing([
        'email' => $this->email,
        'token' => $this->token,
        'password' => $this->password,
        'password_confirmation' => $this->password_confirmation,
    ]);
    //
    $authRequest->attemptPasswordResetFN();
    //
    session()->flash('status', ToastBarEnum::PASSWORD_RESET);
    //
    $this->redirectRoute('app.home', navigate: true);
};

?>

<div class="flex flex-col items-center gap-6 p-4">
    <div class="flex flex-col text-center">
        <flux:heading size="xl">Password Reset</flux:heading>
        <flux:text>Reset your password with a strong and secure string.</flux:text>
    </div>

    <flux:separator variant="subtle" />

    <form
        class="flex flex-col gap-4"
        wire:submit="resend"
    >
        <flux:input
            class="min-w-72"
            name="email"
            disabled="true"
            label="Email"
            wire:model="email"
        />

        <flux:input
            name="password"
            description="Enter new strong password."
            label="Password"
            wire:model="password"
            type="password"
            viewable
        />

        <flux:input
            name="password_confirmation"
            description="Re-enter your password"
            label="Password Confirmation"
            wire:model="password_confirmation"
            type="password"
            viewable
        />

        <flux:separator variant="subtle" />

        <flux:button
            type="submit"
            variant="primary"
        >
            Submit
        </flux:button>
    </form>
</div>
