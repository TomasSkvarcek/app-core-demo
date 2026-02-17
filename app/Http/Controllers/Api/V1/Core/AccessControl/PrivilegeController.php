<?php

namespace App\Http\Controllers\Api\V1\Core\AccessControl;

use App\Core\AccessControl\DataTransferObjects\Resources\PrivilegeResource;
use App\Http\Controllers\Controller;
use App\Models\Privilege;
use Spatie\LaravelData\DataCollection;

class PrivilegeController extends Controller
{
    public function index(): DataCollection
    {
        return PrivilegeResource::collect(Privilege::query()->get(), DataCollection::class);
    }
}
