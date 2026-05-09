<?php

use Livewire\Volt\Component;

new class extends Component {
    //
    public $title = 'Livewire';
}; ?>

<x-layouts.app :title="$title ?? null">
    <div class="flex h-screen min-h-fit flex-col items-center justify-center">
        {{ $slot }}
    </div>
</x-layouts.app>
