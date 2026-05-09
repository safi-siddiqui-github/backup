<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class VenueLocationTableObject extends Model
{
    public function venueLocationTableObjectCategory()
    {
        return $this->belongsTo(VenueLocationTableObjectCategory::class);
    }

    public function venueLocationTableObjectChildren()
    {
        return $this->hasMany(VenueLocationTableObjectChildren::class);
    }
}
