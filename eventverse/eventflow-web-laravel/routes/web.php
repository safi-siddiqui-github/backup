<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;
use Livewire\Volt\Volt;

// Volt::route('/', 'page/general/home')->name('home');
// Volt::route('/about', 'page/general/about')->name('about');
// Volt::route('/contact', 'page/general/contact')->name('contact');

Route::name('general.')->group(function () {
    Volt::route('/', 'page/general/home')->name('home');
    Volt::route('/about', 'page/general/about')->name('about');
    Volt::route('/contact', 'page/general/contact')->name('contact');
    Volt::route('/discover-event', 'page/general/discover-event')->name('discover-event');
    Volt::route('/create-event', 'page/general/create-event')->name('create-event');
    Volt::route('/create-event/{id}', 'page/general/create-event-form')->name('create-event-form')->middleware('auth');
    Volt::route('/event-detail', 'page/general/event-detail')->name('event-detail');
    Volt::route('/event-ticket', 'page/general/event-ticket')->name('event-ticket');
});

Route::middleware(['guest'])->group(function () {
    Volt::route('/login', 'page/auth/login')->name('login');
    Volt::route('/register', 'page/auth/register')->name('register');
});

Route::middleware('auth')->name('dashboard.')->group(function () {
    Volt::route('/dashboard', 'page/dashboard/dashboard')->name('home');
    Volt::route('dashboard/event/{id}', 'page/dashboard/event-dashboard')->name('event-dashboard');
    Volt::route('dashboard/event/{id}/rsvp', 'page/dashboard/rsvp-page')->name('rsvp-page');
    Volt::route('dashboard/event/{id}/seating', 'page/dashboard/seating-page')->name('seating-page');
});

Route::controller(AuthController::class)->group(function () {
    Route::middleware('auth')->group(function () {
        // Email Verification
        Route::name('verification.')
            ->prefix('verification')
            ->middleware('notVerified')
            ->group(function () {
                Volt::route('/notice', 'page/auth/verification-notice')->name('notice');
                Route::get('/email/verify/{id}/{hash}', 'verificationVerify')->name('verify')->middleware('signed');
            });
    });

    Route::middleware('guest')->group(function () {
        // Password Reset
        Route::name('password.')
            ->prefix('password')
            ->group(function () {
                Volt::route('/forgot', 'page/auth/password-forgot')->name('forgot');
                Volt::route('/notice/{email}', 'page/auth/password-notice')->name('notice');
                Volt::route('/reset/{token}', 'page/auth/password-reset')->name('reset');
                Route::post('/reset', 'passwordResetForm')->name('resetForm');
            });

        // Social Login
        Route::name('social.')
            ->prefix('social')
            ->group(function () {
                Route::get('/google/redirect', 'googleRedirect')->name('google.redirect');
                Route::get('/google/callback', 'googleCallback');
                Route::get('/facebook/redirect', 'facebookRedirect')->name('facebook.redirect');
                Route::get('/facebook/callback', 'facebookCallback');
                Route::get('/linkedin/redirect', 'linkedinRedirect')->name('linkedin.redirect');
                Route::get('/linkedin/callback', 'linkedinCallback');
                Route::get('/apple/redirect', 'appleRedirect')->name('apple.redirect');
                Route::get('/apple/callback', 'appleCallback');
            });
    });
});
