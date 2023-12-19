<?php

namespace App\Models\Masters;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GenCity extends Model
{
    use HasFactory;

    /**
     * | List States
     */
    public function listCities()
    {
        return self::orderBy('CityName')
            ->get();
    }

    /**
     * | List City by Stateid
     */
    public function listCityByState($stateId)
    {
        return self::orderBy('CityName')
            ->where('StateID', $stateId)
            ->get();
    }
}
