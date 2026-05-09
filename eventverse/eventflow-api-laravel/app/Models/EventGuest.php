<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class EventGuest extends Model
{
    use SoftDeletes;

    public function eventModel()
    {
        return $this->belongsTo(EventModel::class);
    }

    public function eventGuestGroup()
    {
        return $this->belongsTo(EventGuestGroup::class);
    }
}
