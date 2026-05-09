<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class EventFeatureCategory extends Model
{
    use SoftDeletes;

    public function eventFeatureSubCategories()
    {
        return $this->hasMany(EventFeatureCategory::class, 'parent_id');
    }
}
