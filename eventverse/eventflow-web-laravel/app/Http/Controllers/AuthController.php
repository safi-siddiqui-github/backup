<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Support\Str;

class AuthController
{
    public function verificationVerify(EmailVerificationRequest $request)
    {
        $request->fulfill();
        return redirect()->route('home');
    }

    public function googleRedirect()
    {
        return Socialite::driver('google')->redirect();
    }

    public function googleCallback()
    {
        $socialUser = Socialite::driver('google')->user();
        return $this->socialLogin($socialUser, 'google');
    }

    public function facebookRedirect()
    {
        return Socialite::driver('facebook')->redirect();
    }

    public function facebookCallback()
    {
        $socialUser = Socialite::driver('facebook')->user();
        return $this->socialLogin($socialUser, 'facebook');
    }

    public function linkedinRedirect()
    {
        return Socialite::driver('linkedin')->redirect();
    }

    public function linkedinCallback()
    {
        $socialUser = Socialite::driver('linkedin')->user();
        return $this->socialLogin($socialUser, 'linkedin');
    }

    public function appleRedirect()
    {
        return Socialite::driver('apple')->redirect();
    }

    public function appleCallback()
    {
        $socialUser = Socialite::driver('apple')->user();
        return $this->socialLogin($socialUser, 'apple');
    }

    public function socialLogin($socialUser, $provider)
    {
        $newUser = false;

        $email = $socialUser->getEmail();
        $username = Str::before($email, '@');

        $user = User::where('email', $email)->first();
        if (!$user) {
            $newUser = true;
            $user = new User();
            $user->email = $email;
            $user->username = $username;
        }

        $user->avatar = $socialUser->getAvatar();
        $user->name = $socialUser->getName();
        $socialId = $socialUser->getId();
        $socialToken = $socialUser->token;

        if ($provider == 'google') {
            $user->google_id = $socialId;
            $user->google_token = $socialToken;
        } elseif ($provider == 'facebook') {
            $user->facebook_id = $socialId;
            $user->facebook_token = $socialToken;
        } elseif ($provider == 'linkedin') {
            $user->linkedin_id = $socialId;
            $user->linkedin_token = $socialToken;
        } elseif ($provider == 'apple') {
            $user->apple_id = $socialId;
            $user->apple_token = $socialToken;
        }

        $user->save();

        if ($newUser) {
            // Verifiaction Email
            event(new Registered($user));
        }

        Auth::login($user, $remember = true);
        request()->session()->regenerate();

        if ($newUser) {
            return redirect()->route('verification.notice');
        } else {
            return redirect()->route('home');
        }
    }
}
