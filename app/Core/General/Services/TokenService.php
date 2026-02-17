<?php

namespace App\Core\General\Services;

use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Str;

class TokenService
{
    public static function generateToken(): string
    {
        return Str::random(40);
    }

    public static function encrypt(string $value): string
    {
        return Crypt::encryptString($value);
    }

    public static function decrypt(string $value): string
    {
        return Crypt::decryptString($value);
    }
}
