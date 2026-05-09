<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Livewire\Attributes\Computed;
use Livewire\Attributes\Layout;
use Livewire\Attributes\Title;
use Livewire\Volt\Component;

new #[Layout('livewire.layouts.app')] #[Title('Orders - SVES')] class extends Component {
    public $landingImage = '';

    public function mount()
    {
        $this->landingImage = Storage::url('web/rays.mp4');
    }

    #[Computed]
    public function user()
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();
        $user =
            // 'orders',
            $user
                ?->load([
                    'orders' => fn ($query) => $query->latest(),
                    'orders.orderItems',
                    'orders.orderItems.product',
                    'orders.orderItems.product.image',
                ])
                ?->loadCount(['orders']);
        return $user;
    }
};
?>

<div class="flex flex-col">
    <livewire:app.partials.landing-section
        :image="$landingImage"
        btnText="Track Orders"
        description="Keep track of everything you've ordered with real-time updates and status info. Whether it's on the way or recently delivered, you’ll find all your order details right here—quick, simple, and transparent."
        heading="Your Orders, All in One Place"
    />
    
    <div class="flex flex-col items-center gap-10 p-4 lg:p-8">
        <div class="flex flex-col items-center text-center">
            <flux:heading size="xl">
                My orders ({{ $this->user?->orders_count ?? 0 }})
            </flux:heading>
            <flux:text>
                Check the status of recent orders, manage returns, and download invoices.
            </flux:text>
        </div>

        <div class="flex w-full max-w-5xl flex-col gap-10">
            @foreach ($this->user?->orders ?? [] as $each)
                <div
                    class="flex flex-col gap-4"
                    key="{{ $each->id }}"
                >
                    <div class="flex flex-col items-center gap-2 sm:flex-row">
                        <div class="flex flex-wrap gap-4 sm:gap-6">
                            <div class="flex flex-col">
                                <flux:text>Order Number</flux:text>
                                <flux:heading>{{ $each->id }}</flux:heading>
                            </div>
                            <div class="flex flex-col">
                                <flux:text>Date Placed</flux:text>
                                <flux:heading>{{ $each->datePlaced }}</flux:heading>
                            </div>
                            <div class="flex flex-col">
                                <flux:text>Total Amount</flux:text>
                                <flux:heading>${{ $each->total }}</flux:heading>
                            </div>
                        </div>

                        <flux:spacer />

                        <flux:button.group class="">
                            <flux:button size="sm">View Order</flux:button>
                            <flux:button size="sm">View Invoice</flux:button>
                        </flux:button.group>
                    </div>

                    <flux:separator variant="subtle" />

                    <div class="flex flex-col">
                        @foreach ($each->orderItems as $eachItem)
                            <div
                                class="flex gap-4"
                                :key="$eachItem->id.'orderItem'"
                            >
                                <img
                                    class="h-28 w-28 rounded object-cover"
                                    alt="{{ $eachItem->product->image->imageUrl }}"
                                    src="{{ $eachItem->product->image->imageUrl }}"
                                />

                                <div class="flex flex-1 flex-col gap-2">
                                    <div class="flex">
                                        <flux:heading size="lg">
                                            {{ $eachItem->product->name }}
                                        </flux:heading>

                                        <flux:spacer />

                                        <flux:heading>${{ $eachItem->price }}</flux:heading>
                                    </div>

                                    <div class="flex gap-1">
                                        <flux:text>Qty:</flux:text>
                                        <flux:heading>{{ $eachItem->quantity }}</flux:heading>
                                    </div>

                                    <flux:spacer />

                                    <div class="flex items-center gap-2">
                                        <flux:text class="line-clamp-2 max-w-lg">
                                            {{ $eachItem->product->description }}
                                        </flux:text>

                                        <flux:spacer />

                                        <flux:button.group class="max-sm:hidden">
                                            <flux:button
                                                :href="route('app.product', ['slug' => $eachItem->product->slug])"
                                                wire:navigate
                                                size="xs"
                                            >
                                                View Product
                                            </flux:button>
                                            <flux:button
                                                :href="route('app.product', ['slug' => $eachItem->product->slug])"
                                                wire:navigate
                                                size="xs"
                                            >
                                                Buy Again
                                            </flux:button>
                                        </flux:button.group>
                                    </div>
                                </div>
                            </div>
                        @endforeach
                    </div>

                    <flux:separator variant="subtle" />

                    <div class="flex flex-col items-center gap-2 sm:flex-row">
                        <div class="flex flex-wrap gap-1">
                            <flux:icon.check-circle />
                            <flux:heading>Delivered on {{ $each->deliveryDate }}</flux:heading>
                        </div>
                        <flux:spacer />
                    </div>
                </div>
            @endforeach
        </div>
    </div>
</div>
