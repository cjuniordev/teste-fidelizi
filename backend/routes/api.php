<?php

use App\Http\Controllers\ClientController;
use App\Http\Controllers\OfferController;
use Illuminate\Http\Request;
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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/offers/{slug}/{id}', [OfferController::class, 'show']);
Route::post('/clients/getOffer/{cpf}', [ClientController::class, 'activateOffer']);
Route::post('/clients', [ClientController::class, 'store']);
