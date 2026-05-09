<div class="flex gap-2 rounded-lg bg-white p-4 shadow">
    <x-ui.icon
        :icon="$icon"
        class="min-w-fit"
    />
    <div class="flex flex-col gap-1">
        <p class="font-medium">{{ $heading }}</p>
        <p class="text-leading">{{ $description }}</p>
    </div>
</div>
