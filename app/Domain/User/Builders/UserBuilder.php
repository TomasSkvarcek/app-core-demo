<?php

namespace App\Domain\User\Builders;

use App\Core\AccessControl\Builders\Traits\UserAccessControlBuilderTrait;
use App\Core\General\Builders\Traits\BuilderSearchTrait;
use Illuminate\Database\Eloquent\Builder;

class UserBuilder extends Builder {
    use BuilderSearchTrait;
    use UserAccessControlBuilderTrait;

    public function whereEmail(string $email): self
    {
        return $this->where('email', $email);
    }
}
