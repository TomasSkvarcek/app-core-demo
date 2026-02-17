<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Role extends Model
{
    use HasFactory;

    protected $table = 'roles';
    protected $fillable = [
        'name',
        'system_code',
        'admin_role'
    ];

    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class, (new UserRole())->getTable())->withTimestamps();
    }

    public function privileges(): BelongsToMany
    {
        return $this->belongsToMany(Privilege::class, (new RolePrivilege())->getTable())->withTimestamps();
    }
}
