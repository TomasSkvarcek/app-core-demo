<?php

namespace App\Http\Controllers\Api\V1\User;

use App\Config\Enums\Privileges;
use App\Core\Exceptions\ProcessException;
use App\Domain\User\Actions\UserCreateAction;
use App\Domain\User\Actions\UserDeleteAction;
use App\Domain\User\Actions\UserUpdateAction;
use App\Domain\User\DataProviders\UserDataProvider;
use App\Domain\User\DataProviders\UserSessionDataProvider;
use App\Domain\User\DataTransferObjects\Requests\UserRequest;
use App\Domain\User\DataTransferObjects\Requests\UserViewDataRequest;
use App\Domain\User\DataTransferObjects\Resources\UserResource;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;

class UserController extends Controller
{
    public function view(Request $request): JsonResponse
    {
        Gate::authorize(Privileges::USER_VIEW);

        return response()->json(
            UserDataProvider::get(UserViewDataRequest::fromCollection($request->collect('search'))),
            Response::HTTP_OK
        );
    }

    public function create(UserRequest $data): JsonResponse
    {
        Gate::authorize(Privileges::USER_CREATE);

        $user = UserCreateAction::execute($data)->load('roles');

        return response()->json(UserResource::from($user), Response::HTTP_CREATED);
    }

    public function get(User $user): UserResource
    {
        Gate::authorize(Privileges::USER_EDIT);

        $user->load('roles');

        return UserResource::from($user);
    }

    public function update(UserRequest $data, User $user): JsonResponse
    {
        Gate::authorize(Privileges::USER_EDIT);

        $user = UserUpdateAction::execute($data, $user)->load('roles');

        return response()->json(UserResource::from($user), Response::HTTP_OK);
    }

    /**
     * @throws ProcessException
     */
    public function delete(User $user): Response
    {
        Gate::authorize(Privileges::USER_DELETE);

        UserDeleteAction::execute($user);

        return response()->noContent();
    }

    public function getLoggedInUserSessionData(): Response|JsonResponse
    {
        if (!Auth::check()) {
            return response()->noContent();
        }
        return response()->json(UserSessionDataProvider::get(Auth::user()->id), Response::HTTP_OK);
    }
}
