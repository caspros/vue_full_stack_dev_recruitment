<script>
const VARIANT_MAP = {
  primary: "peer-checked:bg-brand-500",
};
</script>

<script setup>
import InputSwitch from "primevue/inputswitch";
import { generateUniqueId } from "../utils/generateUniqueId.js";

const props = defineProps({
  variant: {
    type: String,
    default: "primary",
    validator(value) {
      return Object.keys(VARIANT_MAP).indexOf(value) !== -1;
    },
  },
  revertLabel: {
    type: Boolean,
    default: false,
  },
});

const ID = generateUniqueId();
</script>

<template>
  <div class="flex items-center gap-4">
    <label v-if="$slots.label && revertLabel" :for="ID" class="cursor-pointer">
      <slot name="label" />
    </label>
    <InputSwitch
      v-bind="$attrs"
      class="[&_.p-inputswitch-slider]:before:content-['']"
      :pt="{
        slider: {
          class: [VARIANT_MAP[variant], 'before:peer-checked:translate-x-full'],
        },
        input: {
          class: ['peer'],
        },
      }"
      :input-id="ID"
    />
    <label v-if="$slots.label && !revertLabel" :for="ID" class="cursor-pointer">
      <slot name="label" />
    </label>
  </div>
</template>
