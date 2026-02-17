<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class AppUpdateSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $this->call(RolePrivilegeSeeder::class);
    }
}
