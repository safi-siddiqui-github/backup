<template>
  <div class="flex flex-col">
    <NuxtUIAppComponent>
      <WebGeneralHeaderComponent />
      <NuxtUIContainerComponent>
        <slot />
      </NuxtUIContainerComponent>
      <WebGeneralFooterComponent />
    </NuxtUIAppComponent>
  </div>
</template>
