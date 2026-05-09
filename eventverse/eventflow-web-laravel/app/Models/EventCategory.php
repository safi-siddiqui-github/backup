<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class EventCategory extends Model
{
    use SoftDeletes;

    public function subCategories()
    {
        return $this->hasMany($this, 'parent_id', 'id');
    }
}
