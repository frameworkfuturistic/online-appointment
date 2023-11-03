<?php

namespace App\Models\Masters;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GenConsultant extends Model
{
    use HasFactory;

    /**
     * | Consultant List
     */
    public function listConsultants($hospitalId)
    {
        return self::select('ID', 'Honour', 'ConsultantID', 'ConsultantName', 'ConsultantType', 'DepartmentID')
            ->where('HospitalID', $hospitalId)
            ->where('Hidden', 0)
            ->get();
    }
}
