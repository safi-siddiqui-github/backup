<?php

use Livewire\Volt\Component;

new class extends Component {
    //
    public $title = 'Livewire';
}; ?>

<x-layouts.app :title="$title ?? null">
    <livewire:app.partials.navbar />
    <livewire:app.partials.toast />

    <livewire:app.partials.login />
    <livewire:app.partials.register />
    <livewire:app.partials.forgot-request />

    <div class="mx-auto w-full 2xl:container">
        {{ $slot }}

        <livewire:app.partials.footer />
    </div>
</x-layouts.app>
