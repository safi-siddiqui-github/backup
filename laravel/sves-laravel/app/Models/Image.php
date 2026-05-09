<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Storage;

class Image extends Model
{
    use SoftDeletes;

    protected function imageUrl(): Attribute
    {
        return Attribute::make(get: fn() => $this->path ? Storage::url($this->path) : null);
    }

    public function color(): HasOne
    {
        return $this->hasOne(Color::class, 'id', 'color_id');
    }
}
