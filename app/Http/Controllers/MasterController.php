<?php

namespace App\Http\Controllers;

use App\Models\GenParam;
use App\Models\Masters\GenCity;
use App\Models\Masters\GenState;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redis;
use Illuminate\Support\Facades\Validator;

/**
 * | Author-Anshu Kumar
 * | Created On-12-12-2023 
 * | Created for-The Fetching Params Data
 * | Note:- Observer ParamObserver handles the Redis Data
 */
class MasterController extends Controller
{
    private $_mGenParam;
    private $_params;

    public function __construct()
    {
        $this->_mGenParam = new GenParam();
    }

    /**
     * | Read All Params
     */
    public function readAllParams($hospitalId)
    {
        $redisKey = 'hospital_params_' . $hospitalId;
        $this->_params = json_decode(Redis::get($redisKey), true);
        if (collect($this->_params)->isEmpty()) {
            $this->_params = $this->_mGenParam->getParamsByHospId($hospitalId);
            Redis::set($redisKey, json_encode($this->_params));
        }
    }

    /**
     * | Read States(1.1)
     */
    public function readStates()
    {
        $mGenState = new GenState();
        $redisKey = 'states';
        $states = json_decode(Redis::get($redisKey), true);
        if (collect($states)->isEmpty()) {
            $states = $mGenState->listStates();
            Redis::set($redisKey, json_encode($states));
        }
        return $states;
    }

    /**
     * | Get Department By HospitalID Including State(01)
     */
    public function getDepartsByHospitalId(Request $req)
    {
        // Validation
        $validator = Validator::make($req->all(), [
            'hospitalId' => 'required|integer|min:1',
        ]);

        if ($validator->fails())
            return validationError($validator);

        // BLL
        $this->readAllParams($req->hospitalId);
        $departments = collect($this->_params)->map(function ($item) {
            return collect($item)->only(['department_id', 'department_name']);
        });
        $departments = $departments->unique('department_id')->sortBy('department_name')->values();
        // States
        $states = $this->readStates();
        return responseMsgs(true, "Deparment List", ["departments" => $departments, "states" => $states], "0101", "1.0", "POST", $req->deviceId);
    }

    /**
     * | Get Consultants by Hospital ID(02)
     */
    public function getConsultantsByHospDeptId(Request $req)
    {
        // Validation
        $validator = Validator::make($req->all(), [
            'hospitalId' => 'required|integer|min:1',
            'departmentId' => 'required|integer|min:1',
        ]);

        if ($validator->fails())
            return validationError($validator);

        // BLL
        $this->readAllParams($req->hospitalId);
        $this->_params = collect($this->_params)->where('department_id', $req->departmentId);
        $doctors = collect($this->_params)->map(function ($item) {
            return collect($item)->only(['consultant_id', 'consultant_name']);
        });
        $doctors = $doctors->unique('consultant_id')->sortBy('consultant_name')->values();
        return responseMsgs(true, "Consultant List", $doctors, "0103", "1.0", "POST", $req->deviceId);
    }

    /**
     * | Get Shifts by Consultantid and hospitalid(03)
     */
    public function getShiftsByHospDoctorId(Request $req)
    {
        // Validation
        $validator = Validator::make($req->all(), [
            'hospitalId' => 'required|integer|min:1',
            'consultantId' => 'required|integer|min:1',
        ]);

        if ($validator->fails())
            return validationError($validator);

        $this->readAllParams($req->hospitalId);
        $this->_params = collect($this->_params)->where('consultant_id', $req->consultantId);
        $shifts = collect($this->_params)->map(function ($item) {
            return collect($item)->only(['consultant_shift_id', 'shift_id', 'shift_name', 'shift_start_time', 'shift_end_time', 'fee']);
        });
        $shifts = $shifts->sortBy('shift_start_time')->values();
        return responseMsgs(true, "Shift List", $shifts, "0102", "1.0", "POST", $req->deviceId);
    }

    /**
     * | Read Cities by States
     */
    public function readCitiesByStates(Request $req)
    {
        // Validation
        $validator = Validator::make($req->all(), [
            'stateId' => 'required|integer|min:1',
        ]);

        if ($validator->fails())
            return validationError($validator);
        $mGenCities = new GenCity();

        $redisKey = "cities_by_" . $req->stateId;
        $cities = json_decode(Redis::get($redisKey), true);
        if (collect($cities)->isEmpty()) {
            $cities = $mGenCities->listCityByState($req->stateId);
            Redis::set($redisKey, json_encode($cities));
        }

        return responseMsgs(true, "City List", $cities, "0102", "1.0", "POST", $req->deviceId);
    }
}
