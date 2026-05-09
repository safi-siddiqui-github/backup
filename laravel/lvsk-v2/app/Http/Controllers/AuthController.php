<?php

namespace App\Http\Controllers;

use App\Http\Requests\Auth\GithubLoginRequest;
use App\Http\Requests\Auth\GoogleLoginRequest;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\LogoutRequest;
use App\Http\Requests\Auth\PasswordEmailRequest;
use App\Http\Requests\Auth\PasswordResetRequest;
use App\Http\Requests\Auth\RegisterRequest;
use App\Http\Requests\Auth\VerificationResendRequest;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Laravel\Socialite\Facades\Socialite;

class AuthController extends Controller
{
    public function login()
    {
        return Inertia::render('auth/login');
    }

    public function loginForm(LoginRequest $request)
    {
        $request->login();
        $request->session()->regenerate();
        return redirect()->intended(route('home', absolute: false));
    }

    public function register()
    {
        return Inertia::render('auth/register');
    }

    public function registerForm(RegisterRequest $request)
    {
        $request->register();
        return redirect()->route('verification.notice');
    }

    public function verificationNotice()
    {
        return Inertia::render('auth/verification-notice');
    }

    public function verificationResend(VerificationResendRequest $request)
    {
        $request->resend();
        return redirect()->back();
    }

    public function verificationVerify(EmailVerificationRequest $request)
    {
        $request->fulfill();
        return redirect()->intended(route('home', absolute: false));
    }

    public function passwordForgot()
    {
        return Inertia::render('auth/password-forgot');
    }

    public function passwordEmail(PasswordEmailRequest $request)
    {
        $request->sendLink();
        return redirect()->route('login');
    }

    public function passwordReset($token = null)
    {
        $email = request()->query('email');
        return Inertia::render('auth/password-reset', ['token' => $token, 'email' => $email]);
    }

    public function passwordResetForm(PasswordResetRequest $request)
    {
        $request->resetPassword();
        return redirect()->route('login');
    }

    public function logout(LogoutRequest $request): RedirectResponse
    {
        $request->logout();
        // redirecting to home solves refresh issue
        return redirect()->route('home');
    }

    // Social Login
    public function google_redirect()
    {
        // Cors issue when redirecting
        $redirectUrl = Socialite::driver('google')->redirect()->getTargetUrl();
        return response('', 409)->header('X-Inertia-Location', $redirectUrl);
    }

    public function google_callback(GoogleLoginRequest $request)
    {
        $request->login();
        return redirect()->intended(route('home', absolute: false));
    }

    public function github_redirect()
    {
        // Cors issue when redirecting
        $redirectUrl = Socialite::driver('github')->redirect()->getTargetUrl();
        return response('', 409)->header('X-Inertia-Location', $redirectUrl);
    }

    public function github_callback(GithubLoginRequest $request)
    {
        $request->login();
        return redirect()->intended(route('home', absolute: false));
    }
}
