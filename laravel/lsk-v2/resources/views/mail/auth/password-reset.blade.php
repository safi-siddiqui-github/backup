<x-mail::message>
# Password Reset Request

{{ $user->username }} you requested password reset,<br>
Your reset pin is {{ $passwordResetPin->pin }}<br>

Thanks,<br>
{{ config('app.name') }}
</x-mail::message>
