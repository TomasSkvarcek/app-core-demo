<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RolePrivilege extends Model
{
    use HasFactory;

    protected $table = 'role_privilege';

    protected $fillable = [
        'role_id',
        'privilege_id'
    ];
}
