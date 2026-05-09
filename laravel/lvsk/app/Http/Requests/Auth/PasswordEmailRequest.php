<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Password;
use Illuminate\Validation\ValidationException;

class PasswordEmailRequest extends FormRequest
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
            'email' => ['required', 'string', 'email', 'exists:users,email', 'max:100'],
        ];
    }

    /**
     * Send Password Reset Link.
     *
     * @return vpid
     */
    public function sendLink(): void
    {
        $status = Password::sendResetLink(
            $this->only('email')
        );

        if ($status !== Password::ResetLinkSent) {
            throw ValidationException::withMessages([
                'email' => 'Error sending reset link'
            ]);
        }
        // return $status === Password::ResetLinkSent
        //     ? back()->with(['status' => __($status)])
        //     : back()->withErrors(['email' => __($status)]);
    }
}
