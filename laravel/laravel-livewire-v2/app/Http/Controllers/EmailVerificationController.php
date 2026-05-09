<?php

namespace App\Http\Controllers;

use App\Enums\NotifyBarEnum;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Http\Request;

class EmailVerificationController extends Controller
{
    public function verify_email(EmailVerificationRequest $request)
    {
        $request->fulfill();
        session()->flash('status', NotifyBarEnum::VERIFICATION_SUCCESS);
        return redirect()->intended(route('home'));
    }
}
