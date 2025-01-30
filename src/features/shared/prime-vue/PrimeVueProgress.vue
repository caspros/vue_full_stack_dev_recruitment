<script>
const VARIANT_MAP = {
  success: ["bg-green-600", "bg-opacity-90"],
  primary: ["bg-cg-3800", "bg-opacity-90"],
};
</script>

<script setup>
import ProgressBar from "primevue/progressbar";

defineProps({
  variant: {
    type: String,
    default: "success",
    validator(value) {
      return Object.keys(VARIANT_MAP).includes(value);
    },
  },
  height: {
    type: String,
    default: "h-6",
  },
});
</script>

<template>
  <ProgressBar
    :pt="{
      value: {
        class: VARIANT_MAP[variant],
      },
      root: {
        class: ['rounded-xl', height, 'bg-gray-200'],
      },
    }"
  >
    <slot></slot>
  </ProgressBar>
</template>
