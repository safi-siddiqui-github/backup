<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RsvpFormBuilder extends Model
{
    public function rsvpFormBuilderOptions()
    {
        return $this->hasMany(RsvpFormBuilderOption::class);
    }
}
