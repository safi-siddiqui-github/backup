<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class EventGuestGroup extends Model
{
    use SoftDeletes;

    public function eventModel()
    {
        return $this->belongsTo(EventModel::class);
    }

    public function eventColor()
    {
        return $this->belongsTo(EventColor::class);
    }
}
