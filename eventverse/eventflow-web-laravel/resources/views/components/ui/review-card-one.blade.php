<div class="box-shadow justify-between">
    <x-ui.icon
        :icon="$icon"
        class="min-w-fit text-yellow-500"
    />
    <p class="text-leading">
        <span class="text-medium">"</span>
        From intimate gatherings to large-scale conferences, EventFlow provides everything you need to plan.
        <span class="text-medium">"</span>
    </p>

    <div class="flex items-center gap-4">
        <img
            src="{{ asset('images/user.png') }}"
            alt="images/user.png"
            class="h-20 w-20 rounded-full object-cover"
        />

        <div class="flex flex-1 flex-col gap-1">
            <p class="text-medium">John Doe</p>
            <p class="text-leading">Wedding Planner</p>
        </div>
    </div>
</div>
