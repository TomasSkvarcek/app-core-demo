<?php

namespace App\Config\Enums;

enum Privileges
{
    const USER_VIEW = 'user_view';
    const USER_CREATE = 'user_create';
    const USER_EDIT = 'user_edit';
    const USER_DELETE = 'user_delete';
    const ROLE_SETUP = 'role_setup';
}
