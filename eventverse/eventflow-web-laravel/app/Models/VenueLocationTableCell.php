<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class VenueLocationTableCell extends Model
{
    public function venueLocationTableObject()
    {
        return $this->hasOne(VenueLocationTableObject::class);
    }
}
