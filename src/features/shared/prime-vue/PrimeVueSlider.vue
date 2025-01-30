<script setup>
import Slider from "primevue/slider";
import PrimeVueLabel from "@/src/features/shared/prime-vue/PrimeVueLabel.vue";
import { defineModel } from "vue";

const inputValue = defineModel("modelValue", {
  type: [String, Number],
  default: 0,
});
</script>

<template>
  <div class="grid grid-cols-[180px_auto]">
    <PrimeVueLabel class="!mb-0">
      <slot />
    </PrimeVueLabel>
    <div class="flex flex-col gap-10 pt-4">
      <Slider v-model="inputValue" :step="1" :min="0" :max="5" />
      <div class="flex justify-between text-sm text-gray-500">
        <div>0</div>
        <div>5</div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
