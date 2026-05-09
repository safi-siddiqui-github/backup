<?php

use App\Models\Category;
use App\Models\Color;
use App\Models\Product;
use Illuminate\Support\Facades\Storage;
use Livewire\Attributes\Computed;
use Livewire\Attributes\Layout;
use Livewire\Attributes\Title;
use Livewire\Volt\Component;
use Livewire\WithPagination;

new #[Layout('livewire.layouts.app')] #[Title('Search - SVES')] class extends Component {
    use WithPagination;

    public $landingImage = '';
    public $search = '';
    public $CA = '';
    public $SCA = '';
    public $sort = 'latest';
    public $MIP = '';
    public $MXP = '';
    public $expanded = false;
    public $expandedC = false;
    public $colorsA = '';

    public function mount()
    {
        $this->landingImage = Storage::url('web/rays.mp4');
    }

    #[Computed]
    public function categories()
    {
        return Category::whereNull('parent_id')
            ->get()
            ->load('sub_categories');
    }

    #[Computed]
    public function colors()
    {
        return Color::orderBy('name')->get();
    }

    #[Computed]
    public function subCategories()
    {
        return Category::whereNotNull('parent_id')
            ->when($this->CA, fn ($q) => $q->whereIn('parent_id', $this->CA))
            ->get();
    }

    #[Computed]
    public function products()
    {
        return Product::with(['image', 'category', 'images'])
            ->when($this->search, fn ($q) => $q->whereLike('name', "%{$this->search}%"))
            ->when($this->CA, fn ($q) => $q->whereIn('category_id', $this->CA))
            ->when($this->SCA, fn ($q) => $q->whereIn('sub_category_id', $this->SCA))
            ->when($this->colorsA, function ($q) {
                $q->whereHas('images', function ($query) {
                    $query->whereIn('color_id', $this->colorsA);
                });
            })
            ->when($this->sort, function ($q) {
                switch ($this->sort) {
                    case 'latest':
                        $q->orderByDesc('created_at');
                        break;
                    case 'name':
                        $q->orderBy($this->sort, 'asc');
                        break;
                    case 'plth':
                        // price low to high
                        $q->orderBy('price');
                        break;
                    case 'phtl':
                        $q->orderByDesc('price');
                        break;
                    default:
                        # code...
                        break;
                }
            })
            ->when($this->MIP, function ($q) {
                $q->where('price', '>=', intval($this->MIP));
            })
            ->when($this->MXP, function ($q) {
                $q->where('price', '<=', intval($this->MXP));
            })
            ->paginate(12);
    }

    #[Computed]
    public function showResult()
    {
        $text = '';

        $text .= 'Search: ' . $this->search;

        $text .= 'Products: ' . $this->products()->total();
        return $text;
    }

    public function submitForm()
    {
        $this->resetPage();
    }
};

?>

<div class="flex flex-col">
    <livewire:app.partials.landing-section
        :image="$landingImage"
        btnText="Apply Filters"
        description="Use advanced filters to narrow down your search and discover products that match your exact preferences. Browse through thousands of items, compare features, and make smarter shopping decisions — all in one place."
        heading="Find Exactly What You're Looking For"
    />

    <div
        class="flex flex-col gap-4 p-4 xl:flex-row xl:p-8"
        x-data="{
            expanded: window.innerWidth >= 1280,
        }"
        x-init="$wire.set('expanded', expanded)"
    >
        <div class="flex flex-col gap-4 xl:max-w-xs">
            <div class="flex items-center">
                <div class="flex flex-col">
                    <flux:text>Search: "{{ $search }}"</flux:text>
                    <flux:text>Total: {{ $this->products->total() }} products</flux:text>
                </div>

                <flux:spacer />

                <flux:icon.check-circle wire:loading.remove />
                <flux:icon.loading wire:loading />
            </div>

            <flux:separator />

            <div>
                <flux:input
                    name="search"
                    @input.debounce.500ms="$wire.submitForm"
                    icon="magnifying-glass"
                    wire:model="search"
                    placeholder="Search..."
                    variant="filled"
                />
            </div>

            <flux:separator />

            <flux:radio.group
                label="Sort By"
                wire:model="sort"
            >
                <flux:radio
                    @click="$wire.submitForm"
                    label="Latest"
                    value="latest"
                />
                <flux:radio
                    @click="$wire.submitForm"
                    label="Name"
                    value="name"
                />
                <flux:radio
                    @click="$wire.submitForm"
                    label="Price: Low to High"
                    value="plth"
                />
                <flux:radio
                    @click="$wire.submitForm"
                    label="Price: High to Low"
                    value="phtl"
                />
            </flux:radio.group>

            <flux:separator />

            <div class="flex flex-col gap-2">
                <flux:heading>Price Range</flux:heading>

                <div class="flex gap-2">
                    <flux:input
                        @input.debounce.500ms="$wire.submitForm"
                        wire:model="MIP"
                        placeholder="0"
                    />
                    <flux:input
                        @input.debounce.500ms="$wire.submitForm"
                        wire:model="MXP"
                        placeholder="999999"
                    />
                </div>
            </div>

            <flux:separator />

            <!-- Opened CA -->
            <flux:navlist.group
                class=""
                expandable
                expanded
                heading="Categories"
                wire:show="expanded"
            >
                <flux:checkbox.group
                    class="space-y-6 px-2 py-4"
                    wire:model="CA"
                >
                    <flux:checkbox.all
                        @click="$wire.submitForm"
                        label="Select All"
                    />
                    @foreach ($this->categories as $each)
                        <flux:navlist.item
                            class="hidden"
                            href="#"
                        >
                            {{ $each->name }}
                        </flux:navlist.item>
                        <flux:checkbox
                            :key="$each->id.'category'"
                            :label="$each->name"
                            :value="$each->id"
                            @click="$wire.submitForm"
                        />

                        <flux:checkbox.group
                            class="ml-4 space-y-6"
                            wire:model="SCA"
                        >
                            @foreach ($each->sub_categories as $eachSub)
                                <flux:checkbox
                                    :key="$eachSub->id.'category'"
                                    :label="$eachSub->name"
                                    :value="$eachSub->id"
                                    @click="$wire.submitForm"
                                />
                            @endforeach
                        </flux:checkbox.group>
                    @endforeach
                </flux:checkbox.group>
            </flux:navlist.group>

            <!-- Closed CA -->
            <flux:navlist.group
                class=""
                expandable
                expanded="false"
                heading="Categories"
                wire:show="!expanded"
            >
                <flux:checkbox.group
                    class="space-y-6 px-2 py-4"
                    wire:model="CA"
                >
                    <flux:checkbox.all
                        @click="$wire.submitForm"
                        label="Select All"
                    />
                    @foreach ($this->categories as $each)
                        <flux:navlist.item
                            class="hidden"
                            href="#"
                        >
                            {{ $each->name }}
                        </flux:navlist.item>
                        <flux:checkbox
                            :key="$each->id.'category'"
                            :label="$each->name"
                            :value="$each->id"
                            @click="$wire.submitForm"
                        />

                        <flux:checkbox.group
                            class="ml-4 space-y-6"
                            wire:model="SCA"
                        >
                            @foreach ($each->sub_categories as $eachSub)
                                <flux:checkbox
                                    :key="$eachSub->id.'category'"
                                    :label="$eachSub->name"
                                    :value="$eachSub->id"
                                    @click="$wire.submitForm"
                                />
                            @endforeach
                        </flux:checkbox.group>
                    @endforeach
                </flux:checkbox.group>
            </flux:navlist.group>

            <!-- Opened colorsA -->
            <flux:navlist.group
                expandable
                expanded
                heading="Colors"
                wire:show="expanded"
            >
                <flux:checkbox.group
                    class="space-y-6 px-2 py-4"
                    wire:model="colorsA"
                >
                    <flux:checkbox.all
                        @click="$wire.submitForm"
                        label="Select All"
                    />
                    @foreach ($this->colors as $each)
                        <flux:navlist.item
                            class="hidden"
                            href="#"
                        >
                            {{ $each->name }}
                        </flux:navlist.item>
                        <flux:checkbox
                            :key="$each->id.'color'"
                            :label="$each->name"
                            :value="$each->id"
                            @click="$wire.submitForm"
                        />
                    @endforeach
                </flux:checkbox.group>
            </flux:navlist.group>

            <!-- Closed colorsA -->
            <flux:navlist.group
                expandable
                expanded="false"
                heading="Colors"
                wire:show="!expanded"
            >
                <flux:checkbox.group
                    class="space-y-6 px-2 py-4"
                    wire:model="colorsA"
                >
                    <flux:checkbox.all
                        @click="$wire.submitForm"
                        label="Select All"
                    />
                    @foreach ($this->colors as $each)
                        <flux:navlist.item
                            class="hidden"
                            href="#"
                        >
                            {{ $each->name }}
                        </flux:navlist.item>
                        <flux:checkbox
                            :key="$each->id.'color'"
                            :label="$each->name"
                            :value="$each->id"
                            @click="$wire.submitForm"
                        />
                    @endforeach
                </flux:checkbox.group>
            </flux:navlist.group>
        </div>

        <div class="flex flex-1 flex-col gap-4">
            <div class="grid gap-2 sm:grid-cols-2 sm:gap-4 lg:grid-cols-2 xl:grid-cols-3">
                @foreach ($this->products as $each)
                    <livewire:app.partials.product-card
                        :key="$each->id.'product'"
                        :product="$each"
                    />
                @endforeach
            </div>

            <div class="">{{ $this->products->links() }}</div>
        </div>
    </div>
</div>

{{--
    @if ($expanded)
    first
    <flux:navlist.group
    class=""
    expandable
    expanded="false"
    heading="Colors"
    >
    <flux:checkbox.group
    class="space-y-6 px-2 py-4"
    wire:model="colorsA"
    >
    <flux:checkbox.all
    @click="$wire.submitForm"
    label="Select All"
    />
    @foreach ($this->colors as $each)
    <flux:navlist.item
    class="hidden"
    href="#"
    >
    {{ $each->name }}
    </flux:navlist.item>
    <flux:checkbox
    :key="$each->id.'color'"
    :label="$each->name"
    :value="$each->id"
    @click="$wire.submitForm"
    />
    @endforeach
    </flux:checkbox.group>
    </flux:navlist.group>
    @else
    
    <flux:navlist.group
    class=""
    expandable
    heading="Colors"
    >
    <flux:checkbox.group
    class="space-y-6 px-2 py-4"
    wire:model="colorsA"
    >
    <flux:checkbox.all
    @click="$wire.submitForm"
    label="Select All"
    />
    @foreach ($this->colors as $each)
    <flux:navlist.item
    class="hidden"
    href="#"
    >
    {{ $each->name }}
    </flux:navlist.item>
    <flux:checkbox
    :key="$each->id.'color'"
    :label="$each->name"
    :value="$each->id"
    @click="$wire.submitForm"
    />
    @endforeach
    </flux:checkbox.group>
    </flux:navlist.group>
    @endif
--}}
