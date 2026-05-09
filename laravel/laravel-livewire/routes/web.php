<?php

use App\Http\Controllers\EmailVerificationController;
use App\Http\Controllers\ForgotPasswordController;
use App\Http\Controllers\SocialLoginController;
use Illuminate\Support\Facades\Route;
use Livewire\Volt\Volt;

// Route::get('/', function(){
//     return view('pages.home');
// })->name('home');

Volt::route('/', 'page.home')->name('home');

Route::name('auth.')->prefix('auth')->middleware('guest')->group(function () {
    Volt::route('/login', 'auth.login')->name('login');
    Volt::route('/register', 'auth.register')->name('register');

    Route::name('google.')->prefix('google')->controller(SocialLoginController::class)->group(function () {
        Route::get('/redirect', 'google_redirect')->name('login');
        Route::get('/callback', 'google_callback');
    });

    Route::name('github.')->prefix('github')->controller(SocialLoginController::class)->group(function () {
        Route::get('/redirect', 'github_redirect')->name('login');
        Route::get('/callback', 'github_callback');
    });
});

// Password Reset
Route::name('password.')->prefix('forgot-password')->group(function () {
    Volt::route('/email-request', 'auth.forgot.email-request')->name('request');
    Volt::route('/reset-password/{token}', 'auth.forgot.reset-password')->name('reset');
});

// Email Verification
Route::name('verification.')->prefix('email-verification')->middleware('auth')->group(function () {
    Volt::route('/notice', 'auth.verification.notice')->name('notice');

    Route::controller(EmailVerificationController::class)->group(function () {
        Route::get('/email/verify/{id}/{hash}', 'verify_email')->name('verify')->middleware('signed');
    });
});

// Apps
Route::middleware(['auth', 'verified'])->group(function () {

    Route::name('todo.')->prefix('todo')->group(function () {
        Volt::route('/', 'todo.app')->name('app');
    });
});


// Route::view('dashboard', 'dashboard')
//     ->middleware(['auth', 'verified'])
//     ->name('dashboard');

// Route::middleware(['auth'])->group(function () {
//     Route::redirect('settings', 'settings/profile');

//     Volt::route('settings/profile', 'settings.profile')->name('settings.profile');
//     Volt::route('settings/password', 'settings.password')->name('settings.password');
//     Volt::route('settings/appearance', 'settings.appearance')->name('settings.appearance');
// });

// require __DIR__.'/auth.php';
