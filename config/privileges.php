<?php

use App\Config\Enums\Privileges;

return [
    'list' => [
        Privileges::USER_VIEW => null,
        Privileges::USER_CREATE => null,
        Privileges::USER_EDIT => null,
        Privileges::USER_DELETE => null,
        Privileges::ROLE_SETUP => null,
        'test' => [
            'group1' => [
                [
                    'authenticable_field' => 'id',
                    'context_field' => 'user_id'
                ],
                [
                    'authenticable_field' => 'role_id',
                    'context_field' => 'role_id'
                ]
            ],
            'group2' => [
                [
                    'authenticable_field' => 'id',
                    'context_field' => 'user_id'
                ]
            ],
        ],
    ]
];
