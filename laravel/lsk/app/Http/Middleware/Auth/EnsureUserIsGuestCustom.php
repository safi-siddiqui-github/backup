<?php

namespace App\Http\Middleware\Auth;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class EnsureUserIsGuestCustom
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // If user is authenticated
        // then dont allow user to
        // routes that require user to authenticate again
        // redirect back to intended or home
        if (Auth::user()) {
            //
            if ($request->routeIs('react.*')) {
                return redirect()->intended(route('react.home'));
                // 
            } elseif ($request->routeIs('vue.*')) {
                return redirect()->intended(route('vue.home'));
            }
            return redirect()->intended(route('livewire.home'));
        }

        return $next($request);
    }
}
