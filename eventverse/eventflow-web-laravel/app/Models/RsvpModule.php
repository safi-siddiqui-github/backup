<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class RsvpModule extends Model
{
    use SoftDeletes;

    public function eventModule()
    {
        return $this->belongsTo(EventModule::class);
    }

    public function rsvpFormBuilders()
    {
        return $this->hasMany(RsvpFormBuilder::class);
    }

    public function rsvpFormBuildersOrder()
    {
        return $this->hasMany(RsvpFormBuilder::class)->orderBy('order');
    }

    public function rsvpFormBuilderFoodsOrder()
    {
        return $this->hasMany(RsvpFormBuilderFood::class)->orderBy('order');
    }
}
