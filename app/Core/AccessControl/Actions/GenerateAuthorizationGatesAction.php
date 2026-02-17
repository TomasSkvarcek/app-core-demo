<?php

namespace App\Core\AccessControl\Actions;

use App\Models\Privilege;
use App\Models\User;
use Illuminate\Support\Facades\Gate;

class GenerateAuthorizationGatesAction
{
    public static function execute(): void
    {
        // try/catch to avoid first DB create error
        try {
            $privileges = Privilege::query()->select(['code', 'rules'])->get();
        } catch (\Exception $e) {
            $privileges = [];
        }

        foreach ($privileges as $privilege) {
            static::defineAuthorizationGates($privilege);
        }
    }

    /**
     * Override to define custom authorization gates
     */
    protected static function defineAuthorizationGates(Privilege $privilege): void
    {
        Gate::define($privilege->code, function (User $user, $context = null) use ($privilege) {
            if (!$user->isAllowed($privilege->code)) {
                return false;
            }

            if ($privilege->rules) {
                if (empty($context)) {
                    return false;
                }

                $group_condition_results = [];

                foreach ($privilege->rules as $key => $group_rules) {
                    $group_condition_results[$key] = true;
                    foreach ($group_rules as $condition) {
                        if ($user->{$condition->authenticable_field} !== $context->{$condition->context_field}) {
                            $group_condition_results[$key] = false;
                            break;
                        }
                    }
                }

                if (!in_array(true, $group_condition_results)) {
                    return false;
                }
            }

            return true;
        });
    }
}
