<?php

namespace App\Core\AccessControl\Actions;

use App\Models\Role;

class RoleDeleteAction
{
    public static function execute(Role $role): void
    {
        $role->privileges()->detach();
        $role->users()->detach();
        $role->delete();
    }
}
