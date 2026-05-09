<?php

use App\Models\ContactHelp;
use Illuminate\Support\Facades\Auth;
use Livewire\Attributes\Layout;
use Livewire\Attributes\Title;
use Livewire\Volt\Component;

new #[Title('Contact')] #[Layout('livewire.layout.app')] class extends Component {
    public $firstname = null;
    public $lastname = null;
    public $email = null;
    public $description = null;

    public function submitForm()
    {
        $this->validate([
            'firstname' => ['required', 'string', 'max:100'],
            'lastname' => ['required', 'string', 'max:100'],
            'email' => ['required', 'string', 'email'],
            'description' => ['required', 'string', 'max:1000'],
        ]);
        $this->resetValidation();
        $contactHelp = new ContactHelp();
        $contactHelp->firstname = $this->firstname;
        $contactHelp->lastname = $this->lastname;
        $contactHelp->email = $this->email;
        $contactHelp->description = $this->description;
        $contactHelp->save();
        $this->reset();
    }
};
?>

<div class="flex-secondary">
    <x-ui.landing-card-one :image="asset('images/contact.jpg')">
        <p class="text-extra-large">Contact Information</p>
        <p class="w-5/6 max-w-xl tracking-tight">
            Have questions about our platform? Need technical support? Want to request a custom feature or partnership? Just reach out—we'd love to
            hear from you..
        </p>
    </x-ui.landing-card-one>

    <div class="flex-primary lg:flex-row">
        <div class="flex-secondary max-w-md">
            <div class="flex flex-col gap-1">
                <p class="text-large">Contact Us</p>
                <p class="text-secondary w-5/6 tracking-tight">
                    Email, call or complete the form to learn how EventFlow can solve your messaging problem.
                </p>
            </div>

            <div class="flex flex-col gap-2">
                <a
                    href="mailto:connect@eventflow.com"
                    class="button-filled-primary"
                >
                    <livewire:svg.mail-outlined />
                    connect@eventflow.com
                </a>

                <button class="button-outlined-primary">
                    <livewire:svg.chat />
                    +995 574 04 33 08
                </button>
            </div>
        </div>

        <form
            class="box-shadow lg:flex-1"
            wire:submit="submitForm"
        >
            <div class="flex flex-col gap-1">
                <p class="text-large">Get In Touch</p>
                <p class="text-secondary tracking-tight">
                    You can reach
                    <span class="heading-four text-primary">EventFlow</span>
                    anytime.
                </p>
            </div>

            <div class="grid grid-cols-1 gap-4">
                <div class="box-input-primary">
                    <label
                        for="firstname"
                        class="label"
                    >
                        Firstname
                    </label>
                    <input
                        id="firstname"
                        wire:model="firstname"
                        type="text"
                        class="input"
                        placeholder="John"
                    />
                    @error('firstname')
                        <p class="text-error">{{ $message }}</p>
                    @enderror
                </div>
                <div class="box-input-primary">
                    <label
                        for="lastname"
                        class="label"
                    >
                        Lastname
                    </label>
                    <input
                        id="lastname"
                        wire:model="lastname"
                        type="text"
                        class="input"
                        placeholder="Doe"
                    />
                    @error('lastname')
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
                        for="description"
                        class="label"
                    >
                        How Can We Help ?
                    </label>

                    <textarea
                        wire:model="description"
                        type="text"
                        class="input h-44 overflow-hidden rounded-lg"
                        placeholder="My message to EventFlow team is ..."
                    ></textarea>

                    @error('description')
                        <p class="text-error">{{ $message }}</p>
                    @enderror
                </div>
            </div>

            <x-ui.button
                class="button-filled-primary"
                icon="signin"
                type="submit"
            >
                Sign Up
            </x-ui.button>

            <p class="text-secondary w-5/6 self-center text-center tracking-tight">
                By contacting us, you agree to our Terms of Service and Privacy Policy
            </p>
        </form>
    </div>
</div>
