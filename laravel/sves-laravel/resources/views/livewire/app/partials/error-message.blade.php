<?php

use function Livewire\Volt\state;

state(['message' => '']);

?>

<div class="mt-3 flex gap-2 text-sm font-medium text-red-500 dark:text-red-400">
    <flux:icon.exclamation-triangle
        class="size-5 text-red-500 dark:text-red-400"
        variant="solid"
    />
    {{ $message }}
</div>
