<?php

use Livewire\Volt\Component;

new class extends Component {
    //
    public $title = 'Livewire';
}; ?>

<x-layouts.app :title="$title ?? null">

    <livewire:app.partials.navbar />
    <livewire:app.partials.login />
    <livewire:app.partials.toast />

    {{ $slot }}
</x-layouts.app>