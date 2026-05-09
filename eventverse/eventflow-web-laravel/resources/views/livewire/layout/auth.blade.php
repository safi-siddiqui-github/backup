<?php

use Livewire\Attributes\Title;
use Livewire\Volt\Component;

new #[Title('Auth')] class extends Component {
    //
}; ?>

<x-layouts.app :title="$title ?? null">
    <div class="flex min-h-screen flex-col items-center justify-center bg-gray-50 py-10">
        {{ $slot }}
    </div>
</x-layouts.app>
