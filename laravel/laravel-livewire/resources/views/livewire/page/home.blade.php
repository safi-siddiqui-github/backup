<?php

use function Livewire\Volt\{layout, title};

layout('livewire.layout.app');
title('Laravel Home');

?>

<div class="flex flex-col items-start p-4">

    <a href="{{route('todo.app')}}" class="flex gap-1 border px-2 py-1 rounded">
        <livewire:svg.check />
        <p class="">Todo App</p>
    </a>

</div>