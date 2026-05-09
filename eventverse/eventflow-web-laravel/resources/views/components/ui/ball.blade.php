@props([
    'color' => $color ?? '',
    'class' => $class ?? '',
])

@switch($color)
    @case('red')
        <span {{ $attributes->merge(['class' => "$class h-5 w-5 rounded-full bg-red-500"]) }}></span>

        @break
    @case('blue')
        <span {{ $attributes->merge(['class' => "$class h-5 w-5 rounded-full bg-blue-500"]) }}></span>

        @break
    @case('green')
        <span {{ $attributes->merge(['class' => "$class h-5 w-5 rounded-full bg-green-500"]) }}></span>

        @break
    @case('purple')
        <span {{ $attributes->merge(['class' => "$class h-5 w-5 rounded-full bg-purple-500"]) }}></span>

        @break
    @case('yellow')
        <span {{ $attributes->merge(['class' => "$class h-5 w-5 rounded-full bg-yellow-500"]) }}></span>

        @break
    @case('pink')
        <span {{ $attributes->merge(['class' => "$class h-5 w-5 rounded-full bg-pink-500"]) }}></span>

        @break
    @case('indigo')
        <span {{ $attributes->merge(['class' => "$class h-5 w-5 rounded-full bg-indigo-500"]) }}></span>

        @break
    @case('orange')
        <span {{ $attributes->merge(['class' => "$class h-5 w-5 rounded-full bg-orange-500"]) }}></span>

        @break
    @default
        No Ball Type

        @break
@endswitch
