<?php

namespace App\Rules\Core;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class TotalFileSize implements ValidationRule
{
    protected string $max_size;
    protected ?string $message;

    public function __construct(int $max_size_kb, ?string $message = null)
    {
        $this->max_size = $max_size_kb * 1024;
        $this->message = $message;
    }

    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $total_size = array_reduce($value, function ($carry, $file) {
            return $carry + $file->getSize();
        }, 0);


        if ($total_size > $this->max_size) {
            $fail(__($this->message ?? 'validation.max_total_file_size', ['max_size' => ($this->max_size / (1024 * 1024))]));
        }
    }
}
