<?php

use function Livewire\Volt\{state};

?>

<div class="flex flex-col gap-2">
    <div class="flex w-full flex-wrap items-center gap-2">
        <a
            href="{{ route('social.google.login') }}"
            class="flex min-w-fit flex-1 items-center justify-center gap-1.5 rounded border px-2 py-1.5 hover:outline"
        >
            <livewire:default.svg.google />
            <p class="font-medium tracking-tight">Continue with Google</p>
        </a>

        <a
            href="{{ route('social.github.login') }}"
            class="flex min-w-fit flex-1 items-center justify-center gap-1.5 rounded border px-2 py-1.5 hover:outline"
        >
            <livewire:default.svg.github />
            <p class="font-medium tracking-tight">Continue with Github</p>
        </a>
    </div>

    @error('socialAuth')
        <p
            x-transition
            class="text-red-500"
        >
            {{ $message }}
        </p>
    @enderror
</div>
