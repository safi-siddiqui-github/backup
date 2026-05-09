<?php

namespace App\Http\Middleware\Verification;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureUserIsVerifiedCustom
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // If user is not verified then dont proceed further
        // Redirect to verification notice
        // Ensure user doesnot visit verification routes
        if (!$request->user()->hasVerifiedEmail()) {
            if ($request->routeIs('react.')) {
                return redirect()->route('react.verification.notice');
                // 
            } elseif ($request->routeIs('vue.')) {
                return redirect()->route('vue.verification.notice');
            }
            return redirect()->route('livewire.verification.notice');
        }

        return $next($request);
    }
}
