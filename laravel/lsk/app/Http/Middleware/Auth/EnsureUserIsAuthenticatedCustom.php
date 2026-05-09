<?php

namespace App\Http\Middleware\Auth;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class EnsureUserIsAuthenticatedCustom
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // If user is not-authenticated
        // then dont allow user to
        // routes that require user to be authenticated
        // redirect back to login
        if (!Auth::user()) {
            //
            if ($request->routeIs('react.*')) {
                return redirect()->route('react.login');
                // 
            } elseif ($request->routeIs('vue.*')) {
                return redirect()->route('vue.login');
            }
            return redirect()->route('livewire.login');
        }

        return $next($request);
    }
}
