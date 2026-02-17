<?php

namespace App\Core\AccessControl\Casts;

use App\Core\AccessControl\ValueObjects\PrivilegeRule;
use Illuminate\Contracts\Database\Eloquent\CastsAttributes;
use Illuminate\Database\Eloquent\Model;

class PrivilegeRulesCast implements CastsAttributes
{
    public function get(Model $model, string $key, mixed $value, array $attributes): array|null
    {
        if (empty($value)) {
            return null;
        }

        $rules_array = json_decode($value, true);
        $rules = [];
        foreach ($rules_array as $key => $group) {
            foreach ($group as $rule) {
                $rules[$key][] = PrivilegeRule::from($rule);
            }

        }

        return $rules;
    }

    public function set(Model $model, string $key, mixed $value, array $attributes): array
    {
        return [
            'rules' => $value ? json_encode($value) : null,
        ];
    }
}
