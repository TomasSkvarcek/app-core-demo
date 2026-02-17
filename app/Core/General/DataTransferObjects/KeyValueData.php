<?php

namespace App\Core\General\DataTransferObjects;

use Spatie\LaravelData\Data;

class KeyValueData extends Data
{
    public function __construct(
        public string|int $key,
        public mixed $value
    ) {
    }
}
