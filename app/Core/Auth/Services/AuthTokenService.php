<?php

namespace App\Core\Auth\Services;

use App\Core\Auth\Enums\AuthTokenType;

class AuthTokenService
{
    public static function getAuthTokenExpirationMinutes(string $token_type): int|null
    {
        return match ($token_type) {
            AuthTokenType::PASSWORD_CREATE => config('auth.password_create_token_expire'),
            AuthTokenType::PASSWORD_RESET => config('auth.password_reset_token_expire')
        };
    }
}
