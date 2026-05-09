<?php

use App\Http\Middleware\Auth\EnsureUserIsAuthenticatedCustom;
use App\Http\Middleware\Auth\EnsureUserIsGuestCustom;
use App\Http\Middleware\CurrentLivewireMiddleware;
use App\Http\Middleware\CurrentReactMiddleware;
use App\Http\Middleware\CurrentVueMiddleware;
use App\Http\Middleware\HandleAppearance;
use App\Http\Middleware\HandleInertiaRequests;
use App\Http\Middleware\Verification\EnsureUserIsNotVerifiedCustom;
use App\Http\Middleware\Verification\EnsureUserIsVerifiedCustom;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__ . '/../routes/web.php',
        api: __DIR__ . '/../routes/api.php',
        commands: __DIR__ . '/../routes/console.php',
        health: '/up'
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->encryptCookies(except: ['appearance']);

        $middleware->web(append: [HandleAppearance::class, HandleInertiaRequests::class, AddLinkHeadersForPreloadedAssets::class]);

        $middleware->alias([
            'customAuth' => EnsureUserIsAuthenticatedCustom::class,
            'customGuest' => EnsureUserIsGuestCustom::class,
            'customVerified' => EnsureUserIsVerifiedCustom::class,
            'customeNotVerified' => EnsureUserIsNotVerifiedCustom::class,
            'customeCurrentReact' => CurrentReactMiddleware::class,
            'customeCurrentVue' => CurrentVueMiddleware::class,
            'customeCurrentLivewire' => CurrentLivewireMiddleware::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })
    ->create();
