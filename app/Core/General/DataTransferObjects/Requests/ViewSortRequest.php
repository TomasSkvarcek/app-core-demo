<?php

namespace App\Core\General\DataTransferObjects\Requests;

use Illuminate\Validation\Rule;
use Spatie\LaravelData\Data;

class ViewSortRequest extends Data
{
    public function __construct(
        public string $column,
        public string $order
    ) {
    }

    public static function rules(): array
    {
        return [
            'column' => ['required', 'string'],
            'order' => ['required', 'string', Rule::in(['asc', 'desc'])]
        ];
    }
}
