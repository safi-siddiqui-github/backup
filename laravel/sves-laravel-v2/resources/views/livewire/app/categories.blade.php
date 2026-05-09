<?php

use App\Models\Category;
use Illuminate\Support\Facades\Storage;
use Livewire\Attributes\Computed;
use Livewire\Attributes\Layout;
use Livewire\Attributes\Title;
use Livewire\Volt\Component;

new #[Layout('livewire.layouts.app')] #[Title('Categories - SVES')] class extends Component {
    public $landingImage = '';

    public function mount()
    {
        $this->landingImage = Storage::url('web/rays.mp4');
    }

    #[Computed]
    public function categories()
    {
        return Category::whereNull('parent_id')
            ->get()
            ->load(['image', 'sub_categories'])
            ->loadCount(['products']);
    }
};

?>

<div class="flex flex-col gap-10">
    <livewire:app.partials.landing-section
        :image="$landingImage"
        btnText="Browse Categories"
        description="Easily explore our wide range of product categories tailored to your needs. Whether you're looking for fashion, home essentials, tech gadgets, or wellness products — find the perfect items quickly and effortlessly."
        heading="Shop by Category and prepare wardrobe"
    />

    <div class="flex flex-col gap-10 p-4 lg:p-8">
        @foreach ($this->categories as $each)
            <div
                class="flex flex-col gap-4 sm:gap-10"
                :key="$each->id.'category'"
            >
                <livewire:app.partials.heading-section-two
                    :description="$each->description.' Products ( '.$each->products_count.')'"
                    :heading="$each->name"
                    :image="$each->image?->imageUrl"
                    btnText="Shop Collection"
                />

                <div class="grid gap-6 lg:grid-cols-2">
                    @foreach ($each->sub_categories as $eachSub)
                        <livewire:app.partials.feature-section
                            :description="$eachSub->description"
                            :heading="$eachSub->name"
                            :image="$eachSub->image->image_url"
                            :key="$eachSub->name.'sub-categories'"
                        />
                    @endforeach
                </div>
            </div>
        @endforeach
    </div>
</div>
