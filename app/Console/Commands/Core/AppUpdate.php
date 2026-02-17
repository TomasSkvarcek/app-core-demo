<?php

namespace App\Console\Commands\Core;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Artisan;

class AppUpdate extends Command
{
    protected $signature = 'app:update';

    protected $description = 'Update App';

    public function handle(): void
    {
        Artisan::call('migrate');

        Artisan::call('db:seed --class=AppUpdateSeeder');
    }
}
