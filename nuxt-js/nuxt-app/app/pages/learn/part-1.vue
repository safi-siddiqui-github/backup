<script setup lang="ts">
import NuxtUIInputComponent from "~/components/nuxt-ui/NuxtUIInputComponent.vue";
import { LayoutConstants } from "~~/shared/constants/layout";

definePageMeta({
  layout: LayoutConstants?.WEB_GENERAL_LAYOUT,
});

const count = ref(0);
const rawHtml = ref("This is raw HTML content.");
const bindTitle = ref("This is a title.");
const bindKey = ref("red-text");
const groupKeys = ref({
  title: "Grouped Attributes",
});

const sawMe = ref(false);
const toggleSawMe = () => {
  sawMe.value = !sawMe.value;
};

const modifiersExample = () => {
  console.log("submitted");
};

// computed properties are cached based on their reactive dependencies
// instead of a method
const afterSeeingMe = computed(() => {
  return sawMe.value ? "You have seen me" : "You haven't seen me yet";
});

const conditionTwo = ref(false);
const toggleConditionTwo = () => {
  conditionTwo.value = !conditionTwo.value;
};

const listOne = ref(["Item 1", "Item 2", "Item 3"]);

const keyPressedOne = ref(false);
const toggleKeyPressedOne = () => {
  keyPressedOne.value = !keyPressedOne.value;
};

const inputOne = ref("");
const textareaOne = ref("");
const checkboxOne = ref(false);
const radioGroupItems = ref(["Option 1", "Option 2", "Option 3"]);
const radioGroupOne = ref("");
const selectOne = ref("");
const selectItems = ref(["Select1", "Select2", "Select3"]);
</script>

<template>
  <div class="flex flex-col gap-4">
    <h2 class="text-xl font-medium">Part 1</h2>

    <div class="">
      <p class="">Count {{ count }}</p>
      <NuxtUIButtonComponent @click="count++">Inc++</NuxtUIButtonComponent>
    </div>

    <div>
      <p>Raw HTML</p>
      <p v-html="rawHtml" />
    </div>

    <div>
      <p>Attribute Binding</p>
      <p :key="bindKey" v-bind:title="bindTitle">Hover to see the title.</p>
      <p v-bind="groupKeys">Dynamic Binding multiple attributes.</p>
    </div>

    <div>
      <p>Directives</p>
      <NuxtUIButtonComponent v-on:click="toggleSawMe()"
        >Try to click</NuxtUIButtonComponent
      >
      <NuxtUIButtonComponent @click="toggleSawMe()"
        >Try Me Also</NuxtUIButtonComponent
      >
      <p v-if="sawMe">Now you can see me</p>
      <p class="text-red-500" :class="{ italic: sawMe }">
        {{ afterSeeingMe }}
      </p>
    </div>

    <div>
      <p>Modifiers</p>
      <form @submit.prevent="modifiersExample">
        <NuxtUIButtonComponent type="submit"
          >Try to click</NuxtUIButtonComponent
        >
      </form>

      <div @click.ctrl="toggleKeyPressedOne()">
        <p>Press CTRL + click to change size</p>
        <p class="text-sm" :class="{ 'text-xl': keyPressedOne }">Small Text</p>
      </div>
    </div>

    <div>
      <p>Conditional Rendering</p>
      <NuxtUIButtonComponent @click="toggleConditionTwo()"
        >Toggle Button 2</NuxtUIButtonComponent
      >
      <p v-if="conditionTwo">Condition Two is true</p>
      <p v-else-if="!conditionTwo">Condition Two is false Now</p>
      <p v-else="conditionTwo">Try Again</p>
      <p v-show="conditionTwo">Shwoing Upon True</p>
    </div>

    <div>
      <p>List Rendering</p>
      <ul>
        <li v-for="item in listOne" :key="item">{{ item }}</li>
      </ul>
    </div>

    <div>
      <p>Form Binding</p>
      <p>Input</p>
      <NuxtUIInputComponent
        v-model="inputOne"
        placeholder="Type something..."
      />
      <p class="text-xl">You typed: {{ inputOne }}</p>
    </div>

    <div>
      <p>Textarea</p>
      <NuxtUITextareaComponent
        v-model="textareaOne"
        placeholder="Type something in textarea..."
      />
      <p class="text-xl">You typed: {{ textareaOne }}</p>
    </div>

    <div>
      <p>Checkbox</p>
      <NuxtUICheckboxComponent v-model="checkboxOne" label="Check me" />
      <p class="text-xl">Checkbox is: {{ checkboxOne }}</p>
    </div>

    <div>
      <p>Radio Group</p>
      <NuxtUIRadioGroupComponent
        v-model="radioGroupOne"
        :items="radioGroupItems"
      />
      <p class="text-xl">Selected: {{ radioGroupOne }}</p>
    </div>

    <div>
      <p>Select</p>

      <USelect v-model="selectOne" :items="selectItems" />
      <p class="text-xl">Selected: {{ selectOne }}</p>
    </div>
  </div>
</template>
