<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class VenueLocationTable extends Model
{
    public function venueLocationTableCells()
    {
        return $this->hasMany(VenueLocationTableCell::class);
    }
}
