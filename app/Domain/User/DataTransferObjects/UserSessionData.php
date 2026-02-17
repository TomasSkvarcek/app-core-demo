<?php

namespace App\Domain\User\DataTransferObjects;

use Illuminate\Support\Collection;
use Spatie\LaravelData\Data;

class UserSessionData extends Data
{
    public function __construct(
        public UserProfileData $user,
        public Collection $privileges,
    ) {
    }
}
