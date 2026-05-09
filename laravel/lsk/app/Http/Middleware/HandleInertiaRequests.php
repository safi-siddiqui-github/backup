<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\MessageBag;
use Illuminate\Support\ViewErrorBag;
use Inertia\Middleware;
use Tighten\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'components/inertia/layout';

    public function rootView(Request $request): string
    {
        // routeIs() checks for named routes
        if ($request->routeIs('react.*')) {
            return 'components.inertia.react'; // resources/views/components/inertia/react.blade.php
        }

        if ($request->routeIs('vue.*')) {
            return 'components.inertia.vue'; // resources/views/components/inertia/vue.blade.php
        }

        return $this->rootView;
    }

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return array_merge(parent::share($request), [
            'name' => config('app.name'),
            'auth' => [
                // Synchronous
                // 'user' => $request->user(),
                // 'user' => Auth::user(),

                // Lazily...
                // 'user' => fn() => $request->user() ? $request->user()->only('id', 'name', 'email') : null,
                'user' => fn() => $request->user() ? $request->user() : null,
            ],
            'ziggy' => fn(): array => [...(new Ziggy())->toArray(), 'location' => $request->url()],
            'session' => [
                'currentFEState' => $request->session()->get('CurrentFEState', 'LIVEWIRE'),
                'flash' => $request->session()->get('status', 'Success'),
            ],
            'errors' => fn() => ($errors = Session::get('errors')) instanceof ViewErrorBag ? $errors->getBag('default')->getMessages() : (object) [],
        ]);
    }
}
