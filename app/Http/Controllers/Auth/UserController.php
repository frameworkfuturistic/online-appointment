<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

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
                'full_name' => 'required|string|max:255',
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
            $checkEmail = User::where('email', $request->email)->first();
            if ($checkEmail)
                throw new Exception('The email has already taken.');

            $user = User::create([
                'full_name' => $request->full_name,
                'email' => $request->email,
                'mobile_no' => $request->mobile_no,
                'password' => Hash::make($request->password),
            ]);

            return response()->json([
                'status' => true,
                'message' => 'User Registered Successfully !! Please Continue to Login.',
                'data' => $user
            ]);
        } catch (Exception $e) {
            return response()->json([
                'status' => false,
                'errors' => $e->getMessage()
            ]);
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
                
                return response()->json([
                    'status' => true,
                    'message' => 'You have Logged In Successfully',
                    'data' => $data
                ]);
            }

            throw new Exception("Password Not Matched");
        } catch (Exception $e) {
            return response()->json([
                'status' => false,
                'errors' => $e->getMessage()
            ]);
        }
    }
}
