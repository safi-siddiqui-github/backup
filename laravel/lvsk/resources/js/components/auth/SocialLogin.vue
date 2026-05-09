<script setup lang="ts">
import SecondaryLink from '@/components/link/SecondaryLink.vue';
import GithubIcon from '@/components/icons/GithubIcon.vue';
import GoogleIcon from '@/components/icons/GoogleIcon.vue';
</script>

<template>
    <div class="flex flex-wrap items-center gap-2">
        <SecondaryLink :href="route('google.login')" addClasses="flex-1 flex items-center justify-center gap-2">
            <GoogleIcon />
            Google
        </SecondaryLink>
        <SecondaryLink :href="route('github.login')" addClasses="flex-1 flex items-center justify-center gap-2">
            <GithubIcon />
            Github
        </SecondaryLink>
    </div>
</template>
