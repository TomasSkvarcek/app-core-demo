<?php

namespace App\Console\Commands\Core;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Artisan;

class AppInstall extends Command
{
    protected $signature = 'app:install';

    protected $description = 'Install App';

    public function handle(): void
    {
        Artisan::call('migrate:fresh');

        Artisan::call('db:seed --class=AppInstallSeeder');
    }
}
