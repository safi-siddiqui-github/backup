<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class EventModel extends Model
{
    use SoftDeletes;

    public function eventCategory()
    {
        return $this->belongsTo(EventCategory::class);
    }

    public function eventFeatures()
    {
        return $this->hasMany(EventFeature::class);
    }

    public function eventLaunchStrategy()
    {
        return $this->belongsTo(EventLaunchStrategy::class);
    }
}
