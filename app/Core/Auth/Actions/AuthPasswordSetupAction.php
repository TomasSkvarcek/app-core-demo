<?php

namespace App\Core\Auth\Actions;

use App\Core\Auth\DataTransferObjects\Requests\NewPasswordRequest;
use App\Core\Auth\Enums\AuthTokenType;
use App\Core\Auth\Services\AuthTokenService;
use App\Core\Exceptions\ProcessException;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AuthPasswordSetupAction
{
    /**
     * @throws ProcessException
     */
    public static function execute(NewPasswordRequest $data): User
    {
        $user = AuthValidateTokenAction::execute($data->id, $data->token, AuthTokenService::getAuthTokenExpirationMinutes(AuthTokenType::PASSWORD_CREATE));
        User::query()->where('id', $user->id)->update([
            'password' => Hash::make($data->password),
            'password_reset_token' => null,
            'reset_token_created_at' => null
        ]);

        return $user->fresh();
    }
}
