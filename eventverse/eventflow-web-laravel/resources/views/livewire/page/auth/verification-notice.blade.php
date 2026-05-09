<?php

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\RateLimiter;
use Livewire\Attributes\Layout;
use Livewire\Attributes\Title;
use Livewire\Volt\Component;

new #[Title('Verification Notice')] #[Layout('livewire.layout.auth')] class extends Component {
    public $email = null;

    public function mount()
    {
        $this->email = Auth::user()->email;
    }

    public function submitForm()
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();
        $id = $user->id;
        $key = "resend-link:user-$id";

        $attempt = RateLimiter::attempt(
            $key,
            // $perMinute = 1,
            $perTwoMinute = 1,
            function () use ($user) {
                $user->sendEmailVerificationNotification();
            },
            $decaySeconds = 120,
        );

        $availableIn = RateLimiter::availableIn($key);

        $this->resetValidation();

        if (! $attempt) {
            $this->addError('email', "New email will be sent in $availableIn seconds");
            return;
        }

        // Verifiaction Link Sent
        $this->addError('email', 'Email has already been sent.');
    }
};
?>

<form
    wire:submit="submitForm"
    class="box-auth"
>
    <div class="flex-secondary">
        <p class="text-primary text-large">Verification Notice</p>
        <p class="text-secondary">Check your email to proceed</p>
    </div>

    <div class="flex-secondary text-secondary">
        <div class="box-input-secondary">
            <x-ui.icon icon="mail" />
            <p class="">Email: {{ $email }}</p>
        </div>
        <p class="">We've sent a link to your email address. Please check your inbox and follow the instructions to verify yourself.</p>

        @error('email')
            <p class="text-error">{{ $message }}</p>
        @enderror
    </div>

    <div class="flex flex-col gap-2">
        <x-ui.button
            class="button-filled-primary"
            icon="mail"
            type="submit"
        >
            Resend Link
        </x-ui.button>
        <button
            class="button-filled-secondary"
            @click="$dispatch('modal-event', {type: 'sign-out'})"
        >
            <x-ui.icon icon="signout" />
            Sign Out
        </button>
    </div>
</form>
