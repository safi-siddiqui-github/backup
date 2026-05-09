<?php

use App\Models\User;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;
use Livewire\Attributes\Layout;
use Livewire\Attributes\Locked;
use Livewire\Attributes\Title;
use Livewire\Attributes\Url;
use Livewire\Volt\Component;

new #[Title('Password Reset')] #[Layout('livewire.layout.auth')] class extends Component {
    #[Url, Locked]
    public $email = '';
    #[Locked]
    public $token = '';

    public $password = '';
    public $password_confirmation = '';

    public function submitForm()
    {
        $this->validate([
            'token' => ['required', 'string'],
            'email' => ['required', 'string', 'email', 'exists:users,email'],
            'password' => ['required', 'string', 'min:4', 'confirmed'],
            'password_confirmation' => ['required', 'string', 'min:4'],
        ]);

        $this->resetValidation();

        $status = Password::reset($this->only('email', 'password', 'password_confirmation', 'token'), function (User $user, string $password) {
            $user
                ->forceFill([
                    'password' => Hash::make($password),
                ])
                ->setRememberToken(Str::random(60));

            $user->save();

            event(new PasswordReset($user));
        });

        if ($status !== Password::PasswordReset) {
            $this->addError('email', $status);
            return;
        }

        $this->redirectRoute('login', absolute: true);
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
            :href="route('home')"
            class="text-primary text-large"
        >
            Password Forgot
        </x-ui.link>

        <p class="text-secondary">Enter new password to proceed</p>
    </div>

    <div class="flex-secondary">
        <div class="box-input-primary text-secondary">
            <div class="box-input-secondary">
                <x-ui.icon icon="mail" />
                <p class="">Email: {{ $email }}</p>
            </div>

            @error('email')
                <p class="text-error">{{ $message }}</p>
            @enderror
        </div>

        <div class="box-input-primary">
            <label
                for="password"
                class="label"
            >
                Enter Password
            </label>
            <input
                id="password"
                wire:model="password"
                type="password"
                class="input"
                placeholder="**********"
            />
            @error('password')
                <p class="text-error">{{ $message }}</p>
            @enderror
        </div>

        <div class="box-input-primary">
            <label
                for="password_confirmation"
                class="label"
            >
                Password Confirmation
            </label>
            <input
                id="password_confirmation"
                wire:model="password_confirmation"
                type="password_confirmation"
                class="input"
                placeholder="**********"
            />
            @error('password_confirmation')
                <p class="text-error">{{ $message }}</p>
            @enderror
        </div>
    </div>

    <x-ui.button
        class="button-filled-primary"
        icon="signin"
        type="submit"
    >
        Update Password
    </x-ui.button>
</form>
