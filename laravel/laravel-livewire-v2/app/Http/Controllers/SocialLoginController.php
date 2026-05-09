<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Laravel\Socialite\Facades\Socialite;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class SocialLoginController extends Controller
{
    public function google_redirect()
    {
        return Socialite::driver('google')->redirect();
    }

    public function google_callback(Request $request)
    {
        $socialUser = Socialite::driver('google')->user();

        $username = $socialUser->getName() ?? $socialUser->getNickname();
        $username = Str::of($username)->lower();
        $username = Str::slug($username, '-');
        $email = $socialUser->getEmail();

        $user = User::where('email', $email)->first();
        if (!$user) {
            $user = new User();
            $user->email = $email;
            $user->username = $username;
        }

        $user->avatar = $socialUser->getAvatar();
        $user->name = $socialUser->getName();
        $user->google_id = $socialUser->getId();
        $user->google_token = $socialUser->token;
        $user->save();

        Auth::login($user, $remember = true);
        $request->session()->regenerate();
        return redirect()->intended(route('home'));
    }

    public function github_redirect()
    {
        return Socialite::driver('github')->redirect();
    }

    public function github_callback(Request $request)
    {
        $socialUser = Socialite::driver('github')->user();

        $username = $socialUser->getName() ?? $socialUser->getNickname();
        $username = Str::of($username)->lower();
        $username = Str::slug($username, '-');
        $email = $socialUser->getEmail();

        $user = User::where('email', $email)->first();
        if (!$user) {
            $user = new User();
            $user->email = $email;
            $user->username = $username;
        }

        $user->avatar = $socialUser->getAvatar();
        $user->name = $socialUser->getName();
        $user->github_id = $socialUser->getId();
        $user->github_token = $socialUser->token;
        $user->save();

        Auth::login($user, $remember = true);
        $request->session()->regenerate();
        return redirect()->intended(route('home'));
    }


}
