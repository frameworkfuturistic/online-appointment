<?php

use App\Http\Controllers\AppointmentController;
use App\Http\Controllers\Auth\UserController;
use App\Http\Controllers\MasterController;
use App\Http\Controllers\PaymentController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
| Author-Anshu Kumar
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


Route::group(['middleware' => ['api.key']], function () {
    /**
     * | Controller - 01
     */
    Route::controller(MasterController::class)->group(function () {
        Route::post('master/v1/get-dept-by-hospid', 'getDepartsByHospitalId');  // 01
        Route::post('master/v1/get-doctors-by-hospdept', 'getConsultantsByHospDeptId');  // 02
        Route::post('master/v1/get-shifts-by-hospconsultant', 'getShiftsByHospDoctorId');  // 03
        Route::post('master/v1/get-city-by-stateid', 'readCitiesByStates'); // 04
    });

    /**
     * | Controller - 02
     */
    Route::controller(AppointmentController::class)->group(function () {
        Route::post('aptms/v1/book-appointments', 'bookAppointmentV2');  // 02
    });

    /**
     * | Controller - 03
     */
    Route::controller(PaymentController::class)->group(function () {
        Route::post('payment/v1/order', 'makeOrder');       // 01
        Route::post('payment/v1/callback', 'callback');
    });

    /**
     * | Controller - 04
     */
    Route::controller(UserController::class)->group(function(){
        Route::post('register', 'createUser'); // 01
        Route::post('login', 'loginAuth'); // 02
        Route::post('logout', 'logout')->middleware('auth:sanctum'); //03
    });
});
