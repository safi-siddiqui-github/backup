<?php

namespace App\Http\Requests;

use App\Models\Image;
use App\Models\User;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Auth\Events\Registered;
use Illuminate\Auth\Events\Verified;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;

class AuthRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * State & Rules.
     */

    public function loginState(): array
    {
        return [
            'email' => '',
            'password' => '',
            'remember' => true,
        ];
    }

    public function loginRules(): array
    {
        return [
            'email' => ['required', 'string', 'email', 'min:5', 'max:100', 'exists:users,email'],
            'password' => ['required', 'string', 'min:5', 'max:100'],
            'remember' => ['nullable', 'boolean'],
        ];
    }

    public function registerState(): array
    {
        return [
            'email' => '',
            'password' => '',
            'password_confirmation' => '',
        ];
    }

    public function registerRules(): array
    {
        return [
            'email' => ['required', 'string', 'email', 'min:5', 'max:100', 'unique:users,email'],
            'password' => ['required', 'string', 'min:5', 'max:100', 'confirmed'],
            'password_confirmation' => ['required', 'string', 'min:5', 'max:100'],
        ];
    }

    public function forgotRequestState(): array
    {
        return [
            'email' => '',
        ];
    }

    public function forgotRequestRules(): array
    {
        return [
            'email' => ['required', 'string', 'email', 'exists:users,email'],
        ];
    }

    public function passwordResetState(): array
    {
        return [
            'password' => '',
            'password_confirmation' => '',
        ];
    }

    public function passwordResetRules(): array
    {
        return [
            'email' => ['required', 'string', 'email', 'exists:users,email'],
            'token' => ['required', 'string'],
            'password' => ['required', 'string', 'min:5', 'max:100', 'confirmed'],
            'password_confirmation' => ['required', 'string', 'min:5', 'max:100'],
        ];
    }

    public function userUpdateRules(): array
    {
        return [
            'email' => ['required', 'string', 'email', 'exists:users,email'],
            'username' => ['required', 'string', 'exists:users,username'],
            'password' => ['required', 'string', 'min:5', 'max:100'],
            'name' => ['nullable', 'string', 'min:3', 'max:50'],
            'image' => ['nullable', 'image', 'max:1024'],
        ];
    }

    /*
     * Functions
     */

    public function attemptLoginFN(): void
    {
        //
        $user = $this->checkUserIsDeletedFN();
        //
        if (!Auth::attempt($this->only('email', 'password'), $this->boolean('remember'))) {
            throw ValidationException::withMessages([
                'email' => 'Credentials are invalid.',
            ]);
        }
    }

    public function attemptRegisterFN(): void
    {
        $user = new User();
        $user->username = Str::slug(Str::lower(Str::before($this->email, '@')), '-');
        $user->email = $this->email;
        $user->password = $this->password;
        $user->save();

        // Login user
        Auth::login($user, $remember = false);

        // Verifiaction Email
        event(new Registered($user)); // default

        // Verifiaction Notice Requires Auth
        // Not Valid For Livewire [Session store not available]
        // $this->session()->regenerate();
    }

    public function attemptEmailVerificationResendFN(): void
    {
        // Default
        if (!Auth::user()) {
            throw ValidationException::withMessages([
                'email' => 'User need to login.',
            ]);
        }
        //
        $this->throttleEmailVerificationMailResendFN();
    }

    public function throttleEmailVerificationMailResendFN(): void
    {
        $user = Auth::user();
        $id = $user->id;
        $key = "ev-user-$id";

        $attempt = RateLimiter::attempt(
            $key,
            // $perMinute = 1,
            $per10Minute = 1,
            function () {
                //
                request()->user()->sendEmailVerificationNotification();
            },
            // $decayRate = 60 // 1 minute
            $decayRate = 600 // 10 minute
        );

        $availableIn = RateLimiter::availableIn($key);

        // Attempt
        if (!$attempt) {
            //
            $msg = "Kindly wait for $availableIn seconds.";

            if ($availableIn > 60) {
                $availableIn = round($availableIn / 60);
                $msg = "Kindly wait for $availableIn minutes.";
            }

            throw ValidationException::withMessages([
                'email' => $msg,
            ]);
        }

        // Sent
        throw ValidationException::withMessages([
            'email' => 'Email has already been sent.',
        ]);
    }

    public function throttlePasswordRequestFN(): void
    {
        $user = $this->checkUserIsDeletedFN();
        $id = $user->id;
        $key = "fp:user-$id";

        $attempt = RateLimiter::attempt(
            $key,
            // $perMinute = 1,
            $per10Minute = 1,
            function () {
                //
                $status = Password::sendResetLink([
                    'email' => $this->email,
                ]);

                if ($status !== Password::ResetLinkSent) {
                    throw ValidationException::withMessages([
                        'email' => 'Error sending reset link',
                    ]);
                }
            },
            // $decayRate = 60 // 1 minute
            $decayRate = 600 // 10 minute
        );

        $availableIn = RateLimiter::availableIn($key);

        // Attempt
        if (!$attempt) {
            //
            $msg = "Kindly wait for $availableIn seconds.";

            if ($availableIn > 60) {
                $availableIn = round($availableIn / 60);
                $msg = "Kindly wait for $availableIn minutes.";
            }

            throw ValidationException::withMessages([
                'email' => $msg,
            ]);
        }
    }

    public function attemptPasswordResetFN(): void
    {
        $this->checkUserIsDeletedFN();
        //
        $status = Password::reset(
            [
                'email' => $this->email,
                'token' => $this->token,
                'password' => $this->password,
                'password_confirmation' => $this->password_confirmation,
            ],

            function (User $user, string $password) {
                $user
                    ->forceFill([
                        'password' => Hash::make($password),
                    ])
                    ->setRememberToken(Str::random(60));

                $user->save();

                event(new PasswordReset($user));
            }
        );
        //
        if ($status !== Password::PasswordReset) {
            throw ValidationException::withMessages([
                'email' => 'Password reset failed.',
            ]);
        }
    }

    public function attemptLogoutFN(): void
    {
        //
        $this->checkUserIsLoggedIn();
        // Auth::logout();
        Auth::guard('web')->logout();
        //
        // Session store not set on request
        // $this->session()->invalidate();
        request()->session()->invalidate();
        request()->session()->regenerateToken();
    }

    public function attemptSoftDeleteUserFN(): void
    {
        // Default
        $this->checkUserIsLoggedIn();
        //
        request()->user()->delete();
        Auth::guard('web')->logout();
    }

    public function attemptUserUpdateFN(): void
    {
        //
        $this->checkUserIsLoggedIn();
        //
        // email
        $user = $this->checkUserIsDeletedFN();
        //
        // email, password
        $this->checkUserPasswordIsValid();
        //
        if ($this->name) {
            $user->name = $this->name;
        }
        //
        if ($this->image && $this->username) {
            $this->uploadUserImage();
        }
        //
        $user->save();
    }

    /*
     * Helpers
     */

    public function checkUserIsDeletedFN(): User
    {
        $user = User::withTrashed()->where('email', $this->email)->first();
        //
        if (!$user) {
            throw ValidationException::withMessages([
                'email' => 'Email is invalid',
            ]);
        }
        //
        if ($user->trashed()) {
            throw ValidationException::withMessages([
                'email' => 'User has been deleted.',
            ]);
        }

        return $user;
    }

    public function checkUserPasswordIsValid(): void
    {
        if (
            !Auth::attempt(
                [
                    'email' => $this->email,
                    'password' => $this->password,
                ],
                false
            )
        ) {
            throw ValidationException::withMessages([
                'email' => 'Credentials are invalid.',
            ]);
        }
    }

    public function checkUserIsLoggedIn(): void
    {
        if (!Auth::user()) {
            throw ValidationException::withMessages([
                'email' => 'User not logged in.',
            ]);
        }
    }

    public function uploadUserImage(): void
    {
        $file = $this->image;
        $type = $file->getClientOriginalExtension();
        $path = 'users';
        $name = $this->username . '.' . $type;
        $user_id = Auth::id();

        $path = Storage::putFileAs($path, $file, $name);

        $image = Image::where('user_id', $user_id)->first();
        if (!$image) {
            $image = new Image();
            $image->user_id = Auth::id();
        }

        $image->name = $name;
        $image->size = $file->getSize();
        $image->type = $file->getMimeType();
        $image->path = $path;
        $image->save();
    }

    /*
     * Mail
     */

    // public function sendEmailVerificationMailFN(
    //     User $user,
    //     EmailVerificationPin $emailVerificationPin
    // ): void {
    //     Mail::to($user)->queue(new EmailVerificationMail($user, $emailVerificationPin));
    // }
}
