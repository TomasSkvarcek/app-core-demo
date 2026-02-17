<?php

namespace App\Domain\User\DataTransferObjects\Resources;

use Spatie\LaravelData\Data;

class UserBasicResource extends Data
{
    public string $name;

    public function __construct(
        public int $id,
        public string $first_name,
        public string $last_name,
        public string $email
    ) {
        $this->name = $this->first_name.' '.$this->last_name;
    }
}
