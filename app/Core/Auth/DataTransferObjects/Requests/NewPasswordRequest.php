<?php

namespace App\Core\Auth\DataTransferObjects\Requests;

use App\Config\Enums\PasswordPolicy;
use Illuminate\Validation\Validator;
use Spatie\LaravelData\Data;

class NewPasswordRequest extends Data
{
    public function __construct(
        public string $token,
        public string $id,
        public string $password
    ) {
    }

    public static function rules(): array
    {
        return [
            'token' => ['nullable'],
            'id' => ['nullable'],
            'password' => [
                ...PasswordPolicy::PASSWORD_POLICY_RULES,
                'required',
                'confirmed'
            ],
            'password_confirmation' => ['required']
        ];
    }

    public static function messages(): array
    {
        return [
            'password.regex' => __('passwords.password_policy')
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
