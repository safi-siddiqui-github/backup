<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RsvpGuestList extends Model
{
    public function rsvpGroup()
    {
        return $this->belongsTo(RsvpGroup::class);
    }
}
