<?php

use App\Enums\NotifyBarEnum;
use App\Http\Controllers\RateLimiterController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Validation\ValidationException;

use function Livewire\Volt\{computed, layout, state, title};

layout('livewire.layout.auth');
title('Email Verification Notice');

$resendLink = function () {

    $id = Auth::id();
    $key = "resend-link:user-$id";

    $attempt = RateLimiter::attempt(
        $key,
        $perMinute = 1,
        function () {
            request()->user()->sendEmailVerificationNotification();
        }
    );

    $availableIn = RateLimiter::availableIn($key);

    if (!$attempt) {
        throw ValidationException::withMessages([
            'throttle' => "New email will be sent in $availableIn seconds",
        ]);
    }

    // Verifiaction Link Sent
    throw ValidationException::withMessages([
        'throttle' => "Email has already been sent.",
    ]);
}

?>

<div class="flex flex-col justify-center items-center h-screen overflow-y-auto min-h-[300px]">

    <div class="flex flex-col gap-6 max-w-lg px-4 py-8 w-full">

        <livewire:util.light-dark-mode />

        <div class="flex flex-col items-center gap-2">
            <h2 class="text-4xl text-center">
                EMAIL VERIFICATION
            </h2>

            <p class="">
                Verify your email with link
            </p>

            @error('throttle')
            <span
                wire:transition
                class="">
                {{$message}}
            </span>
            @enderror
        </div>

        <button
            type="submit"
            wire:click="resendLink"
            class="border py-1 rounded-full hover:underline">
            Resend Link
        </button>
    </div>

</div>