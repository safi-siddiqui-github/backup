<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" @class(['dark'=> ($appearance ?? 'system') == 'dark']) >

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title inertia>{{ config('app.name', 'Inertia-React-App') }}</title>

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

    @vite('resources/css/app.css')
    @routes
    @viteReactRefresh
    @vite(['resources/js/react/app.tsx', "resources/js/react/{$page['component']}.tsx"])
    @inertiaHead

</head>

<body class="antialiased text-sm dark:bg-black dark:text-white">

    @inertia

</body>

</html>