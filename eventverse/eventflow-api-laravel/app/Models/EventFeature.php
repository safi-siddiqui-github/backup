<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class EventFeature extends Model
{
    use SoftDeletes;

    public function eventFeatureCategory()
    {
        return $this->belongsTo(EventFeatureCategory::class);
    }

    public function eventModel()
    {
        return $this->belongsTo(EventModel::class);
    }
}
