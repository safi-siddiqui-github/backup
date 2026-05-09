<?php

namespace App\Http\Requests\Auth;

use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class RegisterRequest extends FormRequest
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
            'email' => ['required', 'string', 'email', 'unique:users,email', 'max:100'],
            'password' => ['required', 'string', 'confirmed', 'min:8', 'max:100'],
            'password_confirmation' => ['required', 'string'],
        ];
    }

    /**
     * After Validation register your user.
     *
     * @return void
     */
    public function register(): void
    {
        $user = new User();
        $user->email = $this->email;
        $user->password = $this->password;
        $user->save();

        // Login user
        Auth::login($user, $remember = false);

        // Verifiaction Email
        event(new Registered($user));

        // Verifiaction Notice Requires Auth
        $this->session()->regenerate();
    }

}
