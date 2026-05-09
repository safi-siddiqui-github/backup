@props([
    'color' => $color ?? '',
    'class' => $class ?? '',
])

<div class="rounded-full bg-gray-200">
    @switch($color)
        @case('red')
            <div {{ $attributes->merge(['class' => "$class rounded-full bg-red-500 p-1"]) }}></div>

            @break
        @case('blue')
            <div {{ $attributes->merge(['class' => "$class rounded-full bg-blue-500 p-1"]) }}></div>

            @break
        @case('green')
            <div {{ $attributes->merge(['class' => "$class rounded-full bg-green-500 p-1"]) }}></div>

            @break
        @case('purple')
            <div {{ $attributes->merge(['class' => "$class rounded-full bg-purple-500 p-1"]) }}></div>

            @break
        @case('yellow')
            <div {{ $attributes->merge(['class' => "$class rounded-full bg-yellow-500 p-1"]) }}></div>

            @break
        @case('pink')
            <div {{ $attributes->merge(['class' => "$class rounded-full bg-pink-500 p-1"]) }}></div>

            @break
        @case('indigo')
            <div {{ $attributes->merge(['class' => "$class rounded-full bg-indigo-500 p-1"]) }}></div>

            @break
        @case('orange')
            <div {{ $attributes->merge(['class' => "$class rounded-full bg-orange-500 p-1"]) }}></div>

            @break
        @default
            No Ball Type

            @break
    @endswitch
</div>
