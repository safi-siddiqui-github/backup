<?php

use App\Http\Requests\AuthRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

use function Livewire\Volt\{computed, layout, rules, state, title};

layout('livewire.default.layout.app');
title('Livewire Profile');

$authRequest = new AuthRequest();

state([
    'user' => Auth::user(),
    'errors' => [],
]);

$socialProfileStatus = computed(function () {
    return $this->user->social_profile_status;
});

$deleteUser = function () use ($authRequest) {
    try {
        $this->errors = [];
        $this->resetErrorBag();
        //
        $authRequest->attemptSoftDeleteUserFN();
        //
        // session()->flash('status', NotifyBarEnum::REGISTER_SUCCESS);
        //
    } catch (ValidationException $e) {
        $this->errors = $e->validator->getMessageBag()->toArray();
        return;
    }

    $this->redirectRoute('livewire.home', navigate: true);
};

?>

<div class="flex flex-col gap-4 p-4">
    <img
        src="{{ $user->avatar }}"
        alt="{{ $user->name }}"
        class="object-conver h-32 w-32 rounded"
    />

    <div class="flex flex-col">
        <h2 class="text-2xl font-medium">{{ $user->name }}</h2>
        <p class="tracking-tight">{{ $user->email }}</p>
        <p class="tracking-tight">&#64;{{ $user->username }}</p>
    </div>

    <div class="flex flex-col gap-2">
        <p class="text-lg font-medium">Social Profiles</p>

        <div class="flex items-center gap-2">
            <div class="flex items-center gap-1">
                <livewire:default.svg.github />
                <p class="">Github</p>
            </div>

            <div class="flex items-center gap-1">
                @if ($this->socialProfileStatus['github'])
                    <livewire:default.svg.check />
                    <p class="">Connected</p>
                @else
                    <livewire:default.svg.important />
                    <p class="">Disconnected</p>
                @endif
            </div>
        </div>

        <div class="flex items-center gap-2">
            <div class="flex items-center gap-1">
                <livewire:default.svg.google />
                <p class="">Google</p>
            </div>

            <div class="flex items-center gap-1">
                @if ($this->socialProfileStatus['google'])
                    <livewire:default.svg.check />
                    <p class="">Connected</p>
                @else
                    <livewire:default.svg.important />
                    <p class="">Disconnected</p>
                @endif
            </div>
        </div>
    </div>

    <div class="flex flex-col items-start gap-2">
        <p class="text-lg font-medium">Delete Profile</p>

        <button
            wire:click="deleteUser"
            type="button"
            class="flex gap-1 rounded border px-2 py-1 hover:border-red-500 hover:text-red-500 hover:outline-red-500"
        >
            <livewire:default.svg.trash />
            <span class="">Delete</span>
        </button>
    </div>
</div>
