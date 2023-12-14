<?php

namespace App\Http\Controllers;

use App\Models\Appointment\GenAppointment;
use App\Models\GenParam;
use App\Models\Masters\GenCity;
use App\Models\Masters\GenConsultant;
use App\Models\Masters\GenConsultantShift;
use App\Models\Masters\GenDepartment;
use App\Models\Masters\GenState;
use App\Models\Masters\MHospital;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia; // Import Inertia class to render components
use Illuminate\Support\Facades\Crypt;

class AppointmentController extends Controller
{

    /**
     * | Book Appointment Screen
     */
    public function bookAppointmentView($hospitalId)
    {
        $hospitalId = Crypt::decrypt($hospitalId);
        $mGenDepartments = new GenDepartment();
        $mGenConsultants = new GenConsultant();
        $mGenConsultantShift = new GenConsultantShift();
        $mGenStates = new GenState();
        $mGenCities = new GenCity();

        $hospital = MHospital::findOrFail($hospitalId);
        $departments = $mGenDepartments->listDepartments($hospitalId);
        $consultants = $mGenConsultants->listConsultants($hospitalId);
        $consultShifts = $mGenConsultantShift->listShifts($hospitalId);
        $states = $mGenStates->listStates();
        $cities = $mGenCities->listCities();

        return Inertia::render('BookAppointment', [
            'departments' => $departments,
            'consultants' => $consultants,
            'shifts' => $consultShifts,
            'states' => $states,
            'cities' => $cities,
            'hospital' => $hospital
        ]);
    }


    /**
     * | Book Online Appointment
     */
    public function bookAppointment(Request $req)
    {
        $todayDate = Carbon::now()->format('Y-m-d');

        $validator = Validator::make($req->all(), [
            'dob' => 'required|date|before_or_equal:' . $todayDate,
            'appointmentDate' => 'required|date|after_or_equal:' . $todayDate,
            'name' => 'required|string',
            'phoneNo' => 'required|string|digits:10',
            'address' => "required|string",
            'state' => 'required|integer',
            'city' => 'required|integer',
            'postal' => 'required|integer',
            'email' => 'required|email',
            'gender' => 'required|string|In:Male,Female,Others',
            'department' => 'required|string',
            'doctor' => 'required|integer',
            'shift' => 'required|integer',
            'hasEverApplied' => 'nullable|In:0,1',
            'hospitalId' => 'required|integer'
        ]);
        if ($validator->fails())
            return response()->json(['status' => false, 'message' => $validator->errors(), 'data' => []]);

        try {
            $mGenAppointment = new GenAppointment();
            $dbReqs = [
                'DOB' => $req->dob,
                'AppointmentDate' => $req->appointmentDate,
                'Name' => $req->name,
                'PhoneNo' => $req->phoneNo,
                'Address' => $req->address,
                'StateID' => $req->state,
                'CityID' => $req->city,
                'Postal' => $req->postal,
                'Email' => $req->email,
                'Gender' => $req->gender,
                'DepartmentID' => $req->department,
                'ConsultantID' => $req->doctor,
                'ShiftID' => $req->shift,
                'HasEverApplied' => (bool)$req->hasEverApplied,
                'HospitalID' => $req->hospitalId
            ];

            $mGenAppointment->create($dbReqs);
            return response()->json(['status' => true, 'message' => 'Successfully Booked The appointment', 'data' => []]);
        } catch (Exception $e) {
            return response()->json(['status' => false, 'message' => $e->getMessage(), 'data' => []]);
        }
    }


    /**
     * | Book Appointment V2
     */
    public function bookAppointmentV2(Request $req)
    {
        $todayDate = Carbon::now()->format('Y-m-d');
        $validator = Validator::make($req->all(), [
            'dob' => 'required|date|before_or_equal:' . $todayDate,
            'appointmentDate' => 'required|date|after_or_equal:' . $todayDate,
            'name' => 'required|string',
            'phoneNo' => 'required|string|digits:10',
            'address' => "required|string",
            'state' => 'required|integer',
            'city' => 'required|integer',
            'postal' => 'required|integer',
            'email' => 'required|email',
            'gender' => 'required|string|In:Male,Female,Others',
            'consultantShift' => 'required|integer|min:1',
            'hasEverApplied' => 'nullable|In:0,1',
            'hospitalId' => 'required|integer'
        ]);
        if ($validator->fails())
            return validationError($validator);

        // Variable Assignments
        $mGenParams = new GenParam();
        $mGenAppointment = new GenAppointment();

        // Derivative Assignments
        try {
            $params = $mGenParams->getIdFromHospConsShiftId($req->consultantShift, $req->hospitalId);
            $dbReqs = [
                'DOB' => $req->dob,
                'AppointmentDate' => $req->appointmentDate,
                'Name' => $req->name,
                'PhoneNo' => $req->phoneNo,
                'Address' => $req->address,
                'StateID' => $req->state,
                'CityID' => $req->city,
                'Postal' => $req->postal,
                'Email' => $req->email,
                'Gender' => $req->gender,
                'ParamID' => $params->id,
                'HasEverApplied' => (bool)$req->hasEverApplied,
                'HospitalID' => $req->hospitalId
            ];

            $mGenAppointment->create($dbReqs);

            return responseMsgs(true, "Appointment Successfully Done", [], "0202", "1.0", "POST", $req->deviceId);
        } catch (Exception $e) {
            return responseMsgs(false, $e->getMessage(), [], "0202", "1.0", "POST", $req->deviceId);
        }
    }
}
