<?php

use App\Models\Category;
use App\Models\Product;
use Illuminate\Support\Facades\Storage;
use Livewire\Attributes\Computed;
use Livewire\Attributes\Layout;
use Livewire\Attributes\Title;
use Livewire\Volt\Component;

new #[Layout('livewire.layouts.app')] #[Title('Home - SVES')] class extends Component {
    public $benefits = '';
    public $landingImage = '';
    public $saleImage = '';

    public function mount()
    {
        $this->saleImage = Storage::url('web/sale.jpg');
        $this->landingImage = Storage::url('web/rays.mp4');

        $this->benefits = [
            [
                'name' => 'Secure Pledge',
                'description' =>
                    'We honor every order with clear terms and customer-first service, so you can shop with complete confidence and peace of mind every time.',
                'image' => Storage::url('web/pledge.jpg'),
            ],
            [
                'name' => 'On-Time Delivery',
                'description' =>
                    'Your time matters. We ensure your orders reach you quickly, reliably, and exactly when promised, without unexpected delays or excuses.',
                'image' => Storage::url('web/delivery.jpg'),
            ],
            [
                'name' => 'Exclusive Discounts',
                'description' =>
                    'Get access to special deals, members-only savings, and limited-time offers that make your shopping experience even more rewarding.',
                'image' => Storage::url('web/discount.jpg'),
            ],
            [
                'name' => 'Easy Refunds',
                'description' =>
                    'Changed your mind? No problem. We offer a smooth, no-questions-asked refund process designed to keep you satisfied.',
                'image' => Storage::url('web/refund.jpg'),
            ],
        ];
    }

    #[Computed]
    public function categories()
    {
        return Category::whereNull('parent_id')
            ->get()
            ->load(['image'])
            ->loadCount(['products']);
    }

    #[Computed]
    public function products()
    {
        return Product::limit(6)
            ->get()
            ->load(['images', 'category']);
    }
};

?>

<div class="flex flex-col gap-10">
    <livewire:app.partials.landing-section
        :image="$landingImage"
        btnText="Start Shopping"
        description="Explore a curated collection of must-have products designed to simplify your life. From daily necessities to trending items, find everything you need in one place. Shop with ease, track orders, manage your account, and never miss an exclusive deal."
        heading="Discover Everyday Essentials You'll Love"
    />

    <div class="flex flex-col gap-10 p-4 lg:p-8">
        <livewire:app.partials.heading-section
            btnText="Shop Trends"
            description="Discover what's hot and loved by everyone. Explore top-rated picks and trending styles in one place now."
            heading="Stay ahead. Shop what's trending right now."
        />

        <div class="grid w-full grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
            @foreach ($this->products as $each)
                <livewire:app.partials.product-card
                    :key="$each->id.'product'"
                    :product="$each"
                />
            @endforeach
        </div>
    </div>

    <livewire:app.partials.sale-section
        :image="$saleImage"
        btnText="Get access to our one-time sale"
        description="Most of our products are limited releases that won't come back. Get your favorite
                items while they're in stock."
        heading="Get 25% off during our one-time sale"
    />

    <div class="flex flex-col gap-10 p-4 lg:p-8">
        <livewire:app.partials.heading-section
            btnText="Browse Categories"
            description="Find what you need faster. Explore our wide range of categories to shop by type, style, or occasion with ease."
            heading="Shop by Category — Everything in One Place"
        />

        <div class="grid w-full grid-cols-1 gap-4 md:grid-cols-3">
            @foreach ($this->categories as $each)
                <livewire:app.partials.category-card
                    :category="$each"
                    :key="$each->id.'category'"
                />
            @endforeach
        </div>
    </div>

    <div class="flex flex-col gap-10 p-4 lg:p-8">
        <livewire:app.partials.heading-section
            btnText="Explore Features"
            description="We're committed to giving you the best. Learn about our promises that make your experience better—every time you shop."
            heading="Why Choose Us — Our Promises to You"
        />

        <div class="grid gap-6 lg:grid-cols-2">
            @foreach ($this->benefits as $each)
                <livewire:app.partials.feature-section
                    :description="$each['description']"
                    :heading="$each['name']"
                    :image="$each['image']"
                    :key="$each['name']"
                />
            @endforeach
        </div>
    </div>
</div>
