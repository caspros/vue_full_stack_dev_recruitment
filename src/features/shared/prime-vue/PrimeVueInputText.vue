<script setup>
import InputText from "primevue/inputtext";
import CustomIcon from "../components/CustomIcon.vue";
import { defineModel } from "vue";
import PrimeVueErrors from "@/src/features/shared/prime-vue/PrimeVueErrors.vue";
import PrimeVueLabel from "@/src/features/shared/prime-vue/PrimeVueLabel.vue";

const props = defineProps({
  errors: {
    type: Array,
    default: () => [],
  },
  placeholder: {
    type: String,
    default: null,
  },
  size: {
    type: String,
    default: "sm",
  },
  iconRight: {
    type: String,
    default: null,
  },
  dataTestAttr: {
    type: String,
    default: null,
  },
});

const inputValue = defineModel("modelValue", {
  type: String,
  default: null,
});
</script>

<template>
  <div>
    <PrimeVueLabel v-if="$slots.label" class="mb-3">
      <slot name="label"></slot>
    </PrimeVueLabel>
    <div class="relative">
      <InputText
        v-model="inputValue"
        :class="[
          'w-full border px-6 hover:border-gray-400',
          {
            'border-error-500 outline-error-500': errors.length,
            'min-h-[36px]': size === 'sm',
            'min-h-[44px]': size === 'md',
          },
        ]"
        :placeholder="placeholder ? placeholder : $t('global.pleaseEnter')"
        v-bind="$attrs"
        :data-test-attr="dataTestAttr"
      />
      <CustomIcon
        v-if="errors.length"
        class="absolute right-7 top-1/2 -translate-y-[50%] text-error-500"
        name="alert-circle"
        width="16"
        height="16"
      />
      <CustomIcon
        v-if="iconRight"
        class="absolute right-7 top-1/2 -translate-y-[50%] text-gray-700"
        :name="iconRight"
        width="16"
        height="16"
      />
    </div>
    <PrimeVueErrors :errors="errors" />
  </div>
</template>
