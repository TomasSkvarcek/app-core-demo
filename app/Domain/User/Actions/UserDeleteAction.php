<?php

namespace App\Domain\User\Actions;

use App\Core\Exceptions\ProcessException;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class UserDeleteAction
{
    /**
     * @throws ProcessException
     */
    public static function execute(User $user): void
    {
        if (Auth::user()->id === $user->id) {
            throw new ProcessException(__('user.error_delete_logged_in_user'));
        }
        $user->roles()->detach();
        $user->delete();
    }
}
