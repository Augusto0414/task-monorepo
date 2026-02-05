<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\BroadcastAuthController;
use App\Http\Controllers\Api\TaskController;
use App\Http\Middleware\JwtMiddleware;

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

// Rutas de Autenticación (sin requerir token)
Route::prefix('v1')->group(function () {
    // Autenticación
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);

    // Rutas protegidas (requieren JWT token)
    Route::middleware(JwtMiddleware::class)->group(function () {
        // Autenticación
        Route::post('/logout', [AuthController::class, 'logout']);

        // Tareas
        Route::get('/tasks', [TaskController::class, 'index']);
        Route::post('/tasks', [TaskController::class, 'store']);
        Route::get('/tasks/{id}', [TaskController::class, 'show']);
        Route::put('/tasks/{id}', [TaskController::class, 'update']);
        Route::delete('/tasks/{id}', [TaskController::class, 'destroy']);
    });
});

Route::middleware(JwtMiddleware::class)->post('/broadcasting/auth', [BroadcastAuthController::class, 'authenticate']);
