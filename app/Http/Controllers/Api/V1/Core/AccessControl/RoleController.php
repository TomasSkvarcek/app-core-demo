<?php

namespace App\Http\Controllers\Api\V1\Core\AccessControl;

use App\Config\Enums\Privileges;
use App\Core\AccessControl\Actions\RoleDeleteAction;
use App\Core\AccessControl\Actions\RoleUpsertAction;
use App\Core\AccessControl\DataTransferObjects\Requests\RoleRequest;
use App\Core\AccessControl\DataTransferObjects\Resources\RoleResource;
use App\Http\Controllers\Controller;
use App\Models\Role;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Gate;
use Spatie\LaravelData\DataCollection;

class RoleController extends Controller
{
    public function index(): DataCollection
    {
        return RoleResource::collect(Role::query()->get(), DataCollection::class);
    }

    public function view(): DataCollection
    {
        Gate::authorize(Privileges::ROLE_SETUP);

        return RoleResource::collect(Role::query()->get(), DataCollection::class);
    }

    public function create(RoleRequest $data): JsonResponse
    {
        Gate::authorize(Privileges::ROLE_SETUP);

        $role = RoleUpsertAction::execute($data)->load('privileges');

        return response()->json(RoleResource::from($role), Response::HTTP_CREATED);
    }

    public function get(Role $role): RoleResource
    {
        Gate::authorize(Privileges::ROLE_SETUP);

        $role->load('privileges');

        return RoleResource::from($role);
    }

    public function update(RoleRequest $data): JsonResponse
    {
        Gate::authorize(Privileges::ROLE_SETUP);

        $role = RoleUpsertAction::execute($data)->load('privileges');

        return response()->json(RoleResource::from($role), Response::HTTP_OK);
    }

    public function delete(Role $role): Response
    {
        Gate::authorize(Privileges::ROLE_SETUP);

        RoleDeleteAction::execute($role);

        return response()->noContent();
    }
}
