<?php

namespace App\Http\Requests\Auth;

use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Support\Str;

class GithubLoginRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            //
        ];
    }

    /**
     * Google Login Request.
     *
     * @return Void
     */
    public function login(): void
    {
        $socialUser = Socialite::driver('github')->user();
        $newUser = false;

        $username = $socialUser->getName() ?? $socialUser->getNickname();
        $username = Str::of($username)->lower();
        $username = Str::slug($username, '-');
        $email = $socialUser->getEmail();

        $user = User::where('email', $email)->first();
        if (!$user) {
            $user = new User();
            $user->email = $email;
            $user->username = $username;
            $newUser = true;
        }

        $user->avatar = $socialUser->getAvatar();
        $user->name = $socialUser->getName();
        $user->github_id = $socialUser->getId();
        $user->github_token = $socialUser->token;
        $user->save();

        if ($newUser) {
            // Verifiaction Email
            event(new Registered($user));
        }

        Auth::login($user, $remember = true);
        $this->session()->regenerate();
    }
}
