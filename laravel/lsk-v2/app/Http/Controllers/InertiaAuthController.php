<?php

namespace App\Http\Controllers;

use App\Enums\NotifyBarEnum;
use App\Http\Requests\AuthRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class InertiaAuthController extends Controller
{
    public function home()
    {
        return Inertia::render('default/pages/home/IndexPage');
    }

    public function login()
    {
        return Inertia::render('default/pages/auth/LoginPage');
    }

    public function loginPost(AuthRequest $request)
    {
        $request->validate($request->loginRules());
        $request->attemptLoginFN();
        $request->session()->regenerate();
        $request->session()->flash('status', NotifyBarEnum::LOGIN_SUCCESS);
        return Inertia::location($request->getRedirectUri('home'));

        /*
        The issue you're facing is that the auth?.user isn't being updated after logout in Vue, even though it works in React.
        This happens because Vue doesn't automatically rehydrate updated page.props from Inertia when using a redirect (redirect()->to(...)). This prevents both your UI update and session flash message from working together out of the box.
         */
        // return redirect()->intended($request->getRedirectUri('home'))->with('status', NotifyBarEnum::LOGIN_SUCCESS);
    }

    public function register()
    {
        return Inertia::render('default/pages/auth/RegisterPage');
    }

    public function registerPost(AuthRequest $request)
    {
        $request->validate($request->registerRules());
        $request->attemptRegisterFN();

        $request->session()->flash('status', NotifyBarEnum::REGISTER_SUCCESS);
        return Inertia::location($request->getRedirectUri('verificationNotice'));
        
        // return redirect()->to($request->getRedirectUri('verificationNotice'))->with('status', NotifyBarEnum::REGISTER_SUCCESS);
    }

    public function verificationNotice()
    {
        return Inertia::render('default/pages/auth/VerificationNoticePage');
    }

    public function verificationNoticePost(AuthRequest $request)
    {
        $request->validate($request->verificationRules());
        $request->attemptEmailVerificationFN();

        $request->session()->flash('status', NotifyBarEnum::VERIFICATION_SUCCESS);
        return Inertia::location($request->getRedirectUri('home'));
        
        // return redirect()->to($request->getRedirectUri('home'))->with('status', NotifyBarEnum::VERIFICATION_SUCCESS);
    }

    public function verificationNoticeResendPost(AuthRequest $request)
    {
        $request->attemptEmailVerificationResendFN();
    }

    public function passwordResetRequestPost(AuthRequest $request)
    {
        $request->validate($request->passwordRequestRules(), [
            'email.required' => 'Email is required to reset password.',
        ]);
        $request->throttlePasswordRequestFN();

        $request->session()->flash('status', NotifyBarEnum::PASSWORD_REQUEST);
        return Inertia::location($request->getRedirectUri('passwordReset', ['email' => $request->get('email')]));
        
        // return redirect()
        //     ->to($request->getRedirectUri('passwordReset', ['email' => $request->get('email')]))
        //     ->with('status', NotifyBarEnum::PASSWORD_REQUEST);
    }

    public function passwordReset(string $email = '')
    {
        return Inertia::render('default/pages/auth/PasswordResetPage', ['email' => $email]);
    }

    public function passwordResetPost(AuthRequest $request)
    {
        $request->validate($request->passwordResetRules());
        $request->attemptPasswordResetFN();

        $request->session()->flash('status', NotifyBarEnum::PASSWORD_RESET);
        return Inertia::location($request->getRedirectUri('home'));
        
        // return redirect()->to($request->getRedirectUri('home'))->with('status', NotifyBarEnum::PASSWORD_RESET);
    }

    public function passwordResetRequestResendPost(AuthRequest $request)
    {
        $request->validate($request->passwordRequestRules(), [
            'email.required' => 'Email is required to reset password.',
        ]);
        $request->throttlePasswordRequestFN();
    }

    public function logoutPost(AuthRequest $request)
    {
        $request->attemptLogoutFN();
        // Breaks Inertia Flow
        // $request->session()->invalidate();
        $request->session()->regenerateToken();

        $request->session()->flash('status', NotifyBarEnum::LOGOUT_SUCCESS);
        return Inertia::location($request->getRedirectUri('home'));
        
        // return redirect()->to($request->getRedirectUri('home'))->with('status', NotifyBarEnum::LOGOUT_SUCCESS);
    }

    public function profileOverview()
    {
        $socialAuthStatus = Auth::user()->social_profile_status;
        return Inertia::render('default/pages/profile/IndexPage', ['socialAuthStatus' => $socialAuthStatus]);
    }

    public function deleteUser(AuthRequest $request)
    {
        $request->attemptSoftDeleteUserFN();
        $request->session()->regenerateToken();

        // $request->session()->flash('status', NotifyBarEnum::LOGOUT_SUCCESS);
        return Inertia::location($request->getRedirectUri('home'));
        
        // return redirect()->to($request->getRedirectUri('home'));
    }
}
