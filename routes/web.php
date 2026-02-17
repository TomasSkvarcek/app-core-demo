<?php

use App\Http\Controllers\Core\Auth\LoginController;
use App\Http\Controllers\Core\Auth\LogoutController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

if (config('auth.allow_session_auth')) {
    Route::post('/login', LoginController::class);
    Route::post('/logout', LogoutController::class);
}

Route::view('/{any?}', 'app')->where('any', '.*');
