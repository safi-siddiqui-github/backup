<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class VenueLocation extends Model
{
    public function venueLocationTable()
    {
        return $this->hasOne(VenueLocationTable::class);
    }
}
