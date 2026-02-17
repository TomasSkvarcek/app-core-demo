<?php

namespace App\Domain\User\DataTransferObjects\Requests;

use App\Core\General\Enums\BooleanDBEnum;
use App\Rules\Core\CaseInsensitiveUnique;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Spatie\LaravelData\Data;

class UserRequest extends Data
{
    public function __construct(
        public ?int $id,
        public string $first_name,
        public string $last_name,
        public string $email,
        public ?string $active,
        public ?array $role_ids
    ) {
    }

    public static function rules(Request $request): array
    {
        $user = $request->user;
        $rules = [
            'email' => ['required', 'email', 'max:100', new CaseInsensitiveUnique('users', 'email', __('user.error_email_unique'), $user?->id)],
            'first_name' => ['required', 'max:100'],
            'last_name' => ['required', 'max:100'],
            'role_ids' => ['nullable', 'array']
        ];

        if ($user) {
            $rules['active'] = ['required', Rule::in([BooleanDBEnum::TRUE, BooleanDBEnum::FALSE])];
        }
        return $rules;
    }
}
