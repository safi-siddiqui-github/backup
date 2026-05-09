<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Support\Facades\Date;

class Order extends Model
{
    use SoftDeletes;

    public function orderItems(): HasMany
    {
        return $this->hasMany(OrderItem::class, 'order_id', 'id');
    }

    protected function datePlaced(): Attribute
    {
        // return Attribute::make(get: fn() => Date::createFromDate($this->created_at)->format('F j, Y, g:i a'));
        return Attribute::make(
            get: fn() => Date::createFromDate($this->created_at)->format('F j, Y')
        );
    }

    protected function deliveryDate(): Attribute
    {
        return Attribute::make(
            get: fn() => Date::createFromDate($this->updated_at)->format('d F, Y')
        );
    }
}
