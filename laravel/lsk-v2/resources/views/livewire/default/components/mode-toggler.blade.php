<?php

use function Livewire\Volt\{state};

state(['darkMode' => session('darkMode', false)]);

$toggleDarkMode = function () {
    session(['darkMode' => ! $this->darkMode]);
    // return redirect()->to(request()->header('Referer'));
};

?>

<div
    class="flex items-center justify-center"
    x-data="{
        darkMode: $wire.darkMode,
        init() {
            if (
                localStorage.theme === 'dark' ||
                (! ('theme' in localStorage) &&
                    window.matchMedia('(prefers-color-scheme: dark)').matches)
            ) {
                darkMode = true
            }
        },
    }"
    x-init="
        $watch('darkMode', (value) => {
            if (value) {
                // body selector
                document.querySelector('#light-dak-mode').classList.add('dark')
                // documentElement is html
                //document.documentElement.classList.add('dark');
                localStorage.setItem('theme', 'dark')
            } else {
                document.querySelector('#light-dak-mode').classList.remove('dark')
                // document.documentElement.classList.remove('dark');
                localStorage.setItem('theme', 'light')
            }
            $wire.toggleDarkMode()
            //window.location.reload();
        })
    "
>
    <button
        @click="darkMode=!darkMode"
        type="button"
        class="flex w-12 items-center gap-1 rounded-full border px-1 py-0.5"
        :class="darkMode ? 'justify-end' : 'justify-start'"
    >
        <span x-show="darkMode">
            <livewire:default.svg.moon />
        </span>
        <span x-show="!darkMode">
            <livewire:default.svg.sun />
        </span>
    </button>
</div>
