<?php

namespace App\Http\Controllers;

use App\Http\Traits\UtilTrait;
use DateTimeZone;
use Illuminate\Http\Request;

class TimezoneController extends Controller
{
    use UtilTrait;

    public function index(Request $request)
    {
        return $this->responseHelper(function () use ($request) {
            //
            return response([
                'success' => true,
                'data' => [
                    'timezones' => DateTimeZone::listIdentifiers(),
                ],
            ]);
            //
        });
    }
}
