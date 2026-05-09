<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class StripeController extends Controller
{
    /*
     * Linux
     * curl -L -o stripe.tar.gz https://github.com/stripe/stripe-cli/releases/download/v1.26.1/stripe_1.26.1_linux_x86_64.tar.gz
     * tar -xvf stripe.tar.gz
     * sudo mv stripe /usr/local/bin/
     * stripe listen --forward-to http://localhost/stripe/webhook
     * Commands
     * docker run --rm -it stripe/stripe-cli:latest login
     * sail php artisan cashier:webhook --url=https://your-public-url/stripe/webhook
     */

    public function checkout(): void {}
}
