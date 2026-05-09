<div class="box-shadow">
    <x-ui.icon
        :icon="$icon"
        class="text-primary min-w-fit"
    />
    <div class="flex flex-col gap-2">
        <p class="text-medium">{{ $heading }}</p>
        <p class="text-leading">{{ $description }}</p>
    </div>

    <div class="flex-secondary flex-1 justify-end">
        @if (isset($freeButton))
            <button class="button-outlined-primary flex-0 text-sm">{{ $freeButton }}</button>
        @elseif (isset($premiumButton))
            <button class="button-filled-primary flex-0 text-sm">{{ $premiumButton }}</button>
        @endif
    </div>
</div>
