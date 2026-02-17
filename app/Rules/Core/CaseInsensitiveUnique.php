<?php

namespace App\Rules\Core;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Support\Facades\DB;

class CaseInsensitiveUnique implements ValidationRule
{
    protected string $table;
    protected string $column;
    protected ?string $message;
    protected ?int $ignore_id;

    public function __construct(string $table, string $column, ?string $message = null, ?int $ignore_id = null)
    {
        $this->table = $table;
        $this->column = $column;
        $this->message = $message;
        $this->ignore_id = $ignore_id;
    }

    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $query = DB::table($this->table)
            ->whereRaw('LOWER(' . $this->column . ') = ?', [strtolower($value)]);

        if ($this->ignore_id) {
            $query->where('id', '!=', $this->ignore_id);
        }

        if ($query->exists()) {
            $fail($this->message ?? 'validation.unique')->translate();
        }
    }
}
