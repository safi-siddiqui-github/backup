<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class EventLogistic extends Model
{
    use SoftDeletes;

    public function eventModel()
    {
        return $this->belongsTo(EventModel::class);
    }

    public function eventAgeRestrictionType()
    {
        return $this->belongsTo(EventAgeRestrictionType::class);
    }

    public function eventParkingType()
    {
        return $this->belongsTo(EventParkingType::class);
    }

    public function eventParkingCostInterval()
    {
        return $this->belongsTo(EventParkingCostInterval::class);
    }
}
