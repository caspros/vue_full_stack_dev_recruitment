<script setup>
const SIZES = {
  sm: "h-1",
  md: "h-1.5",
  lg: "h-2",
  xl: "h-2 ",
  "2xl": "h-2.5",
};

defineProps({
  color: {
    type: String,
    default: "white",
  },
  size: {
    type: String,
    default: "md",
    validator: function (value) {
      return ["sm", "md", "lg", "xl", "2xl"].indexOf(value) !== -1;
    },
  },
});
</script>

<template>
  <div class="flex items-center justify-center space-x-2">
    <span class="sr-only">Loading...</span>
    <div
      class="aspect-square animate-bounce rounded-full [animation-delay:-0.3s]"
      :class="`bg-${color} ${SIZES[size]}`"
    ></div>
    <div
      class="aspect-square animate-bounce rounded-full [animation-delay:-0.15s]"
      :class="`bg-${color} ${SIZES[size]}`"
    ></div>
    <div
      class="aspect-square animate-bounce rounded-full"
      :class="`bg-${color} ${SIZES[size]}`"
    ></div>
  </div>
</template>
