<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Auth\Events\Verified;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
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
            'username' => '',
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
        $user = $this->dbCreateUserFN();
        // $emailVerificationPin = $this->dbCreateEmailVerificationPinFN();
        // $this->sendEmailVerificationMailFN($user, $emailVerificationPin);

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
        $key = "email-verification-pin:user-$id";

        $attempt = RateLimiter::attempt(
            $key,
            // $perMinute = 1,
            $per10Minute = 1,
            function () use ($user) {
                //
                $emailVerificationPin = $this->dbCreateEmailVerificationPinFN();
                $this->sendEmailVerificationMailFN($user, $emailVerificationPin);
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

    public function throttlePasswordRequestFN(): void
    {
        $user = $this->checkUserIsDeletedFN();
        $id = $user->id;
        $key = "password-reset-pin:user-$id";

        $attempt = RateLimiter::attempt(
            $key,
            // $perMinute = 1,
            $per10Minute = 1,
            function () use ($user) {
                //
                $passwordResetPin = $this->dbCreatePasswordResetPinFN();
                $this->sendPasswordResetMailFN($user, $passwordResetPin);
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

        // Default
        // $status = Password::sendResetLink($this->only('email'));

        // if ($status !== Password::ResetLinkSent) {
        //     throw ValidationException::withMessages([
        //         'email' => 'Error sending reset link',
        //     ]);
        // }

        // return $status === Password::ResetLinkSent
        //     ? back()->with(['status' => __($status)])
        //     : back()->withErrors(['email' => __($status)]);
    }

    public function attemptPasswordResetFN(): void
    {
        $user = $this->checkUserIsDeletedFN();
        //
        $passwordResetPin = PasswordResetPin::where([['email', '=', $this->email], ['pin', '=', $this->pin]])->first();
        //
        if (!$passwordResetPin) {
            throw ValidationException::withMessages([
                'pin' => 'Pin Code is invalid.',
            ]);
        }

        $user = $this->dbChangeUserPasswordFN($user);

        // Default
        // $status = Password::reset($this->only('email', 'password', 'password_confirmation', 'token'), function (User $user, string $password) {
        //     $user
        //         ->forceFill([
        //             'password' => Hash::make($password),
        //         ])
        //         ->setRememberToken(Str::random(60));
        //     $user->save();
        //     event(new PasswordReset($user));
        // });

        // if ($status !== Password::PasswordReset) {
        //     throw ValidationException::withMessages([
        //         'email' => 'Error resetting password.',
        //     ]);
        // }

        // return $status === Password::PasswordReset
        //     ? redirect()->route('login')->with('status', __($status))
        //     : back()->withErrors(['email' => [__($status)]]);
    }

    public function attemptLogoutFN(): void
    {
        //
        if (!Auth::user()) {
            throw ValidationException::withMessages([
                'email' => 'User not logged in.',
            ]);
        }
        //
        // Auth::logout();
        Auth::guard('web')->logout();
        //
        // Session store not set on request
        // $this->session()->invalidate();
        // $this->session()->regenerateToken();
    }

    public function attemptSoftDeleteUserFN(): void
    {
        // Default
        if (!Auth::user()) {
            throw ValidationException::withMessages([
                'email' => 'User not logged in.',
            ]);
        }
        //
        request()->user()->delete();
        Auth::guard('web')->logout();
    }

    public function getRedirectUri(string $path = '', array $props = []): string
    {
        $currentFEState = request()->session()->get('CurrentFEState', 'LIVEWIRE');

        if ($currentFEState == 'REACT') {
            return route("react.$path", $props);
        } elseif ($currentFEState == 'VUE') {
            return route("vue.$path", $props);
        }
        return route("livewire.$path", $props);
    }

    /*
      * Database
      */

    public function dbCreateUserFN(): User
    {
        $user = new User();
        $user->username = Str::slug(Str::before($this->email, '@'));
        $user->email = $this->email;
        $user->password = $this->password;
        $user->save();

        return $user;
    }

    public function dbChangeUserPasswordFN(User $user): User
    {
        $user->password = $this->password;
        $user->save();

        return $user;
    }

    public function dbVerifyUserEmailFN(User $user): User
    {
        $user->email_verified_at = now();
        $user->save();

        return $user;
    }

    public function dbCreateEmailVerificationPinFN(): EmailVerificationPin
    {
        $pin = mt_rand(1111, 9999);

        $emailVerificationPin = EmailVerificationPin::where('email', $this->email)->first();
        if (!$emailVerificationPin) {
            $emailVerificationPin = new EmailVerificationPin();
            $emailVerificationPin->email = $this->email;
        }
        $emailVerificationPin->pin = $pin;
        $emailVerificationPin->save();

        return $emailVerificationPin;
    }

    public function dbCreatePasswordResetPinFN(): PasswordResetPin
    {
        $pin = mt_rand(1111, 9999);

        $passwordResetPin = PasswordResetPin::where('email', $this->email)->first();
        if (!$passwordResetPin) {
            $passwordResetPin = new PasswordResetPin();
            $passwordResetPin->email = $this->email;
        }
        $passwordResetPin->pin = $pin;
        $passwordResetPin->save();

        return $passwordResetPin;
    }

    /*
      * Mail
      */

    public function sendEmailVerificationMailFN(User $user, EmailVerificationPin $emailVerificationPin): void
    {
        Mail::to($user)->queue(new EmailVerificationMail($user, $emailVerificationPin));
    }

    public function sendPasswordResetMailFN(User $user, PasswordResetPin $passwordResetPin): void
    {
        Mail::to($user)->queue(new PasswordResetMail($user, $passwordResetPin));
    }
}
