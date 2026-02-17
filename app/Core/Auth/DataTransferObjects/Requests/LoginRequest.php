<?php

namespace App\Core\Auth\DataTransferObjects\Requests;

use Spatie\LaravelData\Data;

class LoginRequest extends Data
{
    public function __construct(
        public string $email,
        public string $password
    ) {
    }

    public static function rules(): array
    {
        return [
            'email' => ['required', 'email'],
            'password' => ['required'],
        ];
    }
}
