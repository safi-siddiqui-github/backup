<?php

use Illuminate\Support\Facades\Route;
use Livewire\Volt\Volt;

Route::name('app.')->group(function () {
    Volt::route('/', 'app.home')->name('home');
    Volt::route('/bookings', 'app.booking')->name('bookings')->middleware('auth');
});
