<!DOCTYPE html>
<html
    lang="en"
    class="scroll-smooth"
>
    <head>
        <meta charset="UTF-8" />
        <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
        />
        <title>{{ $title ? "$title - EventFlow" : 'EventFlow' }}</title>
        @vite(['resources/css/app.css', 'resources/js/app.js'])
    </head>

    <body class="relative antialiased 2xl:container 2xl:mx-auto">
        {{ $slot }}

        <livewire:components.modal />
    </body>
</html>
