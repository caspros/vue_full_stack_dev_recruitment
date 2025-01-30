<script setup>
import {
  ref,
  defineProps,
  defineEmits,
  inject,
  computed,
  Transition,
  watch,
  nextTick,
  onMounted,
} from "vue";
import CustomIcon from "@/src/features/shared/components/CustomIcon.vue";
import { removeLettersFromString } from "@/src/features/shared/utils/removeLettersFromString.js";

const emit = defineEmits(["update:modelValue", "enter", "keyup"]);
const isPasswordVisible = ref(false);

const disabledForm = inject("form-disabled", null);
const errors = inject("form-errors", null);
// const errorsShow = inject("form-errors-show", true);

const props = defineProps({
  modelValue: {
    type: [String, Number, null, Object, Array],
    default: "",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    default: "text",
  },
  size: {
    type: String,
    default: "md",
    validator: value => ["lg", "md", "sm"].includes(value),
  },
  required: {
    type: Boolean,
    default: false,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  clickable: {
    type: Boolean,
    default: false,
  },
  outlined: {
    type: Boolean,
    default: false,
  },
  name: {
    type: String,
    default: null,
  },
  placeholder: {
    type: String,
    default: null,
  },
  minlength: {
    type: [String, Number],
    default: null,
  },
  maxlength: {
    type: [String, Number],
    default: null,
  },
  min: {
    type: [String, Number],
    default: null,
  },
  max: {
    type: [String, Number],
    default: null,
  },
  shadow: {
    type: Boolean,
    default: true,
  },
  textarea: {
    type: Boolean,
    default: false,
  },
  rows: {
    type: [Number, String],
    default: null,
  },
  success: {
    type: Boolean,
    default: false,
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
    type: [Boolean, String],
    default: false,
  },
  errorOnInvalid: {
    type: Boolean,
    default: false,
  },
  hideText: {
    type: Boolean,
    default: false,
  },
  preventSubmitOnEnter: {
    type: Boolean,
    default: false,
  },
  border: {
    type: Boolean,
    default: true,
  },
  pattern: {
    type: String,
    default: null,
  },
  inputmode: {
    type: String,
    default: null,
  },
  stripLetters: {
    type: Boolean,
    default: false,
  },
  iconLeft: {
    type: String,
    default: null,
  },
});

const inputErrors = computed(() => {
  return errors &&
    errors.value &&
    errors.value[props.name] &&
    errors.value[props.name].length > 0
    ? errors.value[props.name]
    : null;
});

const valid = ref(true);
const isFocused = ref(false);
const inputValue = ref(null);

const updateValue = event => {
  checkValidity();
  let value = event.target.value;
  if (props.stripLetters) {
    event.target.value = removeLettersFromString(event.target.value);
    value = event.target.value;
  }
  inputValue.value = props.type === "number" && value ? Number(value) : value;
  emit("update:modelValue", inputValue.value);
};

watch(
  () => props.modelValue,
  function (v) {
    inputValue.value = v;
    nextTick(() => {
      inputRef.value.dispatchEvent(
        new Event("change", {
          bubbles: true,
        }),
      );
    });
  },
);

const togglePasswordVisibility = () => {
  isPasswordVisible.value = !isPasswordVisible.value;
};

const keydownEnter = e => {
  if (!props.preventSubmitOnEnter) return;
  e.preventDefault();
  emit("enter", inputValue.value);
};

const checkValidity = () => {
  if (!inputRef.value) {
    return;
  }
  valid.value = inputRef.value.validity.valid;
};

const inputRef = ref(null);

onMounted(() => {
  checkValidity();
});

const keyUpValue = () => {
  emit("keyup", inputValue.value);
};

function focus() {
  inputRef.value.focus();
}

defineExpose({
  focus,
});
</script>

<template>
  <div class="flex flex-col">
    <label v-if="$slots.label" class="mb-3 text-sm font-medium text-gray-700">
      <slot name="label"></slot>
    </label>
    <div
      :class="[
        'transition-outline flex items-center duration-300',
        {
          'rounded-lg border': border,
          'relative': readonly,
          'outline outline-4': isFocused || outlined,
          'border-error-500': inputErrors,
          'border-gray-300 outline-gray-300/[.3]':
            !inputErrors &&
            !warning &&
            !error &&
            !success &&
            !(warningOnInvalid && !valid) &&
            !(errorOnInvalid && !valid),
          'min-h-[36px] text-sm placeholder:text-sm': size === 'sm',
          'min-h-[44px] text-md placeholder:text-md': size === 'md',
          'min-h-[52px] text-md placeholder:text-md': size === 'lg',
          'cursor-text': !readonly,
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
      @click="!readonly ? inputRef.focus() : null"
    >
      <div v-if="readonly" class="absolute z-20 h-full w-full"></div>
      <div
        v-if="type === 'password' || $slots.iconLeft || iconLeft"
        class="flex h-full cursor-text items-center pl-4"
        @click="inputRef.focus()"
      >
        <slot name="iconLeft">
          <CustomIcon v-if="iconLeft" :name="iconLeft" />
        </slot>
      </div>
      <div
        v-if="$slots.replaceInput"
        :class="[
          'relative z-20 h-full w-full bg-transparent px-7 outline-none placeholder:text-gray-500',
          {
            'text-error-500': inputErrors && !hideText,
            'text-gray-700': !inputErrors && !hideText,
            'cursor-default': readonly && !clickable,
            'cursor-pointer': readonly && clickable,
            'select-none': readonly,
            'resize-none py-5': textarea,
          },
        ]"
      >
        <slot name="replaceInput"></slot>
      </div>
      <component
        v-show="!$slots.replaceInput"
        :is="textarea ? 'textarea' : 'input'"
        ref="inputRef"
        :class="[
          'h-full w-full border-none bg-transparent px-7 outline-none placeholder:text-gray-500',
          {
            'text-error-500': inputErrors && !hideText,
            'text-gray-700': !inputErrors && !hideText,
            'text-transparent': hideText || $slots.replaceInput,
            'cursor-default': readonly && !clickable,
            'cursor-pointer': readonly && clickable,
            'select-none': readonly,
            'resize-none py-5': textarea,
          },
        ]"
        :rows="rows"
        :type="isPasswordVisible ? 'text' : type"
        :value="modelValue"
        :placeholder="placeholder"
        :minlength="minlength"
        :maxlength="maxlength"
        :min="min"
        :max="max"
        :name="name"
        :required="required"
        :disabled="disabled"
        :pattern="pattern"
        :inputmode="inputmode"
        @input="updateValue"
        @keyup="keyUpValue"
        @change="checkValidity"
        @focus="isFocused = true"
        @blur="isFocused = false"
        @keydown.enter="keydownEnter"
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
      <div
        v-if="type === 'password' || $slots.iconRight"
        class="flex h-full cursor-text items-center pr-7"
        @click="inputRef.focus()"
      >
        <slot name="iconRight">
          <CustomIcon
            v-if="type === 'password'"
            class="cursor-pointer"
            :name="!isPasswordVisible ? 'eye' : 'eye-off'"
            @click="togglePasswordVisibility"
          />
        </slot>
      </div>
    </div>
    <div
      :class="[
        'transition-all duration-300',
        {
          'h-[26px]': inputErrors,
          'h-[0px]': !inputErrors,
          'text-sm': size === 'sm',
        },
      ]"
    >
      <Transition :name="false ? 'slide-up-only' : ''">
        <div
          v-if="errors && errors[name] && errors[name].length > 0"
          class="mt-3 text-sm text-error-500"
        >
          <template v-for="(error, index) in inputErrors" :key="index">
            {{ $t(error)
            }}<template v-if="index !== inputErrors.length - 1">, </template
            ><template v-else>.</template>
          </template>
        </div>
      </Transition>
    </div>
  </div>
</template>

<style scoped>
/* Możesz dodać tutaj style dla swojego inputa, jeśli chcesz */
</style>
