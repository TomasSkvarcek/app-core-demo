<?php

namespace App\Core\AccessControl\ValueObjects;

use Spatie\LaravelData\Data;

class PrivilegeRule extends Data
{
    public function __construct(
        public string $authenticable_field,
        public string $context_field
    ) {
    }
}
