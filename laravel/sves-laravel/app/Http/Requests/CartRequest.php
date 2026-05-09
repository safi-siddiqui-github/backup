<?php

namespace App\Http\Requests;

use App\Models\Cart;
use Illuminate\Foundation\Http\FormRequest;

class CartRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
                //
            ];
    }

    public function add($user_id, $product_id)
    {
        $cart = Cart::where([['user_id', $user_id], ['product_id', $product_id]])->first();

        if ($cart) {
            $cart->quantity = $cart->quantity + 1;
            $cart->save();
            return;
        }

        if (!$cart) {
            $cart = new Cart();
            $cart->user_id = $user_id;
            $cart->product_id = $product_id;
            $cart->save();
        }
    }

    public function remove($user_id, $product_id)
    {
        $cart = Cart::where([['user_id', $user_id], ['product_id', $product_id]])->first();

        if ($cart) {
            if ($cart->quantity == 1) {
                $cart->delete();
                return;
            }

            $cart->quantity = $cart->quantity - 1;
            $cart->save();
        }
    }
}
