<script setup>
import { computed } from "vue";
import { RouterLink } from "vue-router";

const props = defineProps({
  to: {
    type: String,
    default: "",
  },
});

const linkComponent = computed(() => {
  if (props.to) {
    return RouterLink;
  }

  return "a";
});
</script>

<template>
  <p class="text-xs font-medium text-gray-600">
    <slot name="text" /> {{ " " }}
    <component
      :is="linkComponent"
      v-bind="to ? { to } : {}"
      class="cursor-pointer text-pink-900 transition-colors hover:text-brand-400"
    >
      <slot name="link" />
    </component>
  </p>
</template>
