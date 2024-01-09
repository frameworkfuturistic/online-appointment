<?php

namespace App\Models\Masters;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MHospital extends Model
{
    use HasFactory;

    /**
     * | Get api base url by hospitalId
     */
    public function getApiUrlByHospId(int $hospitalId)
    {
        return self::select('api_base_url')
            ->where('id', $hospitalId)
            ->first();
    }
}
