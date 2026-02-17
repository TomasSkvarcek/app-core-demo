<?php

namespace App\Core\General\DataTransferObjects\Resources;

use Spatie\LaravelData\Data;

class FileResource extends Data
{
    public function __construct(
        public string $path,
        public string $name
    ) {
    }
}
