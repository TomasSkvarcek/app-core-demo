<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Domain\User\Builders\UserBuilder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Foundation\Auth\User as Authenticable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'password_reset_token',
        'reset_token_created_at',
        'password',
        'active'
    ];

    protected $hidden = [
        'password',
    ];

    protected $casts = [
        'reset_token_created_at' => 'datetime'
    ];

    public function newEloquentBuilder($query): UserBuilder
    {
        return new UserBuilder($query);
    }

    public static function query(): UserBuilder
    {
        return (new static)->newQuery();
    }

    public function roles(): BelongsToMany
    {
        return $this->belongsToMany(Role::class, (new UserRole())->getTable())->withTimestamps();
    }

    public function getFullNameAttribute(): string
    {
        return $this->first_name . ' ' . $this->last_name;
    }
}
