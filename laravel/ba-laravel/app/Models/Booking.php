<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Booking extends Model
{
    public function timeslot_one(): HasOne
    {
        return $this->hasOne(Timeslot::class, 'id', 'timeslot_id');
    }
    public function timeslot_two(): HasOne
    {
        return $this->hasOne(Timeslot::class, 'id', 'timeslot_two_id');
    }
    public function timeslot_three(): HasOne
    {
        return $this->hasOne(Timeslot::class, 'id', 'timeslot_three_id');
    }
}
