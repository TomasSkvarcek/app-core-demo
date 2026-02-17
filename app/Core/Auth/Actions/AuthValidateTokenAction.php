<?php

namespace App\Core\Auth\Actions;

use App\Core\Exceptions\ProcessException;
use App\Core\General\Services\TokenService;
use App\Domain\User\Builders\UserBuilder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AuthValidateTokenAction
{
    /**
     * @throws ProcessException
     */
    public static function execute(string $hashed_email, string $token, ?int $token_expiration_minutes = null): User
    {
        $user = User::query()
            ->whereEmail(TokenService::decrypt($hashed_email))
            ->when($token_expiration_minutes, function (UserBuilder $query) use($token_expiration_minutes) {
                $query->whereTokenNotExpired($token_expiration_minutes);
            })
            ->first();
        if (!$user || !Hash::check($token, $user->password_reset_token)) {
            throw new ProcessException(__('passwords.token'));
        }

        return $user;
    }
}
