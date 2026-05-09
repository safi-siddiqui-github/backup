<div class="flex-secondary relative">
    <img
        src="{{ $image }}"
        alt="{{ $image }}"
        class="absolute top-0 left-0 h-full w-full object-cover brightness-50"
    />

    <div class="flex flex-col z-10">
        {{ $slot }}
    </div>
</div>
