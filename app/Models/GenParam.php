<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GenParam extends Model
{
    use HasFactory;

    /**
     * | Get Params by hospital id
     */
    public function getParamsByHospId($hospitalId)
    {
        return $this->where('hospital_id', $hospitalId)
            ->select(
                'id',
                'hospital_id',
                'consultant_shift_id',
                'consultant_id',
                'consultant_name',
                'department_id',
                'department_name',
                'shift_id',
                'shift_name',
                'shift_start_time',
                'shift_end_time',
                'fee'
            )
            ->where('status', 1)
            ->get();
    }
}
