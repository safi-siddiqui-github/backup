<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class EventSpecialGuest extends Model
{
    use SoftDeletes;

    public function eventModel()
    {
        return $this->belongsTo(EventModel::class);
    }

    protected $casts = [
        'achievements' => 'array',
    ];
}
