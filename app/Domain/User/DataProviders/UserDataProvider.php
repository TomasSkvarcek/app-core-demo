<?php

namespace App\Domain\User\DataProviders;

use App\Config\Enums\PaginationSettings;
use App\Domain\User\DataTransferObjects\Requests\UserViewDataRequest;
use App\Domain\User\DataTransferObjects\Resources\UserResource;
use App\Models\User;
use Spatie\LaravelData\PaginatedDataCollection;

class UserDataProvider
{
    public static function get(UserViewDataRequest $filter_data, int $per_page = PaginationSettings::PER_PAGE): PaginatedDataCollection
    {
        $data = User::query()->with('roles')
            ->searchLike('first_name', $filter_data->first_name)
            ->searchLike('last_name', $filter_data->last_name)
            ->searchLike('email', $filter_data->email)
            ->search('active', $filter_data->active)
            ->searchDate('created_at', $filter_data->created_at)
            ->searchRelationIn('role_id', 'roles', $filter_data->role_ids);

        return UserResource::collect($data->paginate($per_page), PaginatedDataCollection::class);
    }
}
