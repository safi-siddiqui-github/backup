<?php

use function Livewire\Volt\{state};

state(["darkMode" => session('darkMode', false)]);

$toggleDarkMode = function () {
    $this->darkMode = !$this->darkMode;
    session(['darkMode' => $this->darkMode]);
    // return redirect()->to(request()->header('Referer'));
}

?>

<div
    class="flex items-center justify-center"
    x-data="{darkMode: @js($darkMode)}"
    x-init="
        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            darkMode = true;
        }
        $watch('darkMode', value => {
            if (value) {
                // body selector
                document.querySelector('#light-dak-mode').classList.add('dark')
                // documentElement is html
                //document.documentElement.classList.add('dark');
                localStorage.setItem('theme', 'dark');
            } else {
                document.querySelector('#light-dak-mode').classList.remove('dark')
                // document.documentElement.classList.remove('dark');
                localStorage.setItem('theme', 'light');
            }
            $wire.toggleDarkMode();
            //window.location.reload();
        });
    ">
    <button @click="darkMode=!darkMode" type="button" class="flex items-center gap-1">
        @if($darkMode)
        <span>Dark</span>
        <livewire:svg.moon />
        @else
        <span>Light</span>
        <livewire:svg.sun />
        @endif
    </button>

</div>