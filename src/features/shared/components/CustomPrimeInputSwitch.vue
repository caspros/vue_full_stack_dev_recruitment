<script setup>
import InputSwitch from "primevue/inputswitch";
import { ref } from "vue";

const emit = defineEmits(["update:modelValue"]);
const props = defineProps({
  label: {
    type: String,
    default: "",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  colored: {
    type: Boolean,
    default: false,
  },
  modelValue: {
    type: Boolean,
    default: null,
  },
  reverse: {
    type: Boolean,
    default: false,
  },
});

const checked = ref(
  props.modelValue === true || props.modelValue === false
    ? props.modelValue
    : false,
);
</script>

<template>
  <div>
    <InputSwitch v-model="checked" />
    <label>
      <slot name="label"></slot>
    </label>
  </div>
</template>

<style lang="scss">
[data-pc-name="inputswitch"] {
  @apply relative inline-flex h-[20px] w-[20px] flex-shrink-0 items-center rounded-full border-2 border-transparent bg-brand-600 outline-brand-100/[.2] duration-200 ease-in-out;
  //'bg-brand-600 outline-brand-100/[.2]':
  //isActive && !disabled && !colored,
  //'hover:bg-gray-400 bg-gray-300 outline-gray-300/[.3]':
  //!isActive && !disabled && !colored,
  //'bg-gray-50 outline-none': disabled,
  //'cursor-pointer': !disabled,
}
</style>
