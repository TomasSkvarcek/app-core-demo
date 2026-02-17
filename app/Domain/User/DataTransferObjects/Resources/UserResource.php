<?php

namespace App\Domain\User\DataTransferObjects\Resources;

use App\Core\AccessControl\DataTransferObjects\Resources\RoleResource;
use App\Models\User;
use Spatie\LaravelData\Attributes\DataCollectionOf;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\DataCollection;
use Spatie\LaravelData\Lazy;

class UserResource extends Data
{
    public function __construct(
        public int $id,
        public string $first_name,
        public string $last_name,
        public string $email,
        public string $active,
        public string $created_at,
        #[DataCollectionOf(RoleResource::class)]
        public Lazy|DataCollection $roles
    ) {
    }

    public static function fromModel(User $user): self
    {
        return self::from([
            ...$user->toArray(),
            'roles' => Lazy::whenLoaded('roles', $user, fn() => RoleResource::collect($user->roles, DataCollection::class))
        ]);
    }
}
