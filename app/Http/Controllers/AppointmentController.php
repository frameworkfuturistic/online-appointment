<?php

namespace App\Http\Controllers;

use App\Models\Appointment\GenAppointment;
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

class AppointmentController extends Controller
{

    /**
     * | Book Appointment Screen
     */
    public function bookAppointmentView($hospitalId)
    {
        $mGenDepartments = new GenDepartment();
        $mGenConsultants = new GenConsultant();
        $mGenConsultantShift = new GenConsultantShift();
        $mGenStates = new GenState();
        $mGenCities = new GenCity();

        $departments = $mGenDepartments->listDepartments();
        $consultants = $mGenConsultants->listConsultants();
        $consultShifts = $mGenConsultantShift->listShifts();
        $states = $mGenStates->listStates();
        $cities = $mGenCities->listCities();
        $hospital = MHospital::findOrFail($hospitalId);

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
            'hasEverApplied' => 'nullable|In:true,false'
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
                'HasEverApplied' => (bool)$req->hasEverApplied
            ];
            $mGenAppointment->create($dbReqs);
            return response()->json(['status' => true, 'message' => 'Successfully Booked The appointment', 'data' => []]);
        } catch (Exception $e) {
            return response()->json(['status' => false, 'message' => $e->getMessage(), 'data' => []]);
        }
    }
}
