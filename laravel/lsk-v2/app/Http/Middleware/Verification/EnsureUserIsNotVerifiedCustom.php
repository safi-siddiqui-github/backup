<?php

namespace App\Http\Middleware\Verification;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureUserIsNotVerifiedCustom
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // If user is verified then dont allow user
        // to revisit verification process pages
        if ($request->user()->hasVerifiedEmail()) {
            //
            if ($request->routeIs('react.*')) {
                return redirect()->route('react.home');
                // 
            } elseif ($request->routeIs('vue.*')) {
                return redirect()->route('vue.home');
            }
            return redirect()->route('livewire.home');
        }

        return $next($request);
    }
}
