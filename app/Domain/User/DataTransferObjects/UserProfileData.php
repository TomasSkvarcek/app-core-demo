<?php

namespace App\Domain\User\DataTransferObjects;

use Spatie\LaravelData\Data;

class UserProfileData extends Data
{
    public function __construct(
        public int $id,
        public string $first_name,
        public string $last_name,
        public string $email,
    ) {
    }
}
