<?php

namespace App\Enums;

class ToastBarEnum
{
    public const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
    public const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
    public const BOOKING_SUCCESS = 'BOOKING_SUCCESS';
    public const BOOKING_UPDATED = 'BOOKING_UPDATED';

    /**
     * Get all available notification types.
     */
    public static function all(): array
    {
        return [
            self::LOGIN_SUCCESS,
            self::LOGOUT_SUCCESS,
            self::BOOKING_SUCCESS,
            self::BOOKING_UPDATED,
        ];
    }
}
