<?php

use App\Models\TodoTask;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Date;

use function Livewire\Volt\{computed, layout, mount, rules, state, title};

layout('livewire.layout.app');
title('Todo App');

$user = computed(function () {
    return Auth::user();
});

$date = computed(function () {
    return now()->format('l jS \of F Y');
});

$todoTasks = computed(function () {
    return Auth::user()->todoTasks;
});

state([
    'name' => '',
    'description' => '',
]);

rules([
    'name' => ["required", "string", 'min:4', 'max:100'],
    'description' => ["string", 'max:500'],
])->attributes([
    'name' => 'task',
]);

$saveTask = function () {
    $this->validate();

    $todoTask = new TodoTask();
    $todoTask->user_id = $this->user->id;
    $todoTask->name = $this->name;
    $todoTask->description = $this->description;
    $todoTask->save();
};

$formatDate = computed(function ($date = "") {
    return Date::create($date)->format('h:i a');
});

?>

<div class="flex flex-col p-4 gap-6">

    <div class="flex flex-col">
        <h3 class="normal-heading">Welcome, {{$this->user->name}}</h3>
        <p class="normal-text">Its {{$this->date}}, Good day to organize your work</p>
    </div>

    <form wire:submit="saveTask" class="flex flex-col gap-2">

        <div class="flex flex-col gap-1">
            <label for="name" class="normal-label">New Task</label>
            <input type="text" id="name" wire:model="name" class="outlined-input" placeholder="Work on ... tasks" autocomplete="TRUE" />
            @error('name') <span class="text-red-500">{{ $message }}</span> @enderror
        </div>

        <div class="flex flex-col gap-1">
            <label for="description" class="normal-label">Description</label>
            <textarea id="description" wire:model="description" class="outlined-textarea" placeholder="Step 1: ... in order to complete" autocomplete="TRUE" rows="4"></textarea>
            @error('description') <span class="text-red-500">{{ $message }}</span> @enderror
        </div>

        <button class="filled-btn">Save Task</button>

    </form>

    <div class="flex flex-col gap-2">
        <h4 class="normal-subheading">Latest Tasks !</h4>

        @foreach($this->todoTasks as $todoTask)
        <div class="shadowed-div flex flex-col gap-1">

            <div class="flex justify-between border-b border-dashed ">
                <p class="">{{$todoTask->name}}</p>
                <p class="text-green-500">#project</p>
            </div>

            <p class=" text-sm">/* {{$todoTask->description}}</p>

            <p class="">{{$this->formatDate($todoTask->created_at)}}</p>

            <div class="flex justify-between items border-t border-dashed pt-1">

                <div class="flex items-center gap-2">
                    <button type="button" title="complete" class="border border-green-500 cursor-pointer rounded text-sm px-1 py-1">
                        <livewire:svg.check class="size-6 text-green-500" />
                    </button>
                    <button type="button" title="important" class="border border-blue-500 cursor-pointer rounded text-sm px-1 py-1">
                        <livewire:svg.important class="size-6 text-blue-500" />
                    </button>
                </div>

                <button type="button" title="delete" class="border border-red-500 cursor-pointer rounded text-sm px-1 py-1">
                    <livewire:svg.trash class="size-6 text-red-500" />
                </button>
            </div>

        </div>
        @endforeach


    </div>

</div>