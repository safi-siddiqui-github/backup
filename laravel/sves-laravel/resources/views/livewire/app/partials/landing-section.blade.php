<?php

use Livewire\Volt\Component;

new class extends Component {
    public $image;
    public $heading;
    public $description;
    public $btnText;
};

?>

<div class="relative flex flex-col overflow-hidden">
    <video
        class="absolute top-0 left-0 h-full w-full object-cover"
        autoplay
        loop
        muted
        playsinline
    >
        <source
            src="{{ $image }}"
            type="video/mp4"
        />
        Your browser does not support the video tag.
    </video>

    <div
        class="flex h-screen w-full flex-col items-center justify-center gap-4 text-center backdrop-blur-[1px]"
    >
        <flux:text class="text-3xl font-medium text-white lg:text-5xl">
            {{ $heading }}
        </flux:text>

        <flux:text class="max-w-sm text-white/70 lg:line-clamp-none lg:max-w-xl">
            {{$description}}
        </flux:text>

        <flux:button
            class="mt-4"
            variant="primary"
        >
            {{ $btnText }}
        </flux:button>
    </div>
</div>
