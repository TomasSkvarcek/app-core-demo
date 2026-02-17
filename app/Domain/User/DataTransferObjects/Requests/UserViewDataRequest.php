<?php

namespace App\Domain\User\DataTransferObjects\Requests;

use App\Core\General\Enums\BooleanDBEnum;
use Illuminate\Support\Carbon;
use Illuminate\Support\Collection;
use Illuminate\Validation\Rule;
use Spatie\LaravelData\Data;

class UserViewDataRequest extends Data
{
    public function __construct(
        public ?string $first_name,
        public ?string $last_name,
        public ?string $email,
        public ?string $active,
        public ?Carbon $created_at,
        public ?array $role_ids
    ) {}

    public static function fromCollection(Collection $data): self
    {
        return self::validateAndCreate([
            ...$data->all(),
            'created_at' => isset($data['created_at']) ? Carbon::parse($data['created_at']) : null
        ]);
    }

    public static function rules(): array
    {
        return [
            'active' => ['nullable', Rule::in([BooleanDBEnum::TRUE, BooleanDBEnum::FALSE])]
        ];
    }
}
