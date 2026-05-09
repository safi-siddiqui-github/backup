<?php

namespace App\Http\Controllers;

use App\Http\Traits\UtilTrait;
use App\Models\Otp;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class OtpController extends Controller
{
    use UtilTrait;

    public function index(Request $request)
    {
        return $this->responseHelper(function () use ($request) {
            //
            $otps = Otp::query()
                //
                ->when($request->input('search'), function ($query, $value) {
                    $query->whereLike('slug', "%$value%");
                })
                //
                ->when($request->boolean('with_user'), function (
                    $query,
                    $value,
                ) {
                    $query->with('user');
                })
                //
                ->get();
            //
            return response([
                'success' => true,
                'data' => [
                    'otps' => $otps,
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
                'user_id' => ['required', 'integer', 'exists:users,id'],
                'send_mail' => ['nullable', 'boolean'],
            ]);
            //
            $baseText = $request->input('user_id') . now()->timestamp;
            $slug = $this->base64Helper($baseText);
            //
            $otp =
                Otp::where('user_id', $request->input('user_id'))->first() ??
                null;
            //
            if (!$otp) {
                $otp = new Otp();
                $otp->user_id = $request->input('user_id');
                $otp->slug = $slug;
            }
            //
            $otp->expires_at = now()->addMinutes(10);
            $otp->code = $slug;
            $otp->save();
            //
            if ($request->boolean('send_mail')) {
                // send mail
            }
            //
            return response([
                'success' => true,
                'data' => [
                    'otp' => $otp,
                ],
            ]);
            //
        });
    }

    public function show(Request $request, $id)
    {
        return $this->responseHelper(function () use ($request, $id) {
            //
            $otp = Otp::find($id);
            //
            if (!$otp) {
                throw ValidationException::withMessages([
                    'id' => ['Invalid id'],
                ]);
            }
            //
            if ($request->boolean('with_user')) {
                $otp->load('user');
            }
            //
            return response([
                'success' => true,
                'data' => [
                    'otp' => $otp,
                ],
            ]);
            //
        });
    }

    public function destroy(Request $request, $id)
    {
        return $this->responseHelper(function () use ($request, $id) {
            //
            $otp = Otp::find($id);
            //
            if (!$otp) {
                throw ValidationException::withMessages([
                    'id' => ['Invalid id'],
                ]);
            }
            //
            $otp->delete();
            //
            return response([
                'success' => true,
            ]);
        });
    }
}
