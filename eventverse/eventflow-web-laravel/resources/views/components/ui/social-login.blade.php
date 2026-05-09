<div class="flex-secondary">
    <div class="flex w-full items-center gap-4">
        <x-ui.divider />
        <p class="text-secondary font-medium">Or</p>
        <x-ui.divider />
    </div>

    <div class="flex items-center justify-center">
        <a
            href="{{-- route('social.apple.redirect') --}}"
            class="px-2"
        >
            <x-ui.icon
                icon="apple"
                class="size-7"
            />
        </a>
        <a
            href="{{ route('social.google.redirect') }}"
            class="px-2"
        >
            <x-ui.icon
                icon="google"
                class="size-7"
            />
        </a>
        <a
            href="{{ route('social.facebook.redirect') }}"
            class="px-2"
        >
            <x-ui.icon
                icon="facebook"
                class="size-8"
            />
        </a>
        <a
            href="{{ route('social.linkedin.redirect') }}"
            class="px-2"
        >
            <x-ui.icon
                icon="linkedin"
                class="size-8"
            />
        </a>
    </div>
</div>
