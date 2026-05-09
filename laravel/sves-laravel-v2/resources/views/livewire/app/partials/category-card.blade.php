<?php

use Livewire\Volt\Component;

new class extends Component {
    public $category;
};

?>

<div class="flex flex-col gap-2">
    <img
        class="h-72 w-full object-cover lg:h-96"
        alt="{{ $category->image->image_url }}"
        src="{{ $category->image->image_url }}"
    />

    <div class="flex w-full flex-col">
        <flux:heading class="text-xl font-medium">
            {{ $category->name }}
        </flux:heading>

        <flux:text class="text-lg font-medium">{{ $category->products_count }} Products</flux:text>
        <flux:text class="">{{ $category->description }} Products</flux:text>
    </div>
</div>
