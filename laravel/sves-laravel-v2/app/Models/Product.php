<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;

class Product extends Model
{
    use SoftDeletes;

    public function image(): HasOne
    {
        return $this->hasOne(Image::class, 'product_id', 'id')->where('order', 1);
    }

    public function images(): HasMany
    {
        return $this->hasMany(Image::class, 'product_id', 'id');
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class, 'sub_category_id', 'id');
    }

    public function reviews(): HasMany
    {
        return $this->hasMany(Review::class, 'product_id', 'id');
    }

    protected function avgRating(): Attribute
    {
        return Attribute::make(get: fn() => round($this->reviews->avg('rating')));
    }

}
