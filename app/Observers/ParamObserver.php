<?php

namespace App\Observers;

use App\Models\GenParam;
use Illuminate\Support\Facades\Redis;

/**
 * | Author-Anshu Kumar
 * | Handle Redis Data using Observer
 */
class ParamObserver
{
    /**
     * Handle the GenParam "created" event.
     */
    public function created(GenParam $genParam): void
    {
        Redis::del('hospital_params_' . $genParam->hospital_id);
    }

    /**
     * Handle the GenParam "updated" event.
     */
    public function updated(GenParam $genParam): void
    {
        Redis::del('hospital_params_' . $genParam->hospital_id);
    }

    /**
     * Handle the GenParam "deleted" event.
     */
    public function deleted(GenParam $genParam): void
    {
        Redis::del('hospital_params_' . $genParam->hospital_id);
    }

    /**
     * Handle the GenParam "restored" event.
     */
    public function restored(GenParam $genParam): void
    {
        Redis::del('hospital_params_' . $genParam->hospital_id);
    }

    /**
     * Handle the GenParam "force deleted" event.
     */
    public function forceDeleted(GenParam $genParam): void
    {
        Redis::del('hospital_params_' . $genParam->hospital_id);
    }
}
