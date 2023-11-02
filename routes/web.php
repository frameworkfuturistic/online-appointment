<?php

use App\Http\Controllers\AppointmentController;
use App\Http\Controllers\WebPagesController;
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

// Route::get('/', function () {
//     return view('index');
// });

// Route::inertia('/book-appointment', 'BookAppointment');

Route::controller(AppointmentController::class)->group(function () {
    Route::get('/{hospitalId}', 'bookAppointmentView');
    Route::post('/book-appointment', 'bookAppointment');
});
