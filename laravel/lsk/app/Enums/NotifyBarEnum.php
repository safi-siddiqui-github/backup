<?php

namespace App\Enums;

class NotifyBarEnum
{

    public const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
    public const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
    public const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
    public const VERIFICATION_SUCCESS = 'VERIFICATION_SUCCESS';
    public const PASSWORD_REQUEST = 'PASSWORD_REQUEST';
    public const PASSWORD_RESET = 'PASSWORD_RESET';

    /**
     * Get all available notification types.
     */
    public static function all(): array
    {
        return [
            self::LOGIN_SUCCESS,
            self::REGISTER_SUCCESS,
            self::LOGOUT_SUCCESS,
            self::VERIFICATION_SUCCESS,
            self::PASSWORD_REQUEST,
            self::PASSWORD_RESET,
        ];
    }
}
