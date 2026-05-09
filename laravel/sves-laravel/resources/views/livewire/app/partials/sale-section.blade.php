<?php

use Livewire\Volt\Component;

new class extends Component {
    public $image;
    public $heading;
    public $description;
    public $btnText;
};

?>

<div class="relative flex flex-col">
    <img
        class="absolute top-0 left-0 h-full w-full rounded object-cover"
        alt="{{ $image }}"
        src="{{ $image }}"
    />
    <div
        class="z-10 flex flex-col items-center gap-4 bg-gradient-to-b from-white/90 from-30% to-black/20 px-4 pt-10 pb-36 text-center lg:pt-20 dark:from-black"
    >
        <flux:heading>
            <span class="text-3xl lg:text-5xl">{{ $heading }}</span>
        </flux:heading>
        <flux:text
            class="max-w-sm font-medium tracking-tight text-black/70 lg:max-w-xl lg:text-xl dark:text-white/70"
        >
            {{ $description }}
        </flux:text>
        <flux:button
            class="mt-4"
            variant="primary"
        >
            {{ $btnText }}
        </flux:button>
    </div>
</div>
