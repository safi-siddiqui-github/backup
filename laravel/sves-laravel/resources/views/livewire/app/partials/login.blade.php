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
            <flux:heading size="lg">SVES Login</flux:heading>
            <flux:text>Continue to you account.</flux:text>
        </div>

        <flux:button
            class="w-full"
            icon="arrow-right-start-on-rectangle"
            variant="subtle"
            
            x-on:click="
                () => {
                    $flux.modals().close()
                    $flux.modal('app-register').show()
                }
            "
        >
            Create new account?
            <flux:text variant="strong">Sign Up</flux:text>
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
            wire:model="password"
            type="password"
            viewable
        />

        <flux:checkbox
            name="remember"
            checked
            label="Remember Me"
            wire:model="remember"
        />

        <flux:separator variant="subtle" />

        <div class="flex">
            <flux:button
                type="button"
                variant="ghost"
                x-on:click="
                    () => {
                        $flux.modals().close()
                        $flux.modal('app-forgot-password').show()
                    }
                "
            >
                <span class="text-sm">Forgot Password</span>
            </flux:button>

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
