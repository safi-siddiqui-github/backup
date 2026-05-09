<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class NotificationRequest extends FormRequest
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

    public function markRead($notification_id): void
    {
        $user = Auth::user();

        $n = $user->notifications->find($notification_id);

        $n->markAsRead();
    }

    public function markUnread($notification_id): void
    {
        $user = Auth::user();

        $n = $user->notifications->find($notification_id);

        $n->markAsUnread();
    }
}
