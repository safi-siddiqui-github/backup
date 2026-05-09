<?php

use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Support\Facades\Auth;
use Livewire\Attributes\Layout;
use Livewire\Attributes\Title;
use Livewire\Volt\Component;

new #[Title('Register')] #[Layout('livewire.layout.auth')] class extends Component {
    public $name = '';
    public $email = '';
    public $phone = '';
    public $password = '';
    public $terms = true;
    public $password_confirmation = '';

    public function submitForm()
    {
        $this->validate([
            'name' => ['required', 'string'],
            'phone' => ['required', 'string'],
            'email' => ['required', 'email', 'unique:users,email'],
            'password' => ['required', 'string', 'min:4', 'confirmed'],
            'password_confirmation' => ['required', 'string', 'min:4'],
            'terms' => ['required', 'boolean', 'accepted'],
        ]);

        $user = new User();
        $user->name = $this->name;
        $user->email = $this->email;
        $user->password = $this->password;
        $user->phone = $this->phone;
        $user->save();

        // Login user
        Auth::login($user, $remember = false);

        // Verifiaction Email
        event(new Registered($user));

        // Verifiaction Notice Requires Auth
        session()->regenerate();

        $this->redirectRoute('verification.notice', navigate: true);
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
        EventFlow, Sign Up
    </x-ui.link>

    <div class="flex-secondary">
        <div class="box-input-primary">
            <label
                for="name"
                class="label"
            >
                Enter Name
            </label>
            <input
                id="name"
                wire:model="name"
                type="text"
                class="input"
                placeholder="Jone"
            />
            @error('name')
                <p class="text-error">{{ $message }}</p>
            @enderror
        </div>

        <div class="box-input-primary">
            <label
                for="email"
                class="label"
            >
                Email
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

        <div class="box-input-primary">
            <label
                for="phone"
                class="label"
            >
                Phone Number
            </label>
            <input
                id="phone"
                wire:model="phone"
                type="text"
                class="input"
                placeholder="+999 777 555"
            />
            @error('phone')
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
                type="password"
                class="input"
                placeholder="**********"
            />
            @error('password_confirmation')
                <p class="text-error">{{ $message }}</p>
            @enderror
        </div>

        <div class="box-input-secondary">
            <input
                type="checkbox"
                id="terms"
                class="checkbox"
                wire:model="terms"
            />
            <label
                for="terms"
                class="label"
            >
                Accept Terms & Condition
            </label>
        </div>
    </div>

    <x-ui.button
        class="button-filled-primary"
        icon="signin"
        type="submit"
    >
        Sign Up
    </x-ui.button>

    <div class="flex-secondary">
        <x-ui.social-login />

        <x-ui.link
            :href="route('login')"
            class="text-center font-medium"
        >
            <span class="text-secondary">Already have an account?</span>
            <span class="text-primary">Sign In</span>
        </x-ui.link>
    </div>
</form>
