<?php

use App\Enums\ToastBarEnum;
use App\Http\Requests\AuthRequest;
use function Livewire\Volt\rules;
use function Livewire\Volt\state;

$authRequest = new AuthRequest();
state($authRequest->loginState());
rules($authRequest->loginRules());

$submitForm = function () use ($authRequest) {
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
    session()->flash('status', ToastBarEnum::LOGIN_SUCCESS);
    //

    $this->redirectIntended(route('app.home'), navigate: true);
};

?>

<flux:modal
    class="md:w-96"
    name="app-login"
>
    <form
        class="space-y-6"
        wire:submit="submitForm"
    >
        <div>
            <flux:heading size="lg">Admin Login</flux:heading>
            <flux:text variant="subtle">Only admins are allowed to login</flux:text>
        </div>

        <flux:separator />

        <flux:input
            name="email"
            description="Enter your email address."
            label="Email"
            wire:model="email"
            placeholder="safisiddiqui.work@gmail.com"
        />

        <flux:input
            name="password"
            description="Enter your profile password."
            label="Password"
            wire:model="password"
            wire:model="password"
            placeholder="safisiddiqui.work"
            type="password"
            viewable
        />

        <flux:separator />

        <flux:checkbox
            name="remember"
            checked
            description="Save my credentials for max time"
            label="Remember Me"
            wire:model="remember"
        />

        <div class="flex">
            <flux:spacer />
            <flux:button
                type="submit"
                variant="primary"
            >
                Login
            </flux:button>
        </div>
    </form>
</flux:modal>
