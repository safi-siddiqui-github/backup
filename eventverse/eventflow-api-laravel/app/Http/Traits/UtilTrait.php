<?php

namespace App\Http\Traits;

use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;
use Throwable;

trait UtilTrait
{
    //
    protected function responseHelper(callable $callback)
    {
        try {
            return $callback();
        } catch (ValidationException $e) {
            return response()->json(
                [
                    'success' => false,
                    'errors' => $e->errors(),
                ],
                422,
            );
        } catch (Throwable $e) {
            return response()->json(
                [
                    'success' => false,
                    'message' => $e->getMessage(),
                ],
                500,
            );
        }
    }
    //
    public function slugifyHelper($text)
    {
        return Str::slug($text ?? 'not-defined');
        // return Str::slug($text) . '-' . now()->timestamp;
    }
    //
    public function base64Helper($text)
    {
        return Str::of($text ?? now()->timestamp)->toBase64();
    }
    //
    public function uuidHelper()
    {
        return Str::uuid();
    }
    //
}
