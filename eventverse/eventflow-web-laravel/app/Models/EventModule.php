<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class EventModule extends Model
{
    use SoftDeletes;

    public function eventCategory()
    {
        return $this->belongsTo(EventCategory::class);
    }

    public function eventLocations()
    {
        return $this->hasMany(EventLocation::class);
    }

    public function primaryLocation()
    {
        return $this->hasOne(EventLocation::class)->where('isPrimary', true);
    }
}
