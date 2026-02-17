<?php

use App\Http\Controllers\Api\V1\Core\AccessControl\PrivilegeController;
use App\Http\Controllers\Api\V1\Core\AccessControl\RoleController;
use App\Http\Controllers\Api\V1\Core\Auth\PasswordController;
use App\Http\Controllers\Api\V1\User\UserController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::prefix('auth')->name('auth.')->group(function () {
    Route::post('/validate_token', [PasswordController::class, 'validateToken'])->name('validate_token');
    Route::post('/create_password', [PasswordController::class, 'createPassword'])->name('create_password');
    Route::post('/reset_password', [PasswordController::class, 'resetPassword'])->name('reset_password');
    Route::post('/forgot_password', [PasswordController::class, 'handleForgotPassword'])->name('forgot_password');
});

Route::group(['middleware' => 'auth:sanctum'], function () {
    Route::prefix('auth')->name('auth.')->group(function () {
        Route::post('/change_password', [PasswordController::class, 'changePassword'])->name('change_password');
    });

    Route::get('user_session_data', [UserController::class, 'getLoggedInUserSessionData'])->name('user_session_data');

    Route::prefix('users')->name('users.')->group(function () {
        Route::get('/get/{user}', [UserController::class, 'get'])->name('get');
        Route::post('/create', [UserController::class, 'create'])->name('create');
        Route::put('/update/{user}', [UserController::class, 'update'])->name('update');
        Route::delete('/delete/{user}', [UserController::class, 'delete'])->name('delete');
        Route::post('/view', [UserController::class, 'view'])->name('view');
    });

    Route::prefix('roles')->name('roles.')->group(function () {
        Route::get('', [RoleController::class, 'index'])->name('index');
        Route::get('/get/{role}', [RoleController::class, 'get'])->name('get');
        Route::post('/create', [RoleController::class, 'create'])->name('create');
        Route::put('/update/{role}', [RoleController::class, 'update'])->name('update');
        Route::delete('/delete/{role}', [RoleController::class, 'delete'])->name('delete');
        Route::get('/view', [RoleController::class, 'view'])->name('view');
    });

    Route::prefix('privileges')->name('privileges.')->group(function () {
        Route::get('', [PrivilegeController::class, 'index'])->name('index');
    });
});
