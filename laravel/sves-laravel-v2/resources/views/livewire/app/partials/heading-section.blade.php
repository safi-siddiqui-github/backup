<?php

use Livewire\Volt\Component;

new class extends Component {
    public $heading;
    public $description;
    public $btnText;
};

?>

<div class="flex max-w-lg flex-col gap-4 lg:max-w-2xl">
    <flux:text class="text-3xl font-medium lg:text-5xl">
        {{ $heading }}
    </flux:text>

    <flux:text class="mb-4">{{ $description }}</flux:text>

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
