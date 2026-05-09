<?php

use App\Enums\ToastBarEnum;
use App\Http\Requests\AuthRequest;
use function Livewire\Volt\rules;
use function Livewire\Volt\state;

$authRequest = new AuthRequest();
state($authRequest->forgotRequestState());
rules($authRequest->forgotRequestRules());

$submitForm = function () use ($authRequest) {
    $this->validate();
    //
    $authRequest->mergeIfMissing([
        'email' => $this->email,
    ]);
    //
    $authRequest->throttlePasswordRequestFN();
    //
    session()->flash('status', ToastBarEnum::PASSWORD_REQUEST);
    //
    $this->redirectRoute('app.home', navigate: true);
};

?>

<flux:modal
    class="md:w-96"
    name="app-forgot-password"
>
    <form
        class="space-y-6"
        wire:submit="submitForm"
    >
        <div>
            <flux:heading size="lg">SVES Forgot Password</flux:heading>
            <flux:text>Request password reset using your email.</flux:text>
        </div>

        <flux:separator variant="subtle" />

        <flux:input
            name="email"
            description="Enter your email address."
            label="Email"
            wire:model="email"
        />

        <div class="flex">
            <flux:spacer />

            <flux:button
                type="submit"
                variant="primary"
            >
                Submit
            </flux:button>
        </div>
    </form>
</flux:modal>
