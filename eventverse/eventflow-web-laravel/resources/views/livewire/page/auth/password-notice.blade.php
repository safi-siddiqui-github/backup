<?php

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\Password;
use Livewire\Attributes\Layout;
use Livewire\Attributes\Title;
use Livewire\Volt\Component;

new #[Title('Forgot Password Notice')] #[Layout('livewire.layout.auth')] class extends Component {
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
        }

        $this->addError('email', 'Email Already Sent');
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

        <p class="text-secondary">Check your email to proceed</p>
    </div>

    <div class="flex-secondary text-secondary">
        <div class="box-input-secondary">
            <x-ui.icon icon="mail" />
            <p class="">Email: {{ $email }}</p>
        </div>
        <p class="">
            We've sent a link to reset your password to your email address. Please check your inbox and follow the instructions to create a new
            password.
        </p>

        @error('email')
            <p class="text-error">{{ $message }}</p>
        @enderror
    </div>

    <x-ui.button
        class="button-filled-primary"
        icon="mail"
        type="submit"
    >
        Resend Link
    </x-ui.button>
</form>
