<?php

namespace Database\Seeders;

use App\Config\Enums\Privileges;
use App\Config\Enums\SystemRoles;
use App\Core\General\Enums\BooleanDBEnum;
use App\Models\Privilege;
use App\Models\Role;
use App\Models\RolePrivilege;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class RolePrivilegeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $roles = [
            [
                'name' => 'Administrator',
                'admin_role' => BooleanDBEnum::TRUE,
                'system_code' => SystemRoles::ADMIN,
                'created_at' =>  Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'name' => 'Normal user',
                'admin_role' => BooleanDBEnum::FALSE,
                'system_code' => SystemRoles::USER,
                'created_at' =>  Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
        ];

        foreach (config('privileges.list') as $privilege => $rules) {
            Privilege::query()->updateOrCreate(
                [
                    'code' => $privilege,
                ],
                [
                    'rules' => $rules
                ]
            );
        }

        Role::insertOrIgnore($roles);

        $inserted_roles = Role::all();
        $inserted_privileges = Privilege::pluck('code', 'id')->toArray();

        $user_privileges = [
            Privileges::USER_VIEW
        ];

        $role_privilege = [];

        foreach ($inserted_roles as $role) {
            if ($role->system_code === SystemRoles::ADMIN) {
                foreach ($inserted_privileges as $id => $name) {
                    $role_privilege[] = [
                        'role_id' => $role->id,
                        'privilege_id' => $id,
                        'created_at' =>  Carbon::now(),
                        'updated_at' => Carbon::now(),
                    ];
                }
            }

            if ($role->system_code === SystemRoles::USER) {
                foreach ($inserted_privileges as $id => $name) {
                    if (in_array($name, $user_privileges)) {
                        $role_privilege[] = [
                            'role_id' => $role->id,
                            'privilege_id' => $id,
                            'created_at' =>  Carbon::now(),
                            'updated_at' => Carbon::now(),
                        ];
                    }
                }
            }
        }

        RolePrivilege::insertOrIgnore($role_privilege);
    }
}
