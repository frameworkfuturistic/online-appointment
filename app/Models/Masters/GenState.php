<?php

namespace App\Models\Masters;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GenState extends Model
{
    use HasFactory;

    /**
     * | List States
     */
    public function listStates()
    {
        return self::orderBy('StateName')
            ->get();
    }
}
