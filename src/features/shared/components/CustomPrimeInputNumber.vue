<script setup>
import InputNumber from "primevue/inputnumber";
import { computed, inject, nextTick, onMounted, ref, watch } from "vue";
import CustomIcon from "@/src/features/shared/components/CustomIcon.vue";

const emit = defineEmits(["update:modelValue"]);
const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: "",
  },
  name: {
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
  iconRight: {
    type: String,
    default: null,
  },
  locale: {
    type: String,
    default: null,
  },
  max: {
    type: [Number, String],
    default: null,
  },
  min: {
    type: [Number, String],
    default: null,
  },
  maxFractionDigits: {
    type: [Number, String],
    default: null,
  },
  useGrouping: {
    type: Boolean,
    default: false,
  },
  numeric: {
    type: Boolean,
    default: false,
  },
});
const value = ref(
  props.modelValue || props.modelValue === 0 ? props.modelValue : null,
);

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
  valid.value = inputRef.value.$el.querySelector("input").validity.valid;
};

watch(
  () => props.modelValue,
  v => {
    value.value = v;
  },
);

const updateValue = emittedValue => {
  value.value = emittedValue.value;
  checkValidity();
  emit("update:modelValue", emittedValue.value);
};

onMounted(() => {
  const input = inputRef.value.$el.querySelector("input");
  input.setAttribute("name", props.name);
  checkValidity();
});

watch(
  () => props.required,
  () => {
    nextTick(() => {
      checkValidity();
    });
  },
);

function focusInput() {
  const input = inputRef.value.$el.querySelector("input");
  input.focus();
}

watch(
  () => value.value,
  v => {
    emit("update:modelValue", v);
  },
);

const keyUpHandler = e => {
  if (e.keyCode === 8 && e.srcElement.value.length === 0) {
    value.value = "";
  }
};

defineExpose({
  focusInput,
  updateValue,
  value,
});
</script>

<template>
  <div class="flex flex-col gap-4">
    <label v-if="$slots.label" class="mb-3 text-sm font-medium text-gray-700">
      <slot name="label"></slot>
    </label>
    <div
      :class="[
        'transition-outline flex w-full cursor-text items-center gap-2 rounded-lg border px-7 duration-300 placeholder:text-gray-500 focus:outline focus:outline-4',
        {
          'text-error-500': inputErrors,
          'text-gray-700': !inputErrors,
          'min-h-[36px] text-sm placeholder:text-sm': size === 'sm',
          'min-h-[44px] text-md placeholder:text-md': size === 'md',
          'border-gray-300 outline-gray-300/[.3]':
            !inputErrors &&
            !warning &&
            !error &&
            !(warningOnInvalid && !valid) &&
            !(errorOnInvalid && !valid),
          'shadow-[0_0_10px_-6px_rgba(0,0,0,0.3)]': shadow,
          'bg-base-white': !warning,
          'border-warning-400 bg-warning-500/[.1] outline-warning-300/[.2]':
            warning || (warningOnInvalid && !valid),
          'border-error-400 bg-error-50 outline-error-300/[.2]':
            error || (errorOnInvalid && !valid),
          'opacity-50': disabled,
        },
      ]"
      @click="focusInput"
    >
      <div v-if="iconLeft">
        <CustomIcon :name="iconLeft" width="20" height="20" />
      </div>
      <div v-else-if="$slots.iconLeft">
        <slot name="iconLeft"></slot>
      </div>
      <InputNumber
        ref="inputRef"
        v-model="value"
        v-bind="locale ? { locale } : {}"
        class="grow"
        type="number"
        :disabled="disabled"
        :placeholder="placeholder ? placeholder : $t('global.pleaseEnter')"
        :name="name"
        :required="required"
        :max="max ? parseInt(max) : null"
        :min="min ? parseInt(min) : null"
        :max-fraction-digits="maxFractionDigits"
        :input-props="{
          required: required,
          class: 'border-none outline-none shadow-none',
          inputmode: numeric ? 'numeric' : null,
          pattern: numeric ? '[0-9]*' : null,
        }"
        :use-grouping="useGrouping"
        :input-class="[
          'outline-none w-full transition-all duration-300',
          {
            'bg-warning-500/[.1]': warning || (warningOnInvalid && !valid),
            'bg-error-50': error || (errorOnInvalid && !valid),
          },
        ]"
        @input="updateValue"
        @keyup="keyUpHandler"
      />
      <div v-if="iconRight">
        <CustomIcon :name="iconRight" width="20" height="20" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
