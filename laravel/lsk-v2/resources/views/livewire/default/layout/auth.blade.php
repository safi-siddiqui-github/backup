<?php

use function Livewire\Volt\{layout, state, title};

title('Livewire Auth');

?>

<!-- Layout - resources/views/components/livewire/layout.blade.php -->
<x-livewire.layout :title="$title ?? null">
    <!--  -->
    <!-- Auth Header -->
    <div class="flex h-screen min-h-fit items-center justify-center overflow-y-auto">
        <div
            class="flex w-full flex-col divide-y-1 divide-slate-300 overflow-hidden sm:max-w-lg sm:rounded-lg sm:border sm:border-slate-300 sm:shadow"
        >
            <div class="flex flex-wrap">
                <a
                    wire:navigate
                    href="{{ route('livewire.login') }}"
                    class="flex flex-1 items-center justify-center gap-1 bg-black text-white dark:bg-white dark:text-black"
                >
                    <livewire:default.svg.laravel class="size-7" />
                    <p class="text-lg">Livewire</p>
                </a>
                <a
                    href="{{ route('react.login') }}"
                    class="flex flex-1 items-center justify-center gap-1 p-2"
                >
                    <livewire:default.svg.react class="size-7" />
                    <p class="text-lg">React</p>
                </a>

                <a
                    href="{{ route('vue.login') }}"
                    class="flex flex-1 items-center justify-center gap-1 p-2"
                >
                    <livewire:default.svg.vue class="size-7" />
                    <p class="text-lg">Vue</p>
                </a>
            </div>

            <!-- Children / Slot -->
            {{ $slot }}
        </div>
    </div>

    <!-- resources/views/livewire/default/components/notification-bar.blade.php -->
    <livewire:default.components.notification-bar />
</x-livewire.layout>
