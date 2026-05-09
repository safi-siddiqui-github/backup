<?php

use function Livewire\Volt\{layout, state, title};

title('Livewire App');

?>

<!-- Layout - resources/views/components/livewire/layout.blade.php -->
<x-livewire.layout :title="$title ?? null">
    <!-- Header - resources/views/livewire/default/components/header.blade.php -->
    <livewire:default.components.header />

    <!-- Children / Slot -->
    {{ $slot }}

    <!-- resources/views/livewire/default/components/notification-bar.blade.php -->
    <livewire:default.components.notification-bar />
</x-livewire.layout>
