<?php

namespace Database\Seeders;

use App\Core\General\Enums\BooleanDBEnum;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AppInstallSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // create base test user
        $user = User::query()->create([
            'email' => 'admin@admin.test',
            'first_name' => 'Main',
            'last_name' => 'Admin',
            'password' => Hash::make('app-core'),
            'active' => BooleanDBEnum::TRUE
        ]);

        $this->call(RolePrivilegeSeeder::class);

        $user->roles()->attach([1]);
    }
}
