<?php

namespace App\Http\Controllers;

use App\Http\Traits\UtilTrait;
use App\Models\Otp;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;

class UserController extends Controller
{
    use UtilTrait;

    public function tokenMissing()
    {
        return response([
            'success' => false,
            'errors' => [
                'token' => ['Invalid Token'],
            ],
        ]);
    }

    public function index(Request $request)
    {
        return $this->responseHelper(function () use ($request) {
            //
            $users = User::query()
                //
                ->when($request->input('search'), function ($query, $value) {
                    $query
                        ->whereLike('name', "%$value%")
                        ->orWhereLike('email', "%$value%")
                        ->orWhereLike('username', "%$value%")
                        ->orWhereLike('phone', "%$value%");
                })
                //
                ->when($request->boolean('with_future_otps'), function (
                    $query,
                    $value,
                ) {
                    $query->with('otps', function ($subQuery) {
                        $subQuery->whereFuture('expires_at');
                    });
                })
                //
                ->when($request->boolean('with_tokens'), function (
                    $query,
                    $value,
                ) {
                    $query->with('tokens');
                })

                //
                ->when($request->boolean('with_trashed'), function (
                    $query,
                    $value,
                ) {
                    $query->withTrashed();
                })
                ->when($request->boolean('only_trashed'), function (
                    $query,
                    $value,
                ) {
                    $query->onlyTrashed();
                })
                //
                ->get();
            //
            return response([
                'success' => true,
                'data' => [
                    'users' => $users,
                ],
            ]);
            //
        });
    }

    public function show(Request $request, $id)
    {
        return $this->responseHelper(function () use ($request, $id) {
            //
            $user = User::withTrashed()->find($id);
            //
            if (!$user) {
                throw ValidationException::withMessages([
                    'id' => ['Invalid id'],
                ]);
            }
            //
            if ($request->boolean('with_tokens')) {
                $user->load('tokens');
            }
            //
            if ($request->boolean('with_future_otps')) {
                $user->load([
                    'otps' => function ($subQuery) {
                        $subQuery->whereFuture('expires_at');
                    },
                ]);
            }
            //
            return response([
                'success' => true,
                'data' => [
                    'user' => $user,
                ],
            ]);
            //
        });
    }

    public function store(Request $request)
    {
        return $this->responseHelper(function () use ($request) {
            //
            $request->validate([
                'email' => ['required', 'email', 'unique:users,email'],
                'name' => ['nullable', 'string'],
                'phone' => ['nullable', 'string', 'unique:users,phone'],
                'password' => ['nullable', 'string', 'min:5'],
                'create_token' => ['nullable', 'boolean'],
            ]);
            //
            $user = new User();
            $user->name = $request->input('name');
            $user->email = $request->input('email');
            $user->username = Str::before($request->input('email'), '@');
            $user->phone = $request->input('phone');
            $user->password = $request->input('password');
            $user->save();
            //
            $token = null;
            if ($request->boolean('create_token')) {
                $token = $user->createToken($user->username);
            }
            //
            return response([
                'success' => true,
                'data' => [
                    'user' => $user,
                    'token' => $token?->plainTextToken,
                ],
            ]);
            //
        });
    }

    public function update(Request $request, $id)
    {
        return $this->responseHelper(function () use ($request, $id) {
            //
            $request->validate([
                'name' => ['nullable', 'string'],
                'password' => ['nullable', 'string', 'min:5'],
                'phone' => [
                    'nullable',
                    'string',
                    Rule::unique('users')->ignore($id),
                ],
                'email_verified' => ['nullable', 'boolean'],
                'restore' => ['nullable', 'boolean'],
            ]);
            //
            $user = User::withTrashed()->find($id);
            //
            if (!$user) {
                throw ValidationException::withMessages([
                    'id' => ['Invalid id'],
                ]);
            }
            //
            // Not allowed to be null
            if ($request->input('name')) {
                $user->name = $request->input('name');
            }
            //
            if ($request->input('password')) {
                $user->password = $request->input('password');
            }
            //
            if ($request->input('phone')) {
                $user->phone = $request->input('phone');
            }
            //
            if ($request->has('email_verified')) {
                if ($request->boolean('email_verified')) {
                    $user->email_verified_at = now();
                } else {
                    $user->email_verified_at = null;
                }
            }
            //
            if ($user->isDirty()) {
                $user->save();
            }
            //
            if ($request->has('restore') && $request->boolean('restore')) {
                $user->restore();
            }
            //
            return response([
                'success' => true,
                'user' => $user,
            ]);
        });
    }

    public function destroy(Request $request, $id)
    {
        return $this->responseHelper(function () use ($request, $id) {
            //
            $request->validate([
                'force_delete' => ['nullable', 'boolean'],
            ]);
            //
            $user = User::withTrashed()->find($id);
            //
            if (!$user) {
                throw ValidationException::withMessages([
                    'id' => ['Invalid id'],
                ]);
            }
            //
            $user->delete();
            //
            if ($request->boolean('force_delete')) {
                $user->forceDelete();
            }
            //
            return response([
                'success' => true,
            ]);
        });
    }

    public function authenticateIdentifier(Request $request)
    {
        return $this->responseHelper(function () use ($request) {
            //
            $request->validate([
                'identifier' => ['required', 'string'],
            ]);
            //
            $user =
                User::withTrashed()
                    ->where('email', $request->input('identifier'))
                    ->orWhere('username', $request->input('identifier'))
                    ->orWhere('phone', $request->input('identifier'))
                    ->first() ?? null;
            //
            if (!$user) {
                throw ValidationException::withMessages([
                    'identifier' => ['Identifier is invalid.'],
                ]);
            }
            //
            if ($user->trashed()) {
                throw ValidationException::withMessages([
                    'identifier' => ['User is in-active.'],
                ]);
            }
            //
            return response([
                'success' => true,
                'data' => [
                    'user' => $user,
                ],
            ]);
        });
    }

    public function authenticateCredential(Request $request)
    {
        return $this->responseHelper(function () use ($request) {
            //
            $request->validate([
                'user_id' => ['required', 'integer', 'exists:users,id'],
                'credential' => ['required', 'string'],
                'match' => ['required', 'in:password,otp'],
                'create_token' => ['nullable', 'boolean'],
            ]);
            //
            $user = User::withTrashed()->find($request->input('user_id'));
            //
            if ($user->trashed()) {
                throw ValidationException::withMessages([
                    'credential' => ['User is in-active.'],
                ]);
            }
            //
            $passwordMatched = false;
            //
            if ($request->input('match') === 'password') {
                //
                if (
                    !Hash::check($request->input('credential'), $user->password)
                ) {
                    throw ValidationException::withMessages([
                        'credential' => ['Credential is invalid.'],
                    ]);
                }
                //
                $passwordMatched = true;
                //
            }
            //
            $otpMatched = false;
            //
            if ($request->input('match') === 'otp') {
                //
                $otp =
                    Otp::withTrashed()
                        ->where('user_id', $user->id)
                        ->where('code', $request->input('credential'))
                        ->whereFuture('expires_at')
                        ->first() ?? null;
                //
                if (!$otp) {
                    throw ValidationException::withMessages([
                        'credential' => ['Credential is invalid.'],
                    ]);
                }
                //
                $otp->expires_at = now();
                $otp->save();
                //
                $otpMatched = true;
                //
            }
            //
            if ($passwordMatched === false && $otpMatched === false) {
                //
                throw ValidationException::withMessages([
                    'credential' => ['Credential is invalid.'],
                ]);
                //
            }
            //
            $token = null;
            //
            if ($request->input('create_token')) {
                $token = $user->createToken($user->username);
            }
            //
            return response([
                'success' => true,
                'data' => [
                    'user' => $user,
                    'token' => $token?->plainTextToken,
                ],
                'message' => 'Login Success',
            ]);
            //
        });
    }
}
