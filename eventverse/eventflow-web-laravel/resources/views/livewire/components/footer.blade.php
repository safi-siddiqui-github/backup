<?php

use App\Models\EmailSubscription;
use Livewire\Volt\Component;

new class extends Component {
    public $email = null;

    public function submitForm()
    {
        $this->validate(
            ['email' => ['required', 'email', 'unique:email_subscriptions,email']],
            [
                'email' => [
                    'unique' => 'Email is already subscribed',
                ],
            ],
        );
        $this->resetValidation();
        $emailSubscription = new EmailSubscription();
        $emailSubscription->email = $this->email;
        $emailSubscription->save();
        $this->reset();
    }
};
?>

<div class="flex-primary border-t border-gray-200 lg:p-10">
    <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div class="flex flex-col gap-1 md:col-span-2 lg:col-span-1">
            <x-ui.link
                :href="route('general.home')"
                class="text-large text-primary"
            >
                EventFlow
            </x-ui.link>

            <p class="text-secondary w-5/6">
                We create an event website where customers can join upcoming events and get tickets or create new events.
            </p>
        </div>

        <div class="flex items-center gap-4">
            <div class="flex flex-1 flex-col gap-1">
                <p class="font-medium">Navigation</p>

                <x-ui.link :href="route('general.create-event')">Create Event</x-ui.link>
                <x-ui.link :href="route('general.discover-event')">Discover Event</x-ui.link>
                <x-ui.link :href="route('general.about')">About Us</x-ui.link>
                <x-ui.link :href="route('general.contact')">Contact Us</x-ui.link>
            </div>
            <div class="flex flex-1 flex-col gap-1">
                <p class="font-medium">Extras</p>

                <x-ui.link :href="route('general.home')">Pricing</x-ui.link>
                <x-ui.link :href="route('general.home')">Help Centre</x-ui.link>
                <x-ui.link :href="route('general.home')">Blog</x-ui.link>
                <x-ui.link :href="route('general.home')">How It Works</x-ui.link>
            </div>
        </div>

        <form
            class="flex-secondary"
            wire:submit="submitForm"
        >
            <div class="flex flex-col gap-1">
                <p class="text-medium text-primary">Subscribe to our newsletter</p>
                <p class="text-secondary">Get updates about our new exciting services</p>
            </div>

            <div class="box-input-primary">
                <input
                    type="text"
                    class="input"
                    placeholder="john@gmail.com"
                    wire:model="email"
                />

                @error('email')
                    <p class="text-error">{{ $message }}</p>
                @enderror

                <x-ui.button
                    type="submit"
                    class="button-filled-primary"
                    icon="mail"
                >
                    Subscribe
                </x-ui.button>
            </div>
        </form>
    </div>

    <x-ui.divider />

    <div class="text-center">
        <p class="text-secondary">&copy; 2025 EventFlow. All Rights Reserved.</p>
    </div>
</div>
