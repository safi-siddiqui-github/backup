<?php

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Livewire\Attributes\Layout;
use Livewire\Attributes\Title;
use Livewire\Volt\Component;

new #[Title('Login')] #[Layout('livewire.layout.auth')] class extends Component {
    public $email = '';
    public $password = '';
    public $remember = true;

    public function submitForm()
    {
        $this->validate([
            'email' => ['required', 'string'],
            'password' => ['required', 'string', 'min:4'],
        ]);

        if (
            Auth::attempt($this->only(['email', 'password']), $this->remember) ||
            Auth::attempt(['phone' => $this->email, 'password' => $this->password], $this->remember)
        ) {
            $this->redirectRoute('general.home', navigate: true);
            return;
        }

        $this->addError('email', 'Incorrect Credentials');
        $this->reset();
    }
};
?>

<form
    wire:submit="submitForm"
    class="box-auth"
>
    <x-ui.link
        :href="route('general.home')"
        class="text-primary text-large"
    >
        EventFlow, Sign In
    </x-ui.link>

    <div class="flex-secondary">
        <div class="box-input-primary">
            <label
                for="email"
                class="label"
            >
                Email / Phone
            </label>
            <input
                id="email"
                wire:model="email"
                type="text"
                class="input"
                placeholder="Email / Phone Number"
            />
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

            <x-ui.link
                :href="route('password.forgot')"
                class="text-primary text-right font-medium"
            >
                Forgot your pasword?
            </x-ui.link>
        </div>

        <div class="box-input-secondary">
            <input
                type="checkbox"
                id="remember"
                class="checkbox"
                wire:model="remember"
            />
            <label
                for="remember"
                class="label"
            >
                Remember me
            </label>
        </div>
    </div>

    <x-ui.button
        class="button-filled-primary"
        icon="signin"
        type="submit"
    >
        Sign In
    </x-ui.button>

    <div class="flex-secondary">
        <x-ui.social-login />

        <x-ui.link
            :href="route('register')"
            class="text-center font-medium"
        >
            <span class="text-secondary">Dont have an account?</span>
            <span class="text-primary">Sign Up</span>
        </x-ui.link>
    </div>
</form>
