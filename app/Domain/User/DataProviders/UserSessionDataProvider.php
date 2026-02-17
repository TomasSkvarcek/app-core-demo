<?php

namespace App\Domain\User\DataProviders;

use App\Domain\User\DataTransferObjects\UserProfileData;
use App\Domain\User\DataTransferObjects\UserSessionData;
use App\Models\User;

class UserSessionDataProvider
{
    public static function get(int $user_id): UserSessionData
    {
        $user_data = UserProfileData::from(User::query()->select('id', 'first_name', 'last_name', 'email')->find($user_id));
        $privileges = User::query()->getPrivileges($user_id);

        return new UserSessionData($user_data, $privileges);
    }
}
