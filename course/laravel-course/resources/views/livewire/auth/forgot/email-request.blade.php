<?php

use App\Enums\NotifyBarEnum;
use Illuminate\Support\Facades\Password;

use function Livewire\Volt\{layout, rules, state, title};

layout('livewire.layout.auth');
title('Email Request');
state(['email' => '']);
rules(['email' => ['required', 'string', 'email', 'exists:users,email']]);

$emailRequest = function () {
    $this->validate();

    $status = Password::sendResetLink([
        'email' => $this->email
    ]);

    if ($status === Password::ResetLinkSent) {
        // ok
        session()->flash('status', NotifyBarEnum::PASSWORD_REQUEST);
        return $this->redirectRoute('home');
    }

    // return $status === Password::ResetLinkSent
    //     ? back()->with(['status' => __($status)])
    //     : back()->withErrors(['email' => __($status)]);
};

?>

<div class="flex flex-col justify-center items-center h-screen overflow-y-auto min-h-[400px]">

    <div class="flex flex-col gap-6 max-w-lg px-4 py-8 w-full">

        <livewire:util.light-dark-mode />

        <div class="flex flex-col items-center gap-2">
            <h2 class="text-4xl">
                REQUEST EMAIL
            </h2>

            <p class="">
                Password Reset Link
            </p>

        </div>

        <form
            wire:submit="emailRequest"
            class="flex flex-col gap-4 w-full">

            <div class="flex flex-col border px-2 py-1 gap-1 rounded">

                <div class="flex items-center gap-1">
                    <livewire:svg.username class="size-4" />

                    <label
                        for="email"
                        class="text-sm font-medium">
                        Email Address
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

            <button
                type="submit"
                class="border py-1 rounded-full hover:underline">
                Send Request
            </button>

        </form>

    </div>

</div>