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
    public function listConsultants()
    {
        return self::select('Honour', 'ConsultantID', 'ConsultantName', 'ConsultantType', 'DepartmentID')
            ->where('Hidden', 0)
            ->get();
    }
}
