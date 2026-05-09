<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Validation\ValidationException;

class VerificationResendRequest extends FormRequest
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
     * Verification Resend Request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function resend(): array
    {
        $user = $this->user();
        $id = $user->id;
        $key = "resend-link:user-$id";

        $attempt = RateLimiter::attempt(
            $key,
            // $perMinute = 1,
            $perTwoMinute = 1,
            function () use ($user) {
                $user->sendEmailVerificationNotification();
            },
            $decaySeconds = 120
        );

        $availableIn = RateLimiter::availableIn($key);

        if (!$attempt) {
            throw ValidationException::withMessages([
                'throttle' => "New email will be sent in $availableIn seconds",
            ]);
        }

        // Verifiaction Link Sent
        throw ValidationException::withMessages([
            'throttle' => "Email has already been sent.",
        ]);
    }
}
