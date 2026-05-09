<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\ConfirmablePasswordController;
use App\Http\Controllers\Auth\EmailVerificationNotificationController;
use App\Http\Controllers\Auth\EmailVerificationPromptController;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\VerifyEmailController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ChatController;

Route::controller(AuthController::class)->group(function () {
    Route::middleware('guest')->group(function () {
        Route::get('/login', 'login')->name('login');
        Route::post('/loginForm', 'loginForm')->name('loginForm');
        Route::get('/register', 'register')->name('register');
        Route::post('/registerForm', 'registerForm')->name('registerForm');

        Route::name('password.')
            ->prefix('password')
            ->group(function () {
                Route::get('/request', 'forgotPassword')->name('request');
                Route::post('/email', 'passwordEmail')->middleware('throttle:6,1')->name('email');
                Route::get('/reset-password/{token}', 'passwordReset')->name('reset');
                Route::post('/update', 'passwordUpdate')->name('update');
            });
    });
    Route::name('verification.')
        ->prefix('email/verify')
        ->middleware('auth')
        ->group(function () {
            Route::get('/', 'emailVerify')->name('notice');
            Route::get('/{id}/{hash}', 'emailVerifyForm')
                ->middleware(['signed', 'throttle:6,1'])
                ->name('verify');
            Route::post('/send', 'emailVerifySend')->middleware('throttle:6,1')->name('send');
        });

    Route::post('logout', 'logout')->name('logout');
});

Route::controller(ChatController::class)->middleware(['auth', 'verified'])->group(function () {
        Route::get('/', 'index')->name('home');
        Route::get('/dashboard', 'dashboard')->name('dashboard');
});
