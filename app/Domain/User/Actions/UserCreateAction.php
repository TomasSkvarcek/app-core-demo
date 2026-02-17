<?php

namespace App\Domain\User\Actions;

use App\Core\General\Enums\BooleanDBEnum;
use App\Core\General\Services\TokenService;
use App\Domain\User\DataTransferObjects\Requests\UserRequest;
use App\Domain\User\Mails\UserPasswordSetupMail;
use App\Models\User;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;

class UserCreateAction
{
    public static function execute(UserRequest $data): User
    {
        $password_reset_token = TokenService::generateToken();
        $hashed_email = TokenService::encrypt($data->email);
        $user = User::query()->create([
            ...$data->all(),
            'password_reset_token' => Hash::make($password_reset_token),
            'reset_token_created_at' => Carbon::now(),
            'active' => BooleanDBEnum::TRUE,
        ]);
        $user->roles()->sync($data->role_ids);

        Mail::to($user->email)->send(new UserPasswordSetupMail($user, $password_reset_token, $hashed_email));

        return $user;
    }
}
