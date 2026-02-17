<?php

namespace App\Core\Auth\DataTransferObjects\Requests;

use App\Config\Enums\PasswordPolicy;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Validator;
use Spatie\LaravelData\Data;

class ChangePasswordRequest extends Data
{
    public function __construct(
        public string $old_password,
        public string $new_password
    ) {
    }

    public static function rules(): array
    {
        return [
            'old_password' => ['required'],
            'new_password' => [
                ...PasswordPolicy::PASSWORD_POLICY_RULES,
                'required',
                'confirmed'
            ],
            'new_password_confirmation' => ['required']
        ];
    }

    public static function messages(): array
    {
        return [
            'new_password.regex' => __('passwords.password_policy')
        ];
    }

    public static function withValidator(Validator $validator): void
    {
        $validator->after(function (Validator $validator) {
            $user = Auth::user();
            if (isset($validator->safe()->old_password) && !Hash::check($validator->safe()->old_password, $user->password)) {
                $validator->errors()->add('old_password', __('passwords.password'));
            }
        });
    }
}
