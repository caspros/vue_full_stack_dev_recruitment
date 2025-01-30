<script setup>
import Checkbox from "primevue/checkbox";
import { generateUniqueId } from "../utils/generateUniqueId.js";
import PrimeVueErrors from "@/src/features/shared/prime-vue/PrimeVueErrors.vue";

const props = defineProps({
  errors: {
    type: Array,
    default: () => [],
  },
  placeholder: {
    type: String,
    default: null,
  },
});

const id = generateUniqueId();
</script>

<template>
  <div class="flex items-center gap-4">
    <Checkbox
      v-bind="$attrs"
      :input-class="['border']"
      :input-id="id"
      :pt="{
        input: {
          class: [''],
        },
      }"
    />
    <div>
      <label class="cursor-pointer select-none text-sm" :for="id">
        <slot name="label"></slot>
      </label>
      <PrimeVueErrors :errors="errors" />
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
