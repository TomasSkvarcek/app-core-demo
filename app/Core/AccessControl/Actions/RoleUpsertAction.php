<?php

namespace App\Core\AccessControl\Actions;

use App\Core\AccessControl\DataTransferObjects\Requests\RoleRequest;
use App\Models\Role;

class RoleUpsertAction
{
    public static function execute(RoleRequest $data): Role
    {
        $role = Role::query()->updateOrCreate(
            [
                'id' => $data->id
            ],
            $data->all()
        );

        $role->privileges()->sync($data->privilege_ids);

        return $role->fresh();
    }
}
