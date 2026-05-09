<?php

namespace App\Http\Controllers;

use App\Enums\ToastBarEnum;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class SocialAuthController extends Controller
{
    public function google_redirect()
    {
        return Socialite::driver('google')->redirect();
    }

    public function google_callback(Request $request)
    {
        $socialUser = Socialite::driver('google')->user();
        return $this->saveUpdateUser($request, $socialUser, 'google');
    }

    public function github_redirect()
    {
        return Socialite::driver('github')->redirect();
    }

    public function github_callback(Request $request)
    {
        $socialUser = Socialite::driver('github')->user();
        return $this->saveUpdateUser($request, $socialUser, 'github');
    }

    public function saveUpdateUser(Request $request, $socialUser, $provider = '')
    {
        $credentials = $this->getCredentials($socialUser);
        $checkUser = $this->checkUserExistsOrTrashed($credentials);

        if ($checkUser['trash']) {
            throw ValidationException::withMessages([
                'email' => 'User has been deleted.',
            ]);
        }

        if (!$checkUser['exist']) {
            $this->createUser($credentials);
        }

        $user = $this->updateUser($credentials, $provider);

        Auth::login($user, $remember = true);

        session()->flash('status', ToastBarEnum::LOGIN_SUCCESS);

        return redirect()->intended(route('app.home'));
    }

    public function getCredentials($socialUser): Collection
    {
        $id = $socialUser->getId();
        $email = $socialUser->getEmail();
        $name = $socialUser->getName() ?? '';
        $avatar = $socialUser->getAvatar() ?? '';
        $password = bcrypt("$email-$id");
        $token = $socialUser->token;
        $username = Str::slug(Str::lower(Str::before($email, '@')), '-');

        return collect([
            'id' => $id,
            'email' => $email,
            'name' => $name,
            'avatar' => $avatar,
            'username' => $username,
            'password' => $password,
            'token' => $token,
        ]);
    }

    public function checkUserExistsOrTrashed($credentials)
    {
        $id = $credentials['id'];
        $email = $credentials['email'];
        $username = $credentials['username'];
        $token = $credentials['token'];

        $user = User::withTrashed()
            ->where('email', $email)
            ->orWhere('username', $username)
            ->first();
        //
        if ($user) {
            //
            if ($user->trashed()) {
                return [
                    'exist' => false,
                    'trash' => true,
                ];
            }
            //
            return [
                'exist' => true,
                'trash' => false,
            ];
        }
        //
        return [
            'exist' => false,
            'trash' => false,
        ];
    }

    public function updateUser($credentials, $provider): User
    {
        $id = $credentials['id'];
        $email = $credentials['email'];
        $username = $credentials['username'];
        $token = $credentials['token'];

        $user = User::where('email', $email)->orWhere('username', $username)->first();
        //
        if ($user) {
            //
            if ($provider == 'google') {
                $user->google_id = $id;
                $user->google_token = $token;
                //
            } elseif ($provider == 'github') {
                $user->github_id = $id;
                $user->github_token = $token;
            }
            //
            $user->save();
        }

        return $user;
    }

    public function createUser($credentials)
    {
        $email = $credentials['email'];
        $username = $credentials['username'];
        $name = $credentials['name'];
        $password = $credentials['password'];
        $avatar = $credentials['avatar'];

        $user = User::where('email', $email)->orWhere('username', $username)->first();
        //
        if (!$user) {
            //
            $user = new User();
            $user->email = $email;
            $user->username = $username;
            $user->name = $name;
            $user->password = $password;
            $user->avatar = $avatar;
            $user->email_verified_at = now();
            $user->save();
        }
    }
}
