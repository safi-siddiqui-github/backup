<?php

use Livewire\Attributes\Title;
use Livewire\Volt\Component;

new #[Title('App')] class extends Component {
    //
};
?>

<x-layouts.app :title="$title ?? null">
    <livewire:components.header />

    <div class="bg-gray-50">
        {{ $slot }}
    </div>

    <livewire:components.footer />
</x-layouts.app>
