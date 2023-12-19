<?php


/**
 * | Response Msg Version2 with apiMetaData
 */

use Carbon\Carbon;

if (!function_exists("responseMsgs")) {
    function responseMsgs($status, $msg, $data, $apiId = null, $version = null, $action = null, $deviceId = null)
    {
        return response()->json([
            'status' => $status,
            'message' => $msg,
            'meta-data' => [
                'apiId' => $apiId,
                'version' => $version,
                'responsetime' => responseTime(),
                'epoch' => Carbon::now()->format('Y-m-d H:i:m'),
                'action' => $action,
                'deviceId' => $deviceId
            ],
            'data' => $data
        ]);
    }
}


/**
 * | Api Response time for the the apis
 */

if (!function_exists("responseTime")) {
    function responseTime()
    {
        $responseTime = (microtime(true) - LARAVEL_START) * 1000;
        return round($responseTime, 2);
    }
}


/**
 * | To through Validation Error
 */
if (!function_exists("validationError")) {
    function validationError($validator)
    {
        return response()->json(["status" => false, "message" => "validation error", "data" => $validator->errors()], 422);
    }
}
