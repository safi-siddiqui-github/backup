<?php

use function Livewire\Volt\{state};

//

?>


<div class="flex flex-wrap w-full items-center gap-2">

    <a
        href="{{route('auth.google.login')}}"
        class="flex gap-1 items-center border px-2 py-1 rounded-full flex-1 justify-center min-w-fit">
        <livewire:svg.google />
        <p class="">Continue with Google</p>
    </a>

    <a
        href="{{route('auth.github.login')}}"
        class="flex gap-1 items-center border px-2 py-1 rounded-full flex-1 justify-center min-w-fit">
        <livewire:svg.github />
        <p class="">Continue with Github</p>
    </a>

</div>