<?php

namespace App\Core\Auth\Actions;

use App\Core\Auth\DataTransferObjects\Requests\ChangePasswordRequest;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthPasswordChangeAction
{
    public static function execute(ChangePasswordRequest $data): User
    {
        $user = Auth::user();
        $user->password = Hash::make($data->new_password);
        $user->save();

        return $user->fresh();
    }
}
