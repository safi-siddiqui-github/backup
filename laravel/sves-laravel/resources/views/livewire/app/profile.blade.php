<?php

use App\Enums\ToastBarEnum;
use App\Http\Requests\AuthRequest;
use Illuminate\Support\Facades\Auth;

use function Livewire\Volt\computed;
use function Livewire\Volt\layout;
use function Livewire\Volt\rules;
use function Livewire\Volt\state;
use function Livewire\Volt\title;
use function Livewire\Volt\usesFileUploads;

layout('livewire.layouts.app');
title('Profile - SVES');
usesFileUploads();

/** @var \App\Models\User $user */
$user = Auth::user();
$user = $user->load('image');

$url = computed(function () use ($user) {
    return $user->image->image_url;
});

state([
    'user' => $user,
    'email' => $user->email,
    'username' => $user->username,
])->locked();

state([
    'name' => $user->name,
    'password' => '',
    'image' => '',
]);

$authRequest = new AuthRequest();
rules($authRequest->userUpdateRules());

$submitForm = function () use ($authRequest) {
    $this->validate();
    //
    $authRequest->mergeIfMissing([
        'username' => $this->user->username,
        'email' => $this->user->email,
        'name' => $this->name,
        'image' => $this->image,
        'password' => $this->password,
    ]);
    //
    $authRequest->attemptUserUpdateFN();
    //
    session()->flash('status', ToastBarEnum::PROFILE_UPDATED);
    //
    $this->redirectRoute('app.profile', navigate: true);
};

?>

<div class="flex flex-col gap-6 p-4 md:p-10">
    <div class="flex flex-col gap-2">
        <flux:heading size="xl">My Profile</flux:heading>
        <flux:separator />

        @if ($this->url)
            <img
                class="h-20 w-20 rounded-full"
                alt="{{ $this->url }}"
                src="{{ $this->url }}"
            />
        @elseif ($user->avatar)
            <img
                class="h-20 w-20 rounded-full"
                alt="{{ $user->avatar }}"
                src="{{ $user->avatar }}"
            />
        @else
            <flux:icon.user-circle class="size-28" />
        @endif

        <flux:heading size="lg">{{ $user->name }}</flux:heading>
        <flux:text>{{ $user->email }}</flux:text>
        <flux:text>{{ $user->username }}</flux:text>
    </div>

    <flux:modal.trigger name="edit-profile">
        <flux:button class="w-fit">Edit profile</flux:button>
    </flux:modal.trigger>

    <flux:modal
        class="md:w-96"
        name="edit-profile"
    >
        <form
            class="space-y-6"
            wire:submit="submitForm"
        >
            <div>
                <flux:heading size="lg">Update profile</flux:heading>
                <flux:text class="mt-2">Make changes to your personal details.</flux:text>
            </div>

            <flux:input
                label="Name"
                wire:model="name"
                placeholder="Safi Siddiqui"
            />

            <flux:input
                name="password"
                label="Password"
                wire:model="password"
                type="password"
                viewable
            />

            @error('email')
                <livewire:app.partials.error-message :message="$message" />
            @enderror

            @error('username')
                <livewire:app.partials.error-message :message="$message" />
            @enderror

            <flux:input
                label="Image"
                wire:model="image"
                type="file"
            />

            <div class="flex">
                <flux:spacer />
                <flux:button
                    type="submit"
                    variant="primary"
                >
                    Save changes
                </flux:button>
            </div>
        </form>
    </flux:modal>
</div>
