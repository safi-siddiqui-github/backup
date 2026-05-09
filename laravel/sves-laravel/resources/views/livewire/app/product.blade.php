<?php

use App\Http\Requests\CartRequest;
use App\Models\Cart;
use App\Models\Product;
use Flux\Flux;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Livewire\Attributes\Computed;
use Livewire\Attributes\Layout;
use Livewire\Attributes\Title;
use Livewire\Volt\Component;
use Livewire\WithPagination;

new #[Layout('livewire.layouts.app')] #[Title('Search - SVES')] class extends Component {
    use WithPagination;

    public $slug = '';
    public $color = '';
    public $user_id = null;
    public $landingImage = '';
    public $alpRatings = '';

    #[Computed]
    public function product()
    {
        return Product::where('slug', $this->slug)
            ->with(['image', 'images', 'category', 'images.color', 'reviews'])
            ->withCount(['reviews'])
            ->first();
    }

    #[Computed]
    public function ratings()
    {
        return [
            [
                'name' => 5,
                'percentage' => round(
                    ($this->product?->reviews?->where('rating', 5)->count() /
                        $this->product?->reviews_count) *
                        100,
                ),
            ],
            [
                'name' => 4,
                'percentage' => round(
                    ($this->product?->reviews?->where('rating', 4)->count() /
                        $this->product?->reviews_count) *
                        100,
                ),
            ],
            [
                'name' => 3,
                'percentage' => round(
                    ($this->product?->reviews?->where('rating', 3)->count() /
                        $this->product?->reviews_count) *
                        100,
                ),
            ],
            [
                'name' => 2,
                'percentage' => round(
                    ($this->product?->reviews?->where('rating', 2)->count() /
                        $this->product?->reviews_count) *
                        100,
                ),
            ],
            [
                'name' => 1,
                'percentage' => round(
                    ($this->product?->reviews?->where('rating', 1)->count() /
                        $this->product?->reviews_count) *
                        100,
                ),
            ],
        ];
    }

    public function mount()
    {
        $this->color = $this->product->image->color->id;
        $this->user_id = Auth::id();
        $this->landingImage = Storage::url('web/rays.mp4');
        $this->alpRatings = $this->ratings();
    }

    #[Computed]
    public function cartCount()
    {
        return Cart::where([
            ['user_id', $this->user_id],
            ['product_id', $this->product()->id],
        ])->first()?->quantity;
    }

    public function handleCart($action)
    {
        if (! $this->user_id) {
            Flux::modal('app-login')->show();
            return;
        }

        $product_id = $this->product()->id;
        $cartRequest = new CartRequest();

        if ($action == 'add') {
            $cartRequest->add(user_id: $this->user_id, product_id: $product_id);
        } else {
            $cartRequest->remove(user_id: $this->user_id, product_id: $product_id);
        }

        $this->dispatch('cart-updated');
    }

    #[Computed]
    public function reviews()
    {
        return $this->product()
            ->reviews()
            ->latest()
            ->limit(6)
            ->get()
            ->load('user');
    }

    #[Computed]
    public function cap()
    {
        // customers also purchased
        return Product::where('category_id', $this->product->category_id)
            ->where('id', '!=', $this->product->id)
            ->with(['image', 'images', 'category'])
            ->withCount(['reviews'])
            ->limit(4)
            ->latest()
            ->get();
    }
};

?>

<div class="flex flex-col gap-10">
    <livewire:app.partials.landing-section
        :heading="$this->product->name"
        :image="$landingImage"
        btnText="Add to Cart"
        description="Take a closer look at the features, benefits, and specifications of this product. Designed to meet your expectations, it's crafted with care and built for performance. Make an informed choice and enjoy a seamless shopping experience."
    />

    <div
        class="flex flex-col gap-4 xl:flex-row xl:items-center xl:gap-6"
        x-data="{
            mainImage: '{{ $this->product->image->image_url }}',
            changeImage(url) {
                this.mainImage = url
            },
        }"
    >
        <div class="flex flex-col gap-4">
            <img
                class="max-h-screen w-full max-w-screen overflow-hidden rounded-lg object-cover"
                :alt="mainImage"
                :src="mainImage"
            />

            <div class="grid grid-cols-4 gap-4">
                @foreach ($this->product->images as $eachImage)
                    <img
                        class="h-full w-full cursor-pointer rounded object-contain"
                        @click="changeImage('{{ $eachImage->image_url }}')"
                        alt="{{ $eachImage->image_url }}"
                        key="{{ $eachImage->id . 'image' }}"
                        src="{{ $eachImage->image_url }}"
                    />
                @endforeach
            </div>
        </div>

        <div class="flex flex-col gap-4 p-4 xl:gap-6">
            <div class="flex flex-col gap-1">
                <flux:text class="text-3xl font-medium">{{ $this->product->name }}</flux:text>
                <flux:text class="text-2xl">${{ $this->product->price }}</flux:text>

                <div class="flex items-center gap-2">
                    <div class="flex">
                        @for ($i=0;$i< 4; $i++)
                            @if ($i < $this->product?->avgRating ?? 0)
                                <flux:icon.star variant="solid" />
                            @else
                                <flux:icon.star />
                            @endif
                        @endfor
                    </div>

                    <flux:text class="">{{ $this->product->reviews_count }} reviews</flux:text>
                </div>
            </div>

            <flux:radio.group
                class="w-fit"
                label="Select your color"
                wire:model="color"
            >
                @foreach ($this->product->images as $eachImage)
                    <flux:radio
                        :key="$eachImage->id . 'color'"
                        :label="ucfirst($eachImage->color->name)"
                        :value="$eachImage->color->id"
                        @click="changeImage('{{ $eachImage->image_url }}')"
                    />
                @endforeach
            </flux:radio.group>

            <div class="flex items-center gap-2">
                <flux:icon.check />
                <flux:text>In Stock and ready to ship</flux:text>
            </div>

            <flux:text>{{ $this->product->description }}</flux:text>

            <flux:button.group>
                @if ($this->cartCount)
                    <flux:button
                        class="w-full"
                        wire:click="handleCart('add')"
                        icon="plus"
                    >
                        <span class="max-sm:hidden">Add</span>
                    </flux:button>

                    <flux:button
                        class="px-4"
                        square
                    >
                        {{ $this->cartCount }}
                    </flux:button>

                    <flux:button
                        class="w-full"
                        wire:click="handleCart('remove')"
                        icon="trash"
                    >
                        <span class="max-sm:hidden">Remove</span>
                    </flux:button>
                @else
                    <flux:button
                        class="w-full"
                        wire:click="handleCart('add')"
                        icon="shopping-bag"
                    >
                        Add to bag
                    </flux:button>
                @endif

                <flux:button
                    class="w-full"
                    icon="credit-card"
                >
                    Buy now
                </flux:button>
            </flux:button.group>
        </div>
    </div>

    <div class="relative flex flex-col gap-10 p-4 sm:p-8 lg:flex-row lg:items-start">
        <div class="flex flex-col gap-10 lg:sticky lg:top-10 lg:max-w-lg">
            <div class="flex flex-col gap-2">
                <flux:heading size="xl">Customer Reviews</flux:heading>

                <div class="flex items-center gap-2">
                    <div class="flex">
                        @for ($i=0;$i< 5; $i++)
                            @if ($i < $this->product?->avgRating ?? 0)
                                <flux:icon.star variant="solid" />
                            @else
                                <flux:icon.star />
                            @endif
                        @endfor
                    </div>

                    <flux:text class="">
                        Based on {{ $this->product->reviews_count }} reviews
                    </flux:text>
                </div>
            </div>

            <div
                class="flex flex-col"
                x-data="{ ratings: $wire.alpRatings }"
            >
                <template
                    :key="rating.name"
                    x-for="rating in ratings"
                >
                    <div class="flex items-center gap-2">
                        <flux:heading
                            class="w-4"
                            x-text="rating.name"
                        ></flux:heading>
                        <flux:icon.star variant="solid" />

                        <div class="flex w-full flex-col">
                            <div
                                class="h-4 rounded-full bg-black dark:bg-white"
                                :style="`width: ${rating.percentage}%`"
                            ></div>
                        </div>

                        <flux:heading x-text="`${rating.percentage}%`"></flux:heading>
                    </div>
                </template>
            </div>

            <div class="flex flex-col gap-2">
                <flux:heading>Share your thoughts</flux:heading>
                <flux:text>
                    If you've used this product, share your thoughts with other customers
                </flux:text>
                <flux:button class="md:w-fit lg:w-full">Write a review</flux:button>
            </div>
        </div>

        <div class="flex flex-col gap-8 lg:flex-1">
            @foreach ($this->reviews as $eachReview)
                <div
                    class="flex flex-col gap-2"
                    key="$eachReview->id.'review'"
                >
                    <div class="flex items-center gap-2">
                        <img
                            class="h-20 w-20 rounded"
                            alt="{{ $eachReview->user->image->imageUrl }}"
                            src="{{ $eachReview->user->image->imageUrl }}"
                        />

                        <div class="flex flex-col">
                            <flux:heading>{{ $eachReview->user->name }}</flux:heading>
                            <div class="flex">
                                @for ($i=0;$i< 4; $i++)
                                    @if ($i < $eachReview->rating ?? 0)
                                        <flux:icon.star variant="solid" />
                                    @else
                                        <flux:icon.star />
                                    @endif
                                @endfor
                            </div>
                        </div>
                    </div>

                    <flux:text>{{ $eachReview->comment }}</flux:text>
                </div>
            @endforeach
        </div>
    </div>

    <div class="flex flex-col gap-10 p-4 sm:p-8">
        <flux:heading size="xl">Customers also purchased</flux:heading>

        <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
            @foreach ($this->cap as $each)
                <livewire:app.partials.product-card
                    :key="$each->id.'cap-product'"
                    :product="$each"
                />
            @endforeach
        </div>
    </div>
</div>
