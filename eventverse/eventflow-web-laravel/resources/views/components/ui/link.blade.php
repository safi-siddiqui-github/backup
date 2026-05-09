@props([
    'href' => $href ?? '',
])

<a
    wire:navigate
    href="{{ $href }}"
    {{ $attributes->merge(['class' => '']) }}
>
    {{ $slot }}
</a>
