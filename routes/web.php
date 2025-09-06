<?php

use App\Http\Controllers\RoleController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/token', function () {
    return csrf_token();
});

Route::get('/api/roles', [RoleController::class, 'index']);

Route::get('/api/users/by-role/{roleName}', [UserController::class, 'getUsersByRole']);
Route::post('/api/users', [UserController::class, 'store']);
