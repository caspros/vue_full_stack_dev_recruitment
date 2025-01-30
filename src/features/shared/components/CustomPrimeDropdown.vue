<script setup>
import Dropdown from "primevue/dropdown";
import MultiSelect from "primevue/multiselect";
import CustomIcon from "@/src/features/shared/components/CustomIcon.vue";
import InputText from "primevue/inputtext";
import { computed, inject, nextTick, onMounted, ref, watch } from "vue";
import CustomBadge from "@/src/features/shared/components/CustomBadge.vue";

const props = defineProps({
  modelValue: {
    type: [Object, String, Number],
    default: null,
  },
  size: {
    type: String,
    default: "md",
    validator: value => ["lg", "md", "sm", "xs"].includes(value),
  },
  options: {
    type: Array,
    required: true,
  },
  border: {
    type: Boolean,
    default: true,
  },
  name: {
    type: String,
    default: "",
  },
  placeholder: {
    type: String,
    default: null,
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
  field: {
    type: String,
    default: null,
  },
  shadow: {
    type: Boolean,
    default: true,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  required: {
    type: Boolean,
    default: false,
  },
  filter: {
    type: Function,
    default: null,
  },
  showClear: {
    type: Boolean,
    default: false,
  },
  multiselect: {
    type: Boolean,
    default: false,
  },
  optionValue: {
    type: String,
    default: null,
  },
  isFilterImediately: {
    type: Boolean,
    default: true,
  },
});
const emit = defineEmits(["update:modelValue"]);
const selectValue = ref(props.modelValue);

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
const updateValue = value => {
  nextTick(() => {
    inputRef.value.$el.dispatchEvent(
      new Event("change", {
        bubbles: true,
      }),
    );
    checkValidity();
  });
  emit("update:modelValue", value);
};

const isOpen = ref(false);

const filterValue = ref("");
const filterDelay = ref(null);
const filterOptions = value => {
  if (filterDelay.value) {
    clearTimeout(filterDelay.value);
  }
  filterDelay.value = setTimeout(() => {
    props.filter(value);
  }, 300);
};

const filterValueInput = ref(null);
const showOptionsList = () => {
  isOpen.value = true;
  if (!!props.filter) {
    nextTick(() => {
      filterValueInput.value.$el.focus();
    });
  }
};

onMounted(() => {
  checkValidity();
  if (!!props.filter && props.isFilterImediately) {
    filterOptions("");
  }
});

watch(
  () => props.modelValue,
  v => {
    selectValue.value = v;
  },
);

const checkSelection = option => {
  if (!props.multiselect) {
    return selectValue.value && typeof selectValue.value === "object"
      ? option.id === selectValue.value.id
      : option === selectValue.value;
  }
  return false;
};

const componentInstance = ref(null);
const isFocus = ref(false);
watch(
  () => componentInstance.value?.$params,
  v => {
    isFocus.value = v.state.focused;
  },
  {
    deep: true,
  },
);
</script>

<template>
  <div class="flex flex-col gap-4">
    <label v-if="$slots.label" class="mb-3 text-sm font-medium text-gray-700">
      <slot name="label"></slot>
    </label>
    <InputText
      v-show="false"
      ref="inputRef"
      type="text"
      :model-value="
        selectValue || selectValue === false ? JSON.stringify(selectValue) : ''
      "
      :name="name"
      :required="required"
      class="border-none"
      unstyled
    />
    <component
      :is="multiselect ? MultiSelect : Dropdown"
      ref="componentInstance"
      v-model="selectValue"
      :class="[
        'transition-outline flex w-full items-center justify-between gap-2 px-7 py-2 duration-300',
        {
          'rounded-lg border': border,
          'outline outline-4': (isOpen || isFocus) && border,
          'text-error-500': inputErrors,
          'text-gray-700': !inputErrors,
          'min-h-[30px] text-sm': size === 'xs',
          'min-h-[36px] text-sm': size === 'sm',
          'text-mds min-h-[44px]': size === 'md',
          'border-gray-300 outline-gray-300/[.3]':
            !inputErrors &&
            !warning &&
            !error &&
            !(warningOnInvalid && !valid) &&
            !(errorOnInvalid && !valid),
          'shadow-[0_0_10px_-6px_rgba(0,0,0,0.3)]': shadow && border,
          'bg-base-white': !warning,
          'border-warning-400 bg-warning-500/[.1] outline-warning-300/[.2]':
            warning || (warningOnInvalid && !valid),
          'border-error-400 bg-error-50 outline-error-300/[.2]':
            error || (errorOnInvalid && !valid),
          'opacity-50': disabled,
          'cursor-pointer': !disabled,
        },
      ]"
      :options="options"
      :placeholder="placeholder ? placeholder : $t('global.pleaseChoose')"
      :disabled="disabled"
      panel-class="bg-base-white border border-gray-300 rounded-lg text-sm cursor-pointer max-h-[320px] mt-2 overflow-y-auto overflow-x-hidden outline-none"
      input-class="outline-none grow"
      :show-clear="showClear"
      :pt="{
        trigger: ({ props, state, context }) => ({
          class: state.overlayVisible
            ? 'rotate-180 transition duration-100'
            : 'bg-base-white transition duration-100',
        }),
        item: ({ props, state, context }) => ({
          class:
            context.selected || context.focused
              ? 'bg-gray-50'
              : 'bg-base-white hover:bg-gray-50',
        }),
        transition: ({ props, state, context }) => ({
          name: 'slide-up-only-fast',
        }),
      }"
      @update:model-value="updateValue"
      @show="showOptionsList"
      @hide="isOpen = false"
      :optionValue="optionValue"
    >
      <template #empty>
        <div
          :class="[
            'px-6 py-4 text-gray-500',
            { 'text-sm': size === 'sm', 'text-md': size === 'md' },
          ]"
        >
          {{ $t("global.noResults") }}
        </div>
      </template>
      <template v-if="multiselect" #closeicon>
        <div></div>
      </template>
      <template v-if="multiselect" #itemcheckboxicon>
        <div></div>
      </template>
      <template v-if="multiselect" #headercheckboxicon>
        <div></div>
      </template>
      <template #value="{ value, placeholder }">
        <template v-if="!filter || (!!filter && !isOpen)">
          <template v-if="!multiselect">
            <div v-if="value">
              <div>
                <slot name="value" :value="value">{{ value }}</slot>
              </div>
            </div>
            <div
              v-else
              :class="[
                'text-gray-500',
                { 'text-sm': size === 'sm', 'text-md': size === 'md' },
              ]"
            >
              <slot name="placeholder" :placeholder="placeholder">
                {{ !!filter ? $t("global.typeToSearch") : placeholder }}
              </slot>
            </div>
          </template>
          <div v-else class="flex flex-wrap gap-4">
            <template v-if="value && value.length > 0">
              <template v-for="(item, i) in value" :key="`item-${i}`">
                <CustomBadge class="text-nowrap" size="sm">
                  <slot name="value" :value="item">{{ item }}</slot>
                </CustomBadge>
              </template>
            </template>
            <div
              v-else
              :class="[
                'text-gray-500',
                { 'text-sm': size === 'sm', 'text-md': size === 'md' },
              ]"
            >
              <slot name="placeholder" :placeholder="placeholder">
                {{ !!filter ? $t("global.typeToSearch") : placeholder }}
              </slot>
            </div>
          </div>
        </template>
        <div v-else>
          <InputText
            ref="filterValueInput"
            v-model="filterValue"
            type="text"
            :class="[
              'w-full cursor-pointer border-none bg-transparent outline-none',
            ]"
            @update:model-value="filterOptions"
          />
        </div>
      </template>
      <template #option="{ option }">
        <div
          :class="[
            'flex items-center justify-between px-6 py-3 text-gray-700',
            {
              'bg-gray-50': checkSelection(option),
            },
          ]"
        >
          <div>
            <slot name="option" :option="option">
              {{ option }}
            </slot>
          </div>
          <div>
            <CustomIcon
              v-if="checkSelection(option)"
              width="16"
              height="16"
              name="check"
              class="text-brand-600"
            />
          </div>
        </div>
      </template>
    </component>
  </div>
</template>

<style scoped lang="scss"></style>
