<?php

namespace App\Core\Auth\DataTransferObjects\Requests;

use Illuminate\Validation\Validator;
use Spatie\LaravelData\Data;

class TokenValidationRequest extends Data
{
    public function __construct(
        public string $token_type,
        public string $token,
        public string $id
    ) {
    }

    public static function rules(): array
    {
        return [
            'token_type' => ['required'],
            'token' => ['nullable'],
            'id' => ['nullable'],
        ];
    }

    public static function withValidator(Validator $validator): void
    {
        $validator->after(function ($validator) {
            if (empty($validator->safe()->token) || empty($validator->safe()->id)) {
                $validator->errors()->add('token', __('passwords.token'));
            }
        });
    }

}
