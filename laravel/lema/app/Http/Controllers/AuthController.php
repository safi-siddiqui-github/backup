<?php

namespace App\Http\Controllers;

use App\Http\Requests\EmailPasswordLoginReqest;
use App\Http\Resources\UserResource;
use App\Models\User;
use App\Traits\ResponseTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    use ResponseTrait;

    public function emailPasswordLogin(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => ['required', 'string', 'email', 'min:5', 'max:100', 'exists:users,email'],
            'password' => ['required', 'string', 'min:5', 'max:100'],
        ]);

        if ($validator->fails()) {
            return $this->apiResponse(errors: $validator->errors());
        }

        $validated = $validator->validated();

        if (!Auth::attempt($validator->safe()->only(['email', 'password']))) {
            return $this->apiResponse(errors: ['email' => 'Credentials are invalid']);
        }

        // $user instanceof User
        /** @var \App\Models\User $user */
        $user  = Auth::user();

        $token = $user->createToken($user->email);

        return $this->apiResponse(
            success: true,
            message: 'Login Success',
            data: [
                'user' => new UserResource($user),
                'token' => $token->plainTextToken,
            ]
        );
    }

    public function emailPasswordRegister(Request $request)
    {
        User::truncate();
        DB::table('personal_access_tokens')->truncate();

        $validator = Validator::make($request->all(), [
            'email' => ['required', 'string', 'email', 'min:5', 'max:100', 'unique:users,email'],
            'username' => ['required', 'string', 'min:5', 'max:100', 'unique:users,username'],
            'password' => ['required', 'string', 'min:5', 'max:100'],
        ]);

        if ($validator->fails()) {
            return $this->apiResponse(errors: ['email' => $validator->errors()]);
        }

        $validated = $validator->validated();

        $user = new User();
        $user->email = $validated['email'];
        $user->password = $validated['password'];
        $user->username = $validated['username'];
        $user->save();

        return $this->apiResponse(
            success: true,
            message: 'Register Success',
            data: [
                'user' => new UserResource($user),
            ]
        );
    }
}
