<x-mail::message>
# Email Verifiaction

Welcome,<br>
{{ $user->username }} to our Laravel App,<br>

Your verification pin is {{ $emailVerificationPin->pin }}<br>
Verify your eamil and enoy our app!<br>

Thanks,<br>
{{ config('app.name') }}
</x-mail::message>
