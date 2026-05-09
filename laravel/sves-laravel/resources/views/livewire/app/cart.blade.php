<?php

use App\Http\Requests\CartRequest;
use App\Http\Requests\StripeRequest;
use Flux\Flux;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Livewire\Attributes\Computed;
use Livewire\Attributes\Layout;
use Livewire\Attributes\Title;
use Livewire\Volt\Component;
use Livewire\WithPagination;

new #[Layout('livewire.layouts.app')] #[Title('Cart - SVES')] class extends Component {
    use WithPagination;

    public $search = '';
    public $CA = '';
    public $SCA = '';
    public $sort = 'latest';
    public $MIP = '';
    public $MXP = '';
    public $expanded = false;
    public $landingImage = '';

    public function mount()
    {
        $this->landingImage = Storage::url('web/rays.mp4');
    }

    #[Computed]
    public function carts()
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();
        $user = $user?->load(['carts', 'carts.product', 'carts.product.image']);
        return $user?->carts ?? [];
    }

    #[Computed]
    public function subtotal()
    {
        $carts = $this->carts();
        $subtotal = 0;
        foreach ($carts as $each) {
            $subtotal += $each->product->price * $each->quantity;
        }
        return $subtotal;
    }

    #[Computed]
    public function shipping()
    {
        return ceil($this->subtotal() * 0.05);
    }

    #[Computed]
    public function tax()
    {
        return ceil($this->shipping() * 0.05);
    }

    #[Computed]
    public function discount()
    {
        return ceil($this->subtotal() * 0.1);
    }

    #[Computed]
    public function total()
    {
        return $this->subtotal() + $this->tax() + $this->shipping() - $this->discount();
    }

    public function submitForm()
    {
        $this->resetPage();
    }

    public function handleCart($action, $product_id)
    {
        $cartRequest = new CartRequest();

        $user_id = Auth::id();
        if (! $user_id) {
            Flux::modal('app-login')->show();
            return;
        }

        if ($action == 'add') {
            $cartRequest->add(user_id: $user_id, product_id: $product_id);
        } else {
            $cartRequest->remove(user_id: $user_id, product_id: $product_id);
        }

        $this->dispatch('cart-updated');
    }

    public function handleCheckout()
    {
        $SR = new StripeRequest();
        $SR->checkout();
    }
};

?>

<div class="flex flex-col">
    <livewire:app.partials.landing-section
        :image="$landingImage"
        btnText="Go to Checkout"
        description="You're just one step away from getting your favorite products. Review your items, confirm the details, and enjoy fast, reliable delivery. We've made the checkout process simple and secure for your convenience."
        heading="Almost There - Ready to Complete Your Purchase?"
    />

    <div class="flex flex-col gap-6 p-4 xl:flex-row">
        <div class="flex flex-1 flex-col gap-4">
            <flux:heading size="xl">Shopping Cart</flux:heading>

            <flux:separator />

            <div class="flex flex-col gap-4">
                @foreach ($this->carts as $each)
                    <div
                        class="flex flex-wrap items-center justify-center gap-4 sm:justify-start"
                        :key="$each->id.'cart'"
                    >
                        <img
                            class="h-28 w-28 rounded object-cover"
                            alt="{{ $each->product->image->imageUrl }}"
                            src="{{ $each->product->image->imageUrl }}"
                        />

                        <div class="flex flex-col">
                            <flux:heading size="lg">{{ $each->product->name }}</flux:heading>
                            <flux:text class="text-xl">${{ $each->product->price }}</flux:text>

                            <flux:text class="line-clamp-2 max-w-xs max-md:hidden">
                                {{ $each->product->description }}
                            </flux:text>
                        </div>

                        <flux:spacer />

                        <flux:button.group>
                            <flux:button
                                class="w-full"
                                wire:click="handleCart('add', {{ $each->product->id }})"
                                icon="plus"
                            >
                                <span class="max-sm:hidden">Add</span>
                            </flux:button>

                            <flux:button
                                class="px-4"
                                square
                            >
                                {{ $each->quantity }}
                            </flux:button>

                            <flux:button
                                class="w-full"
                                wire:click="handleCart('remove', {{ $each->product->id }})"
                                icon="trash"
                            >
                                <span class="max-sm:hidden">Remove</span>
                            </flux:button>
                        </flux:button.group>
                    </div>
                @endforeach
            </div>
        </div>

        <flux:separator
            class="max-xl:hidden"
            variant="subtle"
            vertical
        />

        <div class="flex flex-col gap-4 xl:w-96">
            <flux:heading size="xl">Order Summary</flux:heading>

            <flux:separator />

            <div class="flex items-center">
                <flux:text>Subtotal</flux:text>
                <flux:spacer />
                <flux:heading size="lg">${{ $this->subtotal }}</flux:heading>
            </div>

            <div class="flex items-center">
                <flux:text>Shipping</flux:text>
                <flux:spacer />
                <flux:heading size="lg">${{ $this->shipping }}</flux:heading>
            </div>

            <div class="flex items-center">
                <flux:text>Tax</flux:text>
                <flux:spacer />
                <flux:heading size="lg">${{ $this->tax }}</flux:heading>
            </div>

            <div class="flex items-center">
                <flux:text>Discount 25%</flux:text>
                <flux:spacer />
                <flux:heading size="lg">- ${{ $this->discount }}</flux:heading>
            </div>

            <div class="flex items-center">
                <flux:text>Order Total</flux:text>
                <flux:spacer />
                <flux:heading size="lg">${{ $this->total }}</flux:heading>
            </div>

            <flux:separator />

            <flux:text class="text-center">Ships in 3-4 days</flux:text>

            <flux:button
                class="w-full"
                wire:click="handleCheckout"
                icon="credit-card"
                variant="primary"
            >
                Proceed to checkout - ${{ $this->total }}
            </flux:button>
        </div>
    </div>
</div>
