<?php

use App\Enums\ToastBarEnum;
use App\Http\Requests\AuthRequest;
use function Livewire\Volt\rules;
use function Livewire\Volt\state;

$authRequest = new AuthRequest();
state($authRequest->registerState());
rules($authRequest->registerRules());

$submitForm = function () use ($authRequest) {
    $this->validate();
    //
    $authRequest->mergeIfMissing([
        'email' => $this->email,
        'password' => $this->password,
        'password_confirmation' => $this->password_confirmation,
    ]);
    //
    $authRequest->attemptRegisterFN();
    //
    session()->flash('status', ToastBarEnum::REGISTER_SUCCESS);
    //
    $this->redirectRoute('verification.notice', navigate: true);
};
?>

<flux:modal
    class="md:w-96"
    name="app-register"
>
    <form
        class="space-y-6"
        wire:submit="submitForm"
    >
        <div>
            <flux:heading size="lg">SVES Register</flux:heading>
            <flux:text>Create your new account.</flux:text>
        </div>

        <flux:button
            class="w-full"
            icon="arrow-right-start-on-rectangle"
            variant="subtle"
            x-on:click="
                () => {
                    $flux.modals().close()
                    $flux.modal('app-login').show()
                }
            "
        >
            Already a member?
            <flux:text variant="strong">Sign In</flux:text>
        </flux:button>

        <livewire:app.partials.social-login />

        <flux:separator variant="subtle" />

        <flux:input
            name="email"
            label="Email"
            wire:model="email"
        />

        <flux:input
            name="password"
            label="Password"
            wire:model="password"
            type="password"
            viewable
        />

        <flux:input
            name="password_confirmation"
            label="Password Confirmation"
            wire:model="password_confirmation"
            type="password"
            viewable
        />

        <flux:separator variant="subtle" />

        <div class="flex">
            <flux:spacer />
            <flux:button
                type="submit"
                variant="primary"
            >
                Register
            </flux:button>
        </div>
    </form>
</flux:modal>
