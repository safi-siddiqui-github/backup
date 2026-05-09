<flux:button.group class="w-full">
    <flux:button
        class="w-full"
        :href="route('social.google.login')"
        icon:trailing="arrow-up-right"
    >
        Google
    </flux:button>
    <flux:button
        class="w-full"
        :href="route('social.github.login')"
        icon:trailing="arrow-up-right"
    >
        Github
    </flux:button>
</flux:button.group>
