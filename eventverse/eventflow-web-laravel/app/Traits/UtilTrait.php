<?php

namespace App\Traits;

use Carbon\Carbon;

trait UtilTrait
{
    public function formatDate($date)
    {
        return $date ? Carbon::create($date)->format('Y-m-d\TH:i') : null;
    }
}
