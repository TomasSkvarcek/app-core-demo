<?php

namespace App\Core\AccessControl\DataTransferObjects\Requests;

use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Spatie\LaravelData\Data;

class RoleRequest extends Data
{
    public function __construct(
        public ?int $id,
        public string $name,
        public ?array $privilege_ids
    ) {
    }

    public static function rules(Request $request): array
    {
        return [
            'name' => ['required', 'max:50', Rule::unique('roles', 'name')->ignore($request->id)],
            'privilege_ids' => ['nullable', 'array']
        ];
    }
}
