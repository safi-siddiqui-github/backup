<?php

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\Password;
use Livewire\Attributes\Layout;
use Livewire\Attributes\Title;
use Livewire\Volt\Component;

new #[Title('Forgot Password')] #[Layout('livewire.layout.auth')] class extends Component {
    public $email = null;

    public function submitForm()
    {
        $this->validate([
            'email' => ['required', 'string', 'email', 'exists:users,email'],
        ]);

        $this->resetValidation();

        /** @var \App\Models\User $user */
        $key = "password-email:user-$this->email";

        $attempt = RateLimiter::attempt(
            $key,
            // $perMinute = 1,
            $perTwoMinute = 1,
            function () {
                $status = Password::sendResetLink($this->only('email'));
                if ($status !== Password::ResetLinkSent) {
                    $this->addError('email', $status);
                }
            },
            $decaySeconds = 120,
        );

        $availableIn = RateLimiter::availableIn($key);

        if (! $attempt) {
            $this->addError('email', "New email will be sent in $availableIn seconds");
            return;
        }

        $this->redirectRoute('password.notice', ['email' => $this->email], absolute: true);
        $this->reset();
    }
};
?>

<form
    wire:submit="submitForm"
    class="box-auth"
>
    <div class="flex-secondary">
        <x-ui.link
            :href="route('general.home')"
            class="text-primary text-large"
        >
            Password Forgot
        </x-ui.link>

        <p class="text-secondary">Reset your password to proceed</p>
    </div>

    <div class="box-input-primary">
        <label
            for="email"
            class="label"
        >
            Enter Email
        </label>
        <input
            id="email"
            wire:model="email"
            type="text"
            class="input"
            placeholder="johndoe@gmail.com"
        />
        @error('email')
            <p class="text-error">{{ $message }}</p>
        @enderror
    </div>

    <x-ui.button
        class="button-filled-primary"
        icon="mail"
        type="submit"
    >
        Send Link
    </x-ui.button>
</form>
