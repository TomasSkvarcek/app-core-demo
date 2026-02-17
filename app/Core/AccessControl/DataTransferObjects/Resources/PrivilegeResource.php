<?php

namespace App\Core\AccessControl\DataTransferObjects\Resources;

use Spatie\LaravelData\Data;

class PrivilegeResource extends Data
{
    public function __construct(
        public int $id,
        public string $code,
    ) {
    }
}
