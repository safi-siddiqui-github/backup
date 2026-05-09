<?php

use App\Http\Controllers\EventAgeRestrictionTypeController;
use App\Http\Controllers\EventCategoryController;
use App\Http\Controllers\EventColorController;
use App\Http\Controllers\EventFaqCategoryController;
use App\Http\Controllers\EventFaqController;
use App\Http\Controllers\EventFeatureCategoryController;
use App\Http\Controllers\EventFeatureController;
use App\Http\Controllers\EventGuestController;
use App\Http\Controllers\EventGuestGroupController;
use App\Http\Controllers\EventLaunchStrategyController;
use App\Http\Controllers\EventLogisticController;
use App\Http\Controllers\EventModelController;
use App\Http\Controllers\EventParkingCostIntervalController;
use App\Http\Controllers\EventParkingTypeController;
use App\Http\Controllers\EventSpecialGuestController;
use App\Http\Controllers\EventVenueTypeController;
use App\Http\Controllers\OtpController;
use App\Http\Controllers\TimezoneController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

//
Route::prefix('users')
    ->controller(UserController::class)
    ->group(function () {
        Route::get('/tokenMissing', 'tokenMissing');
        Route::post('/authenticate-identifier', 'authenticateIdentifier');
        Route::post('/authenticate-credential', 'authenticateCredential');
    });
//
Route::middleware('auth:sanctum')->group(function () {
    //
    Route::apiResource('users', UserController::class)
        ->withoutMiddlewareFor('store', 'auth:sanctum')
        ->withoutMiddlewareFor('update', 'auth:sanctum');
    //
    Route::apiResource('otps', OtpController::class)
        ->except(['update'])
        ->withoutMiddlewareFor('store', 'auth:sanctum');
    //
    Route::apiResource('event-timezones', TimezoneController::class)->only([
        'index',
    ]);
    //
    Route::apiResource(
        'event-launch-strategies',
        EventLaunchStrategyController::class,
    );
    //
    Route::apiResource('event-colors', EventColorController::class);
    //
    Route::apiResource('event-categories', EventCategoryController::class);
    //
    Route::apiResource(
        'event-feature-categories',
        EventFeatureCategoryController::class,
    );
    //
    Route::apiResource('event-models', EventModelController::class);
    //
    Route::apiResource(
        'event-age-restriction-types',
        EventAgeRestrictionTypeController::class,
    );
    //
    Route::apiResource(
        'event-parking-types',
        EventParkingTypeController::class,
    );
    //
    Route::apiResource(
        'event-parking-cost-intervals',
        EventParkingCostIntervalController::class,
    );
    //
    Route::apiResource(
        'event-logistics',
        EventLogisticController::class,
    )->except(['update']);
    //
    Route::apiResource(
        'event-special-guests',
        EventSpecialGuestController::class,
    );
    //
    Route::apiResource(
        'event-faq-categories',
        EventFaqCategoryController::class,
    );
    //
    Route::apiResource('event-faqs', EventFaqController::class);
    //
    Route::apiResource('event-venue-types', EventVenueTypeController::class);
    //
    Route::apiResource('event-features', EventFeatureController::class);
    //
    Route::apiResource('event-guest-groups', EventGuestGroupController::class);
    //
    Route::apiResource('event-guests', EventGuestController::class);
    //
});
