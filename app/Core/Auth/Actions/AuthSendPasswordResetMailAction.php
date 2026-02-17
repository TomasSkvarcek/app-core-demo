<?php

namespace App\Core\Auth\Actions;

use App\Core\General\Services\TokenService;
use App\Domain\User\DataTransferObjects\Requests\UserEmailRequest;
use App\Domain\User\Mails\UserPasswordResetMail;
use App\Models\User;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;

class AuthSendPasswordResetMailAction
{
    public static function execute(UserEmailRequest $data): User
    {
        $password_reset_token = TokenService::generateToken();
        $hashed_email = TokenService::encrypt($data->email);
        $user = User::query()->whereEmail($data->email)->first();

        User::query()->whereEmail($user->email)->update([
            'password_reset_token' => Hash::make($password_reset_token),
            'reset_token_created_at' => Carbon::now()
        ]);

        Mail::to($user->email)->send(new UserPasswordResetMail($user, $password_reset_token, $hashed_email));

        return $user->fresh();
    }
}
