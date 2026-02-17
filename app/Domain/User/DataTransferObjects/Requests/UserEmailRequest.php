<?php

namespace App\Domain\User\DataTransferObjects\Requests;

use Spatie\LaravelData\Data;

class UserEmailRequest extends Data
{
    public function __construct(
        public string $email
    ) {
    }

    public static function rules(): array
    {
        return [
            'email' => ['required', 'email', 'exists:users'],
        ];
    }
}
