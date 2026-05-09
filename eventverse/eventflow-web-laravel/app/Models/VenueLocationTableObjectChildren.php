<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class VenueLocationTableObjectChildren extends Model
{
    public function venueLocationTableObjectCategory()
    {
        return $this->belongsTo(VenueLocationTableObjectCategory::class);
    }
}
