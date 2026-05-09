<?php

use App\Http\Controllers\SocialAuthController;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Support\Facades\Route;
use Livewire\Volt\Volt;

Route::name('verification.')
    ->prefix('/verification')
    ->middleware(['auth', 'notVerified'])
    ->group(function () {
        //
        Volt::route('/notice', 'app.verification-notice')->name('notice');
        //
        Route::get('/email/verify/{id}/{hash}', function (EmailVerificationRequest $request) {
            $request->fulfill();
            return redirect()->route('app.home');
        })
            ->name('verify')
            ->middleware('signed');
    });

Route::name('social.')
    ->prefix('social')
    ->controller(SocialAuthController::class)
    ->group(function () {
        //
        Route::name('google.')
            ->prefix('google')
            ->group(function () {
                Route::get('/redirect', 'google_redirect')->name('login');
                Route::get('/callback', 'google_callback')->name('callback');
            });
        //
        Route::name('github.')
            ->prefix('github')
            ->group(function () {
                Route::get('/redirect', 'github_redirect')->name('login');
                Route::get('/callback', 'github_callback')->name('callback');
            });
    });

Volt::route('/password/reset/{token}', 'app.password-reset')
    ->name('password.reset')
    ->middleware('guest');

Route::name('app.')->group(function () {
    Volt::route('/', 'app.home')->name('home');
    Volt::route('/profile', 'app.profile')->name('profile')->middleware('auth');

    Volt::route('/categories', 'app.categories')->name('categories');
    Volt::route('/search', 'app.search')->name('search');
    Volt::route('/product/{slug}', 'app.product')->name('product');
    Volt::route('/cart', 'app.cart')->name('cart');
    Volt::route('/orders', 'app.orders')->name('orders');
    Volt::route('/notifications', 'app.notifications')->name('notifications');
});
