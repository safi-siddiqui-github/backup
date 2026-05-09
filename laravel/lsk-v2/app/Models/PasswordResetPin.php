<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PasswordResetPin extends Model
{
    public function user()
    {
        return $this->belongsTo(
            $related = User::class,
            $foreignKey = 'email',
            $ownerKey = 'email',
            $relation = null
        );
    }
}
