<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\PageController;
use Illuminate\Support\Facades\Route;

Route::controller(PageController::class)->group(function () {
    Route::get('/', 'home')->name('home');
});

Route::controller(AuthController::class)->group(function () {

    Route::middleware('guest')->group(function () {

        // Login
        Route::get('/login', 'login')->name('login');
        Route::post('/loginForm', 'loginForm')->name('loginForm');

        // Register
        Route::get('/register', 'register')->name('register');
        Route::post('/registerForm', 'registerForm')->name('registerForm');

        // Password Reset
        Route::name('password.')->prefix('password')->group(function () {
            Route::get('/forgot', 'passwordForgot')->name('request');
            Route::post('/email', 'passwordEmail')->name('email');
            Route::get('/reset/{token}', 'passwordReset')->name('reset');
            Route::post('/reset', 'passwordResetForm')->name('resetForm');
        });

        // Social Login
        Route::prefix('auth')->group(function () {
            Route::name('google.')->prefix('google')->group(function () {
                Route::get('/redirect', 'google_redirect')->name('login');
                Route::get('/callback', 'google_callback');
            });

            Route::name('github.')->prefix('github')->group(function () {
                Route::get('/redirect', 'github_redirect')->name('login');
                Route::get('/callback', 'github_callback');
            });
        });
    });

    Route::middleware('auth')->group(function () {

        // Email Verification
        Route::name('verification.')->prefix('verification')->middleware('notVerified')->group(function () {
            Route::get('/notice', 'verificationNotice')->name('notice');
            Route::post('/resend', 'verificationResend')->name('resend');
            Route::get('/email/verify/{id}/{hash}', 'verificationVerify')->name('verify')->middleware('signed');
        });

        // Logout
        Route::post('/logout', 'logout')->name('logout');
    });
});

// Build something amazing
Route::middleware(['auth', 'verified'])->group(function () {
    Route::controller(PageController::class)->group(function () {
        Route::get('/dashboard', 'dashboard')->name('dashboard');
    });
});
