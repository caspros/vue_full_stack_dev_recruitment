<script setup>
import InputNumber from "primevue/inputnumber";
import CustomIcon from "../components/CustomIcon.vue";
import { ref, watch } from "vue";
import PrimeVueErrors from "@/src/features/shared/prime-vue/PrimeVueErrors.vue";
import PrimeVueLabel from "@/src/features/shared/prime-vue/PrimeVueLabel.vue";

const emits = defineEmits(["update:modelValue"]);
const props = defineProps({
  modelValue: {
    type: [Number, null],
    default: null,
  },
  errors: {
    type: Array,
    default: () => [],
  },
  placeholder: {
    type: String,
    default: null,
  },
  iconLeft: {
    type: String,
    default: null,
  },
  iconRight: {
    type: String,
    default: null,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  currency: {
    type: Boolean,
    default: false,
  },
  maxFractionDigits: {
    type: [Number, String],
    default: 0,
  },
  tooltip: {
    type: [String, Object],
    default: null,
  },
  rightJoin: {
    type: Boolean,
    default: false,
  },
});

const inputValue = ref(null);

watch(
  () => props.modelValue,
  v => {
    inputValue.value = v;
  },
  {
    immediate: true,
  },
);

// const input = ref(null);
// const focus = () =>
//   setTimeout(() => {
//     input.value.focused = true;
//     console.log(input.value);
//   }, 100);
//
// defineExpose({
//   focus,
// });
</script>

<template>
  <div>
    <PrimeVueLabel v-if="$slots.label" class="mb-3">
      <slot name="label"></slot>
    </PrimeVueLabel>
    <div class="relative">
      <InputNumber
        ref="input"
        v-bind="
          () => {
            let attrs = JSON.parse(JSON.stringify($attrs));
            delete attrs.value;
            return $attrs;
          }
        "
        v-model="inputValue"
        :class="['min-h-[36px] w-full']"
        :input-class="[
          'px-6 min-w-[200px] border hover:border-gray-400',
          {
            'pl-22': iconLeft,
            'pr-22': iconRight,
            'border-error-500 outline-error-500': errors.length,
            'rounded-r-none': rightJoin,
          },
        ]"
        :placeholder="placeholder ? placeholder : $t('global.pleaseEnter')"
        locale="de-DE"
        :use-grouping="currency"
        :max="currency ? 9999 : null"
        :max-fraction-digits="currency ? 2 : maxFractionDigits"
        :min-fraction-digits="currency ? 2 : 0"
        :disabled="disabled"
        fluid
        @input="
          v => {
            emits(
              'update:modelValue',
              v.value > 9999 && currency ? 9999 : v.value,
            );
          }
        "
      />
      <CustomIcon
        v-if="iconLeft"
        class="absolute left-7 top-1/2 -translate-y-[50%] text-gray-500"
        :name="iconLeft"
        width="24"
        height="24"
      />
      <CustomIcon
        v-if="tooltip"
        v-tooltip.left="tooltip"
        class="absolute right-7 top-1/2 -translate-y-[50%] text-gray-500"
        name="help-circle"
        width="16"
        height="16"
      />
      <CustomIcon
        v-if="iconRight"
        class="absolute right-7 top-1/2 -translate-y-[50%] text-gray-500"
        :name="iconRight"
        width="24"
        height="24"
      />
    </div>
    <PrimeVueErrors :errors="errors" />
  </div>
</template>

<style scoped lang="scss"></style>
