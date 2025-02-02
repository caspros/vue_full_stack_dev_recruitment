<script setup>
import InputText from "primevue/inputtext";
import { computed, inject, onMounted, ref, watch } from "vue";
import CustomIcon from "@/src/features/shared/components/CustomIcon.vue";
import InputMask from "primevue/inputmask";

const emit = defineEmits(["update:modelValue", "update:valid"]);
const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  name: {
    type: String,
    default: null,
  },
  type: {
    type: String,
    default: null,
  },
  size: {
    type: String,
    default: "md",
    validator: value => ["lg", "md", "sm"].includes(value),
  },
  warning: {
    type: Boolean,
    default: false,
  },
  warningOnInvalid: {
    type: Boolean,
    default: false,
  },
  success: {
    type: Boolean,
    default: false,
  },
  error: {
    type: Boolean,
    default: false,
  },
  errorOnInvalid: {
    type: Boolean,
    default: false,
  },
  required: {
    type: Boolean,
    default: false,
  },
  shadow: {
    type: Boolean,
    default: true,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  placeholder: {
    type: String,
    default: null,
  },
  iconLeft: {
    type: String,
    default: null,
  },
  mask: {
    type: String,
    default: null,
  },
  numbers: {
    type: Boolean,
    default: false,
  },
  inputmode: {
    type: String,
    default: null,
  },
});
const isFocused = ref(false);
const value = ref(props.modelValue);

const errors = inject("form-errors", null);
const inputErrors = computed(() => {
  return errors &&
    errors.value &&
    errors.value[props.name] &&
    errors.value[props.name].length > 0
    ? errors.value[props.name]
    : null;
});

const valid = ref(true);
const inputRef = ref(null);
const checkValidity = () => {
  if (!inputRef.value) {
    return;
  }
  valid.value = inputRef.value.$el.validity.valid;
};
const updateValue = v => {
  if (props.numbers) {
    v = v.replace(/\D/g, "");
    value.value = v;
    inputRef.value.$el.value = v;
  }
  checkValidity();
  emit("update:modelValue", v);
};

onMounted(() => {
  checkValidity();
});

function focusInput() {
  const input = inputRef.value.$el;
  input.focus();
}

watch(
  () => props.modelValue,
  v => {
    value.value = v;
  },
);

watch(
  () => valid.value,
  v => {
    emit("update:valid", v);
  },
  {
    immediate: true,
  },
);

defineExpose({
  focusInput,
});
</script>

<template>
  <div class="relative flex flex-col gap-4">
    <label v-if="$slots.label" class="mb-3 text-sm font-medium text-gray-700">
      <slot name="label"></slot>
    </label>
    <div
      :class="[
        'transition-outline flex w-full cursor-text items-center gap-2 rounded-lg border px-7 duration-300 placeholder:text-gray-500',
        {
          'outline outline-4': isFocused,
          'text-error-500': inputErrors,
          'text-gray-700': !inputErrors,
          'min-h-[36px] text-sm placeholder:text-sm': size === 'sm',
          'min-h-[44px] text-md placeholder:text-md': size === 'md',
          'border-gray-300 outline-gray-300/[.3]':
            !inputErrors &&
            !warning &&
            !error &&
            !success &&
            !(warningOnInvalid && !valid) &&
            !(errorOnInvalid && !valid),
          'shadow-[0_0_10px_-6px_rgba(0,0,0,0.3)]': shadow,
          'bg-base-white': !warning,
          'border-warning-400 bg-warning-500/[.1] outline-warning-300/[.2]':
            warning || (warningOnInvalid && !valid),
          'border-error-400 bg-error-50 outline-error-300/[.2]':
            error || (errorOnInvalid && !valid),
          'border-cg-900 outline-cg-900/[.2]': success,
          'opacity-50': disabled,
        },
      ]"
      @click="inputRef.$el.focus()"
    >
      <div v-if="iconLeft">
        <CustomIcon :name="iconLeft" width="20" height="20" />
      </div>
      <div v-else-if="$slots.iconLeft">
        <slot name="iconLeft"></slot>
      </div>
      <component
        :is="mask ? InputMask : InputText"
        v-model="value"
        ref="inputRef"
        :mask="mask"
        :disabled="disabled"
        :type="type ? type : 'text'"
        :placeholder="placeholder ? placeholder : $t('global.pleaseEnter')"
        :inputmode="inputmode ? inputmode : 'text'"
        :name="name"
        :required="required"
        unstyled
        :class="[
          'grow border-none outline-none transition-all duration-300',
          {
            'bg-warning-100/[.1]': warning || (warningOnInvalid && !valid),
            'bg-error-50': error || (errorOnInvalid && !valid),
          },
        ]"
        @focusin="isFocused = true"
        @focusout="isFocused = false"
        @update:model-value="updateValue"
      />
      <div v-if="success" class="mr-4">
        <CustomIcon
          v-if="success"
          name="check"
          width="16"
          height="16"
          class="text-cg-900"
        />
      </div>
    </div>
    <slot name="error"></slot>
  </div>
</template>

<style scoped lang="scss"></style>
