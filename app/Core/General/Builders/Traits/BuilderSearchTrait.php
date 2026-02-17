<?php

namespace App\Core\General\Builders\Traits;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\DB;

trait BuilderSearchTrait
{
    public function search(string $field, mixed $value): self
    {
        return $this->when($value, function (Builder $query) use ($field, $value) {
            $query->where($field, $value);
        });
    }

    public function searchLike(string $field, mixed $value): self
    {
        return $this->when($value, function (Builder $query) use ($field, $value) {
            $query->where(DB::raw("lower($field)"), 'like', '%'.mb_strtolower($value).'%');
        });
    }

    public function searchIn(string $field, mixed $value): self
    {
        return $this->when($value, function (Builder $query) use ($field, $value) {
            $query->whereIn($field, $value);
        });
    }

    public function searchDate(string $field, mixed $date): self
    {
        return $this->when($date, function (Builder $query) use ($field, $date) {
            $query->whereDate($field, $date);
        });
    }

    public function searchDateAfter(string $field, mixed $date): self
    {
        return $this->when($date, function (Builder $query) use ($field, $date) {
            $query->whereDate($field, '>=', $date);
        });
    }

    public function searchDateBefore(string $field, mixed $date): self
    {
        return $this->when($date, function (Builder $query) use ($field, $date) {
            $query->whereDate($field, '<=',$date);
        });
    }

    public function searchDateBetween(string $field, mixed $date_from, mixed $date_to): self
    {
        return $this->searchDateAfter($field, $date_from)->searchDateBefore($field, $date_to);
    }

    public function searchRelation(string $field, string $relation, mixed $value): self
    {
        return $this->when($value, function (Builder $query) use ($field, $relation, $value) {
            $query->whereHas($relation, function (Builder $query2) use ($field, $value) {
                $query2->where($field, $value);
            });
        });
    }

    public function searchRelationLike(string $field, string $relation, mixed $value): self
    {
        return $this->when($value, function (Builder $query) use ($field, $relation, $value) {
            $query->whereHas($relation, function (Builder $query2) use ($field, $value) {
                $query2->where(DB::raw("lower($field)"), 'like', '%'.mb_strtolower($value).'%');
            });
        });
    }

    public function searchRelationIn(string $field, string $relation, mixed $value): self
    {
        return $this->when($value, function (Builder $query) use ($field, $relation, $value) {
            $query->whereHas($relation, function (Builder $query2) use ($field, $value) {
                $query2->whereIn($field, $value);
            });
        });
    }

    public function searchRelationDate(string $field, string $relation, mixed $date): self
    {
        return $this->when($date, function (Builder $query) use ($field, $relation, $date) {
            $query->whereHas($relation, function (Builder $query2) use ($field, $date) {
                $query2->whereDate($field, $date);
            });
        });
    }

    public function searchRelationDateAfter(string $field, string $relation, mixed $date): self
    {
        return $this->when($date, function (Builder $query) use ($field, $relation, $date) {
            $query->whereHas($relation, function (Builder $query2) use ($field, $date) {
                $query2->whereDate($field, '>=', $date);
            });
        });
    }

    public function searchRelationDateBefore(string $field, string $relation, mixed $date): self
    {
        return $this->when($date, function (Builder $query) use ($field, $relation, $date) {
            $query->whereHas($relation, function (Builder $query2) use ($field, $date) {
                $query2->whereDate($field, '<=', $date);
            });
        });
    }

    public function searchRelationDateBetween(string $field, string $relation, mixed $date_from, mixed $date_to): self
    {
        return $this->searchRelationDateAfter($field, $relation, $date_from)->searchRelationDateBefore($field, $relation, $date_to);
    }
}
