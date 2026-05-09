<?php

namespace App\Providers;

use App\Models\User;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\ServiceProvider;
use SocialiteProviders\Manager\SocialiteWasCalled;
use SocialiteProviders\Facebook\Provider as FacebookProvider;
use SocialiteProviders\LinkedIn\Provider as LinkedInProvider;
use SocialiteProviders\Apple\Provider as AppleProvider;

class AppServiceProvider extends ServiceProvider
{
    // public $gates = ['executive', 'manager', 'technician'];

    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // foreach ($this->gates as $each) {
        //     Gate::define($each, function (User $user) use ($each) {
        //         return $user->role === $each;
        //     });
        // }

        Event::listen(function (SocialiteWasCalled $event) {
            $event->extendSocialite('facebook', FacebookProvider::class);
            $event->extendSocialite('linkedin', LinkedInProvider::class);
            $event->extendSocialite('apple', AppleProvider::class);
        });
    }
}
