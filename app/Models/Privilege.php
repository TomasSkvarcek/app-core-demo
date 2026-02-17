<?php

namespace App\Models;

use App\Core\AccessControl\Casts\PrivilegeRulesCast;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Privilege extends Model
{
    use HasFactory;

    protected $table = 'privileges';
    protected $fillable = ['code', 'rules'];

    protected $casts = [
        'rules' => PrivilegeRulesCast::class
    ];

    public function roles(): BelongsToMany
    {
        return $this->belongsToMany(Role::class, (new UserRole())->getTable())->withTimestamps();
    }
}
