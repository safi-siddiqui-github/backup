<?php

use Illuminate\Support\Facades\Date;
use Livewire\Attributes\Computed;
use Livewire\Volt\Component;

new class extends Component {
    public $footerLinks;
    public $email;

    #[Computed]
    public function currentYear()
    {
        return Date::now()->format('Y');
    }

    public function mount()
    {
        $this->footerLinks = [
            [
                'heading' => 'Solutions',
                'links' => ['Marketing', 'Analytics', 'Automation', 'Commerce', 'Insights'],
            ],
            [
                'heading' => 'Company',
                'links' => ['About Us', 'Careers', 'Blog', 'Press', 'Contact'],
            ],
            [
                'heading' => 'Support',
                'links' => [
                    'Help Center',
                    'FAQs',
                    'Order Tracking',
                    'Shipping Info',
                    'Return Policy',
                ],
            ],
            [
                'heading' => 'Categories',
                'links' => [
                    'Men\'s Fashion',
                    'Women\'s Fashion',
                    'Home Decor',
                    'Electronics',
                    'Accessories',
                ],
            ],
            [
                'heading' => 'Account',
                'links' => ['Sign In', 'Register', 'Wishlist', 'Orders', 'Settings'],
            ],
            [
                'heading' => 'Social',
                'links' => ['Instagram', 'Facebook', 'Twitter', 'LinkedIn', 'YouTube'],
            ],
        ];
    }

    public function subNews()
    {
        $this->validate([
            'email' => 'required|email',
        ]);
    }
};
?>

<div class="flex w-full flex-col gap-8 px-4 py-10 sm:px-8 sm:py-16">
    <flux:separator variant="subtle" />

    <div class="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
        @foreach ($footerLinks as $each)
            <div
                class="flex flex-col items-center gap-2 text-center lg:gap-4"
                key="{{ $each['heading'] }}"
            >
                <a
                    href="#"
                    wire:navigate
                >
                    <flux:heading size="lg">{{ $each['heading'] }}</flux:heading>
                </a>
                <div class="flex flex-col gap-2">
                    @foreach ($each['links'] as $eachLink)
                        <a
                            href="#"
                            key="{{ $eachLink }}"
                            wire:navigate
                        >
                            <flux:text>{{ $eachLink }}</flux:text>
                        </a>
                    @endforeach
                </div>
            </div>
        @endforeach
    </div>

    <flux:separator variant="subtle" />

    <form
        class="flex max-w-md flex-col gap-2"
        wire:submit="subNews"
    >
        <flux:heading size="lg">Subscribe to our newsletter</flux:heading>
        <flux:text class="mb-2">
            The latest news, articles, and resources, sent to your inbox weekly.
        </flux:text>

        <flux:input
            name="email"
            label="Email"
            wire:model="email"
            placeholder="Enter your email"
        />

        <flux:button
            class="sm:w-fit"
            type="submit"
            variant="primary"
        >
            Subscribe
        </flux:button>
    </form>

    <flux:separator variant="subtle" />

    <div class="flex flex-col gap-2 sm:flex-row-reverse sm:items-center">
        <div class="flex gap-4">
            <flux:icon.facebook />
            <flux:icon.github />
            <flux:icon.instagram />
            <flux:icon.youtube />
            <flux:icon.twitter />
        </div>

        <flux:spacer />

        <div class="flex items-center gap-1">
            <flux:icon.copyright />
            <flux:text>
                {{ $this->currentYear }}
                SVES Ecommerce, Inc. All rights reserved.
            </flux:text>
        </div>
    </div>
</div>
