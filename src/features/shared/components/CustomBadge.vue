<script setup>
import { computed } from "vue";
import CustomIcon from "@/src/features/shared/components/CustomIcon.vue";

const props = defineProps({
  text: {
    type: String,
    default: null,
  },
  dot: {
    type: Boolean,
    default: false,
  },
  rounded: {
    type: Boolean,
    default: false,
  },
  background: {
    type: String,
    default: null,
  },
  border: {
    type: String,
    default: null,
  },
  leftIcon: {
    type: String,
    default: null,
  },
  rightIcon: {
    type: String,
    default: null,
  },
  size: {
    type: String,
    default: "md",
    validator: value => ["lg", "md", "sm"].includes(value),
  },
  variant: {
    type: String,
    default: "pill-color",
    validator: value =>
      ["pill-color", "pill-outline", "badge-color", "pill-fill"].includes(
        value,
      ),
  },
  color: {
    type: String,
    default: "gray",
    validator: value =>
      [
        "gray",
        "brand",
        "error",
        "warning",
        "success",
        "gray-blue",
        "blue-light",
        "blue",
        "indigo",
        "purple",
        "pink",
        "orange",
      ].includes(value),
  },
  square: {
    type: Boolean,
    default: false,
  },
});

const badgeClasses = computed(() => {
  const bg = props.background
    ? props.background
    : (function (variant) {
        switch (variant) {
          case "pill-color":
            return `bg-${props.color}-50 text-${props.color}-700`;
          case "pill-fill":
            return `bg-${props.color}-200 text-gray-700`;
          default:
            return "";
        }
      })(props.variant);
  const border = props.border ? props.border : `border-${props.color}-200`;
  const color = props.text ? props.text : ``;
  return [
    `border ${bg} ${border} text-${getTextSize.value} font-medium inline-flex items-center justify-center gap-2 ${color} transform-all duration-300 badge`,
    {
      "px-4 h-[22px] min-w-[22px]": props.size === "sm" && !props.rounded,
      "h-[22px] w-[22px]": props.size === "sm" && props.rounded,
      "px-5 h-[24px] min-w-[24px]": props.size === "md" && !props.rounded,
      "h-[24px] w-[24px]": props.size === "md" && props.rounded,
      "px-7 h-[28px] min-w-[28px]": props.size === "lg" && !props.rounded,
      "h-[28px] w-[28px]": props.size === "lg" && props.rounded,
      "rounded-full": !props.square,
      "rounded-md": props.square,
    },
  ];
});

const getTextSize = computed(() => {
  switch (props.size) {
    case "sm":
      return `xs`;
    case "md":
      return `sm`;
    case "lg":
      return `sm`;
    default:
      return "";
  }
});
</script>

<template>
  <div class="flex items-center gap-4">
    <div v-if="$slots.label" :class="`text-sm font-semibold text-gray-700`">
      <slot name="label"></slot>
    </div>
    <div :class="badgeClasses">
      <div v-if="dot" class="h-[6px] w-[6px] rounded-full bg-error-500"></div>
      <CustomIcon v-if="leftIcon" :name="leftIcon" width="12" height="12" />
      <slot></slot>
      <CustomIcon v-if="rightIcon" :name="rightIcon" width="12" height="12" />
    </div>
  </div>
</template>
