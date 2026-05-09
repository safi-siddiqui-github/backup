<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" @class(['dark'=> ($appearance ?? 'system') == 'dark'])>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    {{-- Inline script to detect system dark mode preference and apply it immediately --}}
    <script>
        (function() {
            const appearance = '{{ $appearance ?? "system" }}';

            if (appearance === 'system') {
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

                if (prefersDark) {
                    document.documentElement.classList.add('dark');
                }
            }
        })();
    </script>

    {{-- Inline style to set the HTML background color based on our theme in app.css --}}
    <title inertia>{{ config('app.name', 'Inertia-Vue-App') }}</title>

    @vite(['resources/css/app.css'])
    @routes
    @vite(['resources/js/vue/app.ts'])
    @inertiaHead
</head>

<body class="font-sans antialiased text-sm dark:bg-black dark:text-white">
    @inertia
</body>

</html>