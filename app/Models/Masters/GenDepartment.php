<?php

namespace App\Models\Masters;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GenDepartment extends Model
{
    use HasFactory;

    /**
     * | General Department LIsts
     */
    public function listDepartments()
    {
        return self::orderBy('Department')->get();
    }
}
