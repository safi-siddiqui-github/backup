<?php

namespace App\Http\Requests;

use App\Models\Order;
use App\Models\OrderItem;
use App\Notifications\OrderNotification;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Stripe\Checkout\Session;
use Stripe\StripeClient;

class StripeRequest extends FormRequest
{
    protected $stripe;
    public $user;

    public function __construct()
    {
        $this->stripe = new StripeClient(env('STRIPE_SECRET'));
        /** @var \App\Models\User $user */
        $user = Auth::user();
        $this->user = $user->load(['carts', 'carts.product', 'carts.product.image']);
    }

    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    public function organizeLineItems()
    {
        // [
        //     'price_data' => [
        //         'currency' => 'usd',
        //         'product_data' => [
        //             'name' => 'Sample Product',
        //             'images' => ['https://image.com'],

        //         ],
        //         'unit_amount' => 1000, // Amount in cents // 10 $
        //     ],
        //     'quantity' => 1,
        // ],

        $LI = [];
        foreach ($this->user?->carts ?? [] as $each) {
            $LI[] = [
                'price_data' => [
                    'currency' => 'usd',
                    'product_data' => [
                        'name' => $each->product?->name,
                        'images' => [$each->product?->image?->imageUrl],
                    ],
                    'unit_amount' => ($each->product?->price ?? 0) * 100, // Amount in cents
                ],
                'quantity' => $each->quantity,
            ];
        }
        return $LI;
    }

    public function checkout()
    {
        // [
        //     'price_data' => [
        //         'currency' => 'usd',
        //         'product_data' => [
        //             'name' => 'Sample Product',
        //             'images' => ['https://image.com'],

        //         ],
        //         'unit_amount' => 1000, // Amount in cents // 10 $
        //     ],
        //     'quantity' => 1,
        // ],

        $lineItems = [];
        $orderItems = [];
        foreach ($this->user?->carts ?? [] as $each) {
            $lineItems[] = [
                'price_data' => [
                    'currency' => 'usd',
                    'product_data' => [
                        'name' => $each->product?->name,
                        'images' => [$each->product?->image?->imageUrl],
                    ],
                    'unit_amount' => ($each->product?->price ?? 0) * 100, // Amount in cents
                ],
                'quantity' => $each->quantity,
            ];

            $orderItems[] = [
                'product_id' => $each->product?->id,
                'price' => $each->product?->price,
                'quantity' => $each->quantity,
            ];
        }

        $checkout = $this->stripe->checkout->sessions->create([
            'mode' => 'payment',
            'success_url' => route('app.cart'),
            'cancel_url' => route('app.home'),
            'line_items' => $lineItems,
        ]);

        $order = new Order();
        $order->user_id = $this->user?->id ?? null;
        $order->stripe_session_id = $checkout->id;
        $order->subtotal = $checkout->amount_subtotal;
        $order->total = $checkout->amount_total;
        $order->payment_status = $checkout->payment_status;
        $order->currency = $checkout->currency;
        $order->save();

        foreach ($orderItems as $each) {
            $OI = new OrderItem();
            $OI->order_id = $order->id;
            $OI->product_id = $each['product_id'];
            $OI->price = $each['price'];
            $OI->quantity = $each['quantity'];
            $OI->save();
        }

        $this->user?->notify(new OrderNotification($order));

        return redirect()->away($checkout->url);
    }
}
