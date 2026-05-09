<?php

namespace App\Traits;

trait ResponseTrait
{
    /**
     * @param bool $success
     * @param string $message
     * @param array<string, mixed> $data
     * @param array<string, string|string[]> $errors
     */
    public function apiResponse(
        $success = false,
        $message = '',
        $data = [],
        $errors = [],
    ) {
        return response()->json([
            'success' => $success,
            'message' => $message,
            'data' => $data,
            'errors' => $errors,
        ]);
    }
}
