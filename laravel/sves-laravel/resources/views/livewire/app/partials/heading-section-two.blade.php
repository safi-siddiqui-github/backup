<?php

use Livewire\Volt\Component;

new class extends Component {
    public $image;
    public $heading;
    public $description;
    public $btnText;
};

?>

<div class="flex flex-col gap-4">
    <img
        class="h-96 w-full rounded object-cover"
        alt="{{ $image }}"
        src="{{ $image }}"
    />

    <flux:text class="text-3xl font-medium lg:text-5xl">
        {{ $heading }}
    </flux:text>

    <flux:text class="">{{ $description }}</flux:text>

    <div class="flex gap-2">
        <flux:button variant="filled">{{ $btnText }}</flux:button>
        <flux:button
            icon:trailing="arrow-up-right"
            variant="subtle"
        >
            Learn More
        </flux:button>
    </div>
</div>
