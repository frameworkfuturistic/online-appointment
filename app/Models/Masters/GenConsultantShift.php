<?php

namespace App\Models\Masters;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class GenConsultantShift extends Model
{
    use HasFactory;

    /**
     * | Get consultant Shifts
     */
    public function listShifts()
    {
        $consultantShifts = DB::table('gen_consultantshifts as cs')
            ->join('gen_shifts as s', 's.ShiftID', '=', 'cs.ShiftID')
            ->select('cs.*', DB::raw('CONCAT(s.ShiftName, " (", s.StartTime, " ", s.StartTimeAMPM, "-", s.EndTime, " ", s.EndTimeAMPM, ")") AS Shift'))
            ->orderBy('cs.ConsultantID')
            ->get();
        return $consultantShifts;
    }
}
