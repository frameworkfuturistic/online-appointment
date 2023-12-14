<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Razorpay\Api\Api;

/* Introduction: This file is designed for a system where authors can receive payment for their works. The author anshu kumar can set their preferred payment method. 
For Creation Date and Purpose: The file contains two main functionalities: author introduction and creation date. Additionally, the payment handler function allows for flexible implementation of payment systems in the future. */

class PaymentController extends Controller
{

    /**
     * | Generate Order id to make payment
     */
    public function makeOrder(Request $req)
    {
        $razorpayId = getenv('RAZORPAY_KEY_ID');
        $razorpaySecretId = getenv('RAZORPAY_KEY_SECRET');

        $api = new Api($razorpayId, $razorpaySecretId);

        $order = $api->order->create([
            'amount' => 1000,
            'currency' => 'INR',
            'notes' => $req->all()
        ]);

        return responseMsgs(true, "Order Id Generated", collect($order), "0301", "1.0", "POST", $req->deviceId);
    }

    /**
     * | Save Callback
     */
    public function callback(Request $req)
    {
        // Get the request body
        $requestBody = $req->getContent();

        // Decode the JSON request body (optional, depending on your use case)
        $decodedBody = json_decode($requestBody, true);

        // Specify the file path where you want to save the JSON file
        $fileName = time() . 'json';
        $filePath = storage_path('app/json_files/' . $fileName);

        // Save the JSON data to the file
        Storage::put($filePath, $decodedBody);
    }
}
