<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;


/**
 * | Author-Sanjiv Kumar
 * | Created On-02-01-2024 
 * | Created for- User Authentication (Register & Login)
 */
class UserController extends Controller
{

    private $_mUser;
    public function __construct()
    {
        $this->_mUser = new User();
    }


    /**
     * | User Creation
     */
    public function createUser(Request $request)
    {
        $validated = Validator::make(
            $request->all(),
            [
                'fullName' => 'required|string|max:255',
                'email' => 'required|email|unique:users',
                'mobile_no' => 'required|integer|unique:users',
                'password' => 'required|string|min:8',
            ]
        );

        if ($validated->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'validation error',
                'errors' => $validated->errors()
            ]);
        }

        try {
            $checkEmail = $this->_mUser->getUserByEmail($request->email);
            if ($checkEmail)
                throw new Exception('The email has already taken.');

            $user = User::create([
                'full_name' => $request->fullName,
                'email' => $request->email,
                'mobile_no' => $request->mobile_no,
                'password' => Hash::make($request->password),
            ]);

            return responseMsgs(true, "User Registered Successfully !! Please Continue to Login.", $user, "0401", "1.0", "POST", "");
        } catch (Exception $e) {
            return responseMsgs(false, $e->getMessage(), "", "0401", "1.0", "POST", "");
        }
    }

    /**
     * | User Login
     */
    public function loginAuth(Request $req)
    {
        $validated = Validator::make(
            $req->all(),
            [
                'email' => 'required|email',
                'password' => 'required'
            ]
        );
        if ($validated->fails())
            return validationError($validated);

        try {
            $user = $this->_mUser->getUserByEmail($req->email);
            if (!$user)
                throw new Exception("Oops! Given email does not exist");
         
            if (Hash::check($req->password, $user->password)) {
                $token = $user->createToken('my-app-token')->plainTextToken;
                $data['token'] = $token;
                $data['userDetails'] = $user;

            return responseMsgs(true, "You have Logged In Successfully", $data, "0402", "1.0", "POST", "");
            }

            throw new Exception("Password Not Matched");
        } catch (Exception $e) {
            return responseMsgs(false, $e->getMessage(), "", "0402", "1.0", "POST", "");
        }
    }
}
