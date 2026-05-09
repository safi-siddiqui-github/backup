<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Laravel</title>
    @vite(['resources/css/app.css'])
</head>

<body
    id="light-dak-mode"
    class="antialiased dark:bg-slate-800 text-black dark:text-white relative {{session('darkMode') ? 'dark' : ''}} ">
    {{$slot}}

    <livewire:util.notify-bar />
</body>

</html>