<?php

namespace App\Core\AccessControl\DataTransferObjects\Resources;

use App\Models\Role;
use Spatie\LaravelData\Attributes\DataCollectionOf;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\DataCollection;
use Spatie\LaravelData\Lazy;

class RoleResource extends Data
{
    public function __construct(
        public int $id,
        public string $name,
        public string $admin_role,
        #[DataCollectionOf(PrivilegeResource::class)]
        public Lazy|DataCollection $privileges
    ) {
    }

    public static function fromModel(Role $role): self
    {
        return new self(
            $role->id,
            $role->name,
            $role->admin_role,
            Lazy::whenLoaded('privileges', $role, fn() => PrivilegeResource::collect($role->privileges, DataCollection::class))
        );
    }
}
