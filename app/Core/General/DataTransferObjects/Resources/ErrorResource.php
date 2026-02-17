<?php

namespace App\Core\General\DataTransferObjects\Resources;

use Spatie\LaravelData\Data;

class ErrorResource extends Data
{
    public function __construct(
        public string $error
    ) {
    }
}
