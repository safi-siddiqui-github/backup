<?php

use function Livewire\Volt\state;

state(['product' => '']);

?>

<a
    class="group flex flex-col gap-2"
    href="{{ route('app.product', ['slug' => $product->slug]) }}"
    wire:navigate
>
    <img
        class="h-72 w-full rounded object-cover group-hover:brightness-110 lg:h-96"
        alt="{{ $product->image->image_url }}"
        src="{{ $product->image->image_url }}"
    />

    <div
        class="flex flex-col items-center gap-2 rounded p-4 backdrop-blur-sm group-hover:bg-black/10"
    >
        <flux:text class="">
            {{ $product->category->name }}
        </flux:text>
        <flux:heading
            class="text-center"
            size="xl"
        >
            {{ $product->name }}
        </flux:heading>
        <flux:text class="text-2xl font-medium">$ {{ $product->price }}</flux:text>

        <div class="flex">
            @for ($i=0;$i< 5; $i++)
                @if ($i < $product->avgRating ?? 0)
                    <flux:icon.star variant="solid" />
                @else
                    <flux:icon.star />
                @endif
            @endfor
        </div>
    </div>
</a>
