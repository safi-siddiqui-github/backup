<div class="box-shadow text-left">
    <x-ui.icon
        :icon="$icon"
        class="text-primary min-w-fit"
    />
    <div class="flex flex-col gap-1">
        <p class="text-medium">{{ $category->name }}</p>
        @if ($category->sub_categories_count)
            <p class="text-leading">{{ $category->sub_categories_count }} Subcategories</p>
        @endif
    </div>

    <div class="text-secondary flex flex-1 flex-wrap items-end justify-between">
        <div class="box-input-secondary">
            <x-ui.icon icon="user" />
            {{ $category->minPerson }} - {{ $category->maxPerson }}
        </div>
        <div class="box-input-secondary">
            <x-ui.icon icon="dollar" />
            {{ $category->minPrice }} - {{ $category->maxPrice }}
        </div>
    </div>
</div>
