<?php

namespace App\Core\AccessControl\Builders\Traits;

use App\Core\General\Enums\BooleanDBEnum;
use App\Models\Privilege;
use App\Models\Role;
use App\Models\RolePrivilege;
use App\Models\User;
use App\Models\UserRole;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;

trait UserAccessControlBuilderTrait
{
    public function whereTokenNotExpired(int $token_validity_minutes): self
    {
        return $this->whereRaw("TIMESTAMPADD(MINUTE, ?, reset_token_created_at) > ?", [
            $token_validity_minutes,
            Carbon::now()
        ]);
    }

    public function whereActive(): self
    {
        return $this->where('active', BooleanDBEnum::TRUE);
    }

    public function whereHasPrivilege(string $privilege): self
    {
        return $this->whereHas('roles', function(Builder $q) use ($privilege) {
            $q->whereHas('privileges', function(Builder $q) use ($privilege) {
                $q->where('code', $privilege);
            });
        });
    }

    public function whereHasSystemRole(string $role_system_code): self
    {
        return $this->whereHas('roles', function(Builder $q) use ($role_system_code) {
            $q->where('system_code', $role_system_code);
        });
    }

    public function isAllowed(string $privilege): bool
    {
        $users_table = (new User())->getTable();
        $roles_table = (new Role())->getTable();
        $user_role_table = (new UserRole())->getTable();
        $privileges_table = (new Privilege())->getTable();
        $role_privilege_table = (new RolePrivilege())->getTable();

        $has_privilege = $this->select($privileges_table . '.id')
            ->join($user_role_table, $users_table . '.id', '=', $user_role_table . '.user_id')
            ->join($roles_table, $user_role_table . '.role_id', '=', $roles_table . '.id')
            ->join($role_privilege_table, $roles_table . '.id', '=', $role_privilege_table . '.role_id')
            ->join($privileges_table, $role_privilege_table . '.privilege_id', '=', $privileges_table . '.id')
            ->where($users_table . '.id', $this->model->id)
            ->where($privileges_table . '.code', $privilege)
            ->value($privileges_table . '.id');

        if ($has_privilege) {
            return true;
        }

        return false;
    }

    public function getPrivileges(int $user_id)
    {
        $users_table = (new User())->getTable();
        $roles_table = (new Role())->getTable();
        $user_role_table = (new UserRole())->getTable();
        $privileges_table = (new Privilege())->getTable();
        $role_privilege_table = (new RolePrivilege())->getTable();

        return $this->select([$privileges_table . '.code', $privileges_table . '.rules'])
        ->join($user_role_table, $users_table . '.id', '=', $user_role_table . '.user_id')
        ->join($roles_table, $user_role_table . '.role_id', '=', $roles_table . '.id')
        ->join($role_privilege_table, $roles_table . '.id', '=', $role_privilege_table . '.role_id')
        ->join($privileges_table, $role_privilege_table . '.privilege_id', '=', $privileges_table . '.id')
        ->where($users_table . '.id', $user_id)
        ->pluck($privileges_table . '.rules', $privileges_table . '.code')
        ->map(function ($rules) {
            return $rules ? json_decode($rules, true) : null;
        });
    }
}
