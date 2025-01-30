<script setup>
import { computed, defineProps, watch } from "vue";
import CustomNav from "@/src/features/shared/components/CustomNav.vue";
import Loader from "@/src/features/shared/components/Loader.vue";

const emit = defineEmits(["click", "update:successState"]);
const props = defineProps({
  successState: {
    type: [Boolean, String],
    default: false,
  },
  error: {
    type: Boolean,
    default: false,
  },
  rounded: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    default: "button",
  },
  options: {
    type: Array,
    default: () => [],
  },
  linkColor: {
    type: String,
    default: "",
  },
  variant: {
    type: String,
    default: "primary",
    validator: function (value) {
      return (
        [
          "primary",
          "success",
          "error",
          "secondary-gray",
          "secondary-color",
          "tertiary-gray",
          "tertiary-color",
          "link-gray",
          "link-color",
        ].indexOf(value) !== -1
      );
    },
  },
  size: {
    type: String,
    default: "md",
    validator: function (value) {
      return ["sm", "md", "lg", "xl", "2xl"].indexOf(value) !== -1;
    },
  },
  dataTestAttr: {
    type: String,
    default: null,
  },
});

const allClasses = computed(() => {
  let classes =
    "flex items-center justify-center outline-none text-sm font-semibold transition-all duration-100 p-ripple border-solid";
  if (props.rounded) {
    classes += " !px-0 rounded-full";
  } else {
    classes += " rounded-lg";
  }
  if (props.disabled) {
    classes += " cursor-default";
  } else {
    classes += " cursor-pointer";
  }
  classes += ` ${variantClass.value} ${sizeClass.value}`;
  return classes;
});

watch(
  () => props.successState,
  v => {
    if (v) {
      setTimeout(() => {
        emit("update:successState", false);
      }, 1500);
    }
  },
);

const variantClass = computed(() => {
  if (props.disabled) {
    return `bg-gray-200 text-gray-400 border-none`;
  }
  if (props.successState) {
    return `bg-success-500 border-success-500 border text-base-white hover:bg-success-600 focus:bg-success-600 focus:border-success-600 disabled:text-gray-400 disabled:bg-gray-100`;
  }
  switch (props.variant) {
    case "primary":
      if (props.disabled) {
        return `bg-gray-200 text-gray-400 border-none`;
      } else if (props.error) {
        return `bg-error-500 text-base-white hover:bg-error-700 focus:bg-error-700 disabled:text-gray-400 disabled:bg-gray-100 border-none`;
      } else {
        return `bg-brand-500 text-base-white hover:bg-brand-700 focus:bg-brand-700 disabled:text-gray-400 disabled:bg-gray-100 border-none`;
      }
    case "tertiary-gray":
      if (props.disabled) {
        return "text-gray-400";
      }
      return "text-gray-600 border-[2px] border-none";
    case "secondary-gray":
      if (props.disabled) {
        return "bg-base-white border border-gray-200 text-gray-200";
      }
      return `bg-base-white border border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-gray-800 focus:shadow disabled:text-gray-400 disabled:text-gray-400 disabled:border-gray-400`;
    case "secondary-color":
      return `bg-brand-50 border-brand-100 border text-brand-500 hover:bg-brand-100 focus:bg-base-white focus:border-brand-300 disabled:text-gray-400 disabled:bg-gray-100`;
    case "blue":
      return `bg-blue-500 border-blue-500 border text-base-white hover:bg-blue-600 focus:bg-blue-600 focus:border-blue-600 disabled:text-gray-400 disabled:bg-gray-100`;
    case "success":
      return `bg-success-500 border-success-500 border text-base-white hover:bg-success-600 focus:bg-success-600 focus:border-success-600 disabled:text-gray-400 disabled:bg-gray-100`;
    case "error":
      return `bg-error-500 text-base-white hover:bg-error-700 focus:bg-error-700 disabled:text-gray-400 disabled:bg-gray-100 border-none`;
    case "tertiary-color":
      return `bg-transparent border border-transparent text-brand-700 hover:bg-brand-50 hover:text-brand-800 disabled:text-gray-400 disabled:text-gray-400 disabled:border-gray-400`;
    case "link-gray":
      return `border-none`;
    case "link-color":
      return `text-${props.linkColor}`;
    default:
      return "";
  }
});

const sizeClass = computed(() => {
  switch (props.size) {
    case "sm":
      return "min-h-16 md:min-w-16 md:min-h-[36px] md:min-w-[36px] px-5";
    case "md":
      return "min-h-[40px] min-w-[40px] px-6";
    case "lg":
      return "min-h-[44px] min-w-[44px] px-7 text-md";
    case "xl":
      return "min-h-[48px] min-w-[48px] px-8";
    default:
      return "min-h-[60px] min-w-[60px] px-9";
  }
});

const handleClick = event => {
  if (props.disabled || props.loading) {
    event.preventDefault();
    return;
  }
  emit("click", event);
};
</script>

<template>
  <button
    v-if="options.length === 0"
    :v-ripple="!disabled"
    :class="[allClasses]"
    :type="type"
    :data-test-attr="dataTestAttr"
    :disabled="disabled"
    @click="handleClick"
  >
    <template v-if="!successState">
      <Loader
        v-if="loading"
        :color="
          disabled ? 'gray-400' : variant === 'primary' ? 'white' : 'gray-400'
        "
      />
      <slot v-if="!loading"></slot>
    </template>
    <template v-else>
      {{ successState }}
    </template>
  </button>
  <CustomNav v-else :options="options">
    <template #buttonOverride>
      <button :class="[allClasses]">
        <slot></slot>
      </button>
    </template>
  </CustomNav>
</template>
