<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class EventFaq extends Model
{
    use SoftDeletes;

    public function eventModel()
    {
        return $this->belongsTo(EventModel::class);
    }

    public function eventFaqCategory()
    {
        return $this->belongsTo(EventFaqCategory::class);
    }
}
