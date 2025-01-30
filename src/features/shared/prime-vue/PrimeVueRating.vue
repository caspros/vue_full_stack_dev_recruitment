<script setup>
import Rating from "primevue/rating";
</script>

<template>
  <div class="flex items-center gap-4">
    <Rating v-bind="$attrs" :cancel="false" />
    <div class="text-sm font-medium text-gray-700">{{ $attrs.modelValue }}</div>
  </div>
</template>

<style scoped lang="scss"></style>
