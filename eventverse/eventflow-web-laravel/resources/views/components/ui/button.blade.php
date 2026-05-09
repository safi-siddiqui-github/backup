@props([
    'icon' => $icon ?? '',
])

<button {{ $attributes->merge(['class' => '', 'type' => 'button']) }}>
    <span wire:loading>
        <x-ui.icon icon="loader" />
    </span>
    <span wire:loading.remove>
        <x-ui.icon :icon="$icon" />
    </span>
    {{ $slot }}
</button>
