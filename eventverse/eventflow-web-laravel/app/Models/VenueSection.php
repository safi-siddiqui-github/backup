<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class VenueSection extends Model
{
    public function venueLocationTable()
    {
        return $this->hasOne(VenueLocationTable::class);
    }
}
