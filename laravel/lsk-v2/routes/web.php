<?php

use App\Http\Controllers\InertiaAuthController;
use App\Http\Controllers\SocialAuthController;
use Illuminate\Support\Facades\Route;
use Livewire\Volt\Volt;

/*
Convention [name, prefix, middleware]
*/
// Main Page
Volt::route('/', 'default.pages.home.index')->name('livewire.home');
//
Route::name('social.')
    ->prefix('social')
    ->controller(SocialAuthController::class)
    ->group(function () {
        // //
        Route::name('google.')
            ->prefix('google')
            ->group(function () {
                Route::get('/redirect', 'google_redirect')->name('login');
                Route::get('/callback', 'google_callback')->name('callback');
            });
        // //
        Route::name('github.')
            ->prefix('github')
            ->group(function () {
                Route::get('/redirect', 'github_redirect')->name('login');
                Route::get('/callback', 'github_callback')->name('callback');
            });
    });
//
Route::name('livewire.')
    ->prefix('/livewire')
    ->middleware('customeCurrentLivewire')
    ->group(function () {
        //
        Route::middleware('customGuest')->group(function () {
            // /
            Volt::route('/login', 'default.pages.auth.login')->name('login');
            Volt::route('/register', 'default.pages.auth.register')->name('register');
            // /
            Route::name('password.')
                ->prefix('forgot-password')
                ->group(function () {
                    // Volt::route('/email-request', 'default.pages.auth.password-request')->name('request');
                    Volt::route('/reset/{email}', 'default.pages.auth.password-reset')->name('reset');
                });
            // /
        });

        //
        Route::middleware('customAuth')->group(function () {
            Route::name('verification.')
                ->prefix('verification')
                ->middleware('customeNotVerified')
                ->group(function () {
                    Volt::route('/notice', 'default.pages.auth.verification-notice')->name('notice');
                    // Default Signed Url
                    // Route::controller(LivewireController::class)->group(
                    //     function () {
                    //         Route::get('/email/verify/{id}/{hash}', 'verify_email')
                    //             ->name('verify')
                    //             ->middleware('signed');
                    //     }
                    // );
                });

            //
            Route::name('profile.')
                ->prefix('profile')
                ->group(function () {
                    Volt::route('/overview', 'default.pages.profile.index')->name('overview');
                });
        });

        //
        Route::name('crm.')
            ->prefix('/crm')
            ->group(function () {
                Volt::route('/', 'crm.pages.home')->name('home');
            });
    });

//
Route::controller(InertiaAuthController::class)->group(function () {
    //
    $sameRoutes = function () {
        Route::get('/', 'home')->name('home');

        Route::middleware('customGuest')->group(function () {
            Route::get('/login', 'login')->name('login');
            Route::post('/login', 'loginPost')->name('loginPost');
            Route::get('/register', 'register')->name('register');
            Route::post('/register', 'registerPost')->name('registerPost');
            Route::post('/password/reset/request', 'passwordResetRequestPost')->name('passwordResetRequestPost');
            Route::get('/password/reset/{email}', 'passwordReset')->name('passwordReset');
            Route::post('/password/reset', 'passwordResetPost')->name('passwordResetPost');
            Route::post('/password/reset/resend', 'passwordResetRequestResendPost')->name('passwordResetRequestResendPost');
        });

        Route::middleware('customAuth')->group(function () {
            Route::get('/verification/notice', 'verificationNotice')->name('verificationNotice');
            Route::post('/verification/notice', 'verificationNoticePost')->name('verificationNoticePost');
            Route::post('/verification/notice/resend', 'verificationNoticeResendPost')->name('verificationNoticeResendPost');
            Route::get('/profile/overview', 'profileOverview')->name('profileOverview');
            Route::post('/profile/delete', 'deleteUser')->name('deleteUser');
            Route::post('/logout', 'logoutPost')->name('logoutPost');
        });
    };
    //
    Route::name('react.')
        ->prefix('react')
        ->middleware('customeCurrentReact')
        ->group(function () use ($sameRoutes) {
            $sameRoutes();
        });

    //
    Route::name('vue.')
        ->prefix('vue')
        ->middleware('customeCurrentVue')
        ->group(function () use ($sameRoutes) {
            $sameRoutes();
        });
});
