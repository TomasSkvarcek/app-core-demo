<?php

namespace App\Domain\User\Actions;

use App\Core\General\Enums\BooleanDBEnum;
use App\Domain\User\DataTransferObjects\Requests\UserRequest;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class UserUpdateAction
{
    public static function execute(UserRequest $data, User $user): User
    {
        if (Auth::user()->id === $user->id) {
            $data->active = BooleanDBEnum::TRUE;
        }

        User::query()->where('id', $user->id)->update($data->except('roles', 'role_ids')->toArray());
        $user->roles()->sync($data->role_ids);

        return $user->fresh();
    }
}
