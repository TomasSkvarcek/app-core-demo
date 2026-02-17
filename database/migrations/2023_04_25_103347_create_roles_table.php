<?php

use App\Models\Role;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create((new Role())->getTable(), function (Blueprint $table) {
            $table->id();
            $table->string('name', 50)->unique();
            $table->string('system_code', 50)->unique()->nullable();
            $table->char('admin_role', 1)->default('f');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists((new Role())->getTable());
    }
};
