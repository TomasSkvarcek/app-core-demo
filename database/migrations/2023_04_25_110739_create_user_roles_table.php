<?php

use App\Models\Role;
use App\Models\User;
use App\Models\UserRole;
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
        Schema::create((new UserRole())->getTable(), function (Blueprint $table) {
            $table->id();
            $table->foreignId('role_id')->constrained((new Role())->getTable());
            $table->foreignId('user_id')->constrained((new User())->getTable());
            $table->unique(['role_id', 'user_id']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists((new UserRole())->getTable());
    }
};
