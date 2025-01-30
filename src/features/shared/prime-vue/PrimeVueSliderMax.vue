<script setup>
import Slider from "primevue/slider";
import { defineModel } from "vue";

const inputValue = defineModel("modelValue", {
  type: [String, Number],
  default: 0,
});
</script>

<template>
  <slot v-if="$slots.min" name="min"></slot>
  <Slider
    class=" "
    v-model="inputValue"
    v-bind="$attrs"
    :pt="{
      handle: () => ({
        class: 'w-12 h-12 bg-cg-100 before:bg-cg-100',
      }),
      root: () => ({
        class: 'h-4 bg-cg-2000',
      }),
      range: () => ({
        class: 'bg-cg-100',
      }),
    }"
  />
  <slot v-if="$slots.max" name="max"></slot>
  <slot v-if="$slots.actual" name="actual" :value="inputValue"></slot>
</template>
