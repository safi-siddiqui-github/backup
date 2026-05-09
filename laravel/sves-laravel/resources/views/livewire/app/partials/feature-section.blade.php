<?php

use Livewire\Volt\Component;

new class extends Component {
    public $image;
    public $heading;
    public $description;
};

?>

<div class="flex flex-col items-center gap-4 sm:flex-row sm:gap-4">
    <img
        class="h-64 w-full rounded object-cover sm:w-64"
        alt="{{ $image }}"
        src="{{ $image }}"
    />

    <div class="flex flex-col items-center text-center sm:flex-1">
        <flux:heading size="xl">{{ $heading }}</flux:heading>
        <flux:text class="max-w-sm">{{ $description }}</flux:text>
    </div>
</div>
