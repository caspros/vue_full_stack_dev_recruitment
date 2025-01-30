<script setup>
import Calendar from "primevue/calendar";
import CustomIcon from "../components/CustomIcon.vue";
import PrimeVueErrors from "@/src/features/shared/prime-vue/PrimeVueErrors.vue";
import PrimeVueLabel from "@/src/features/shared/prime-vue/PrimeVueLabel.vue";

const props = defineProps({
  errors: {
    type: Array,
    default: () => [],
  },
  errorVariant: {
    type: String,
    default: undefined,
  },
  tooltip: {
    type: [String, Object],
    default: null,
  },
  size: {
    type: String,
    default: "sm",
    validator: value => ["lg", "md", "sm"].includes(value),
  },
  placeholder: {
    type: String,
    default: "dd.mm.yy",
  },
});
</script>

<template>
  <div class="w-full">
    <PrimeVueLabel v-if="$slots.label" class="mb-3">
      <slot name="label"></slot>
    </PrimeVueLabel>
    <div class="relative cursor-pointer">
      <Calendar
        v-bind="$attrs"
        :class="[
          'w-full',
          {
            'h-[36px]': size === 'sm',
            'h-[40px]': size === 'md',
            'h-[44px]': size === 'lg',
          },
        ]"
        :input-props="{
          class: [
            'pl-20 cursor-pointer border hover:border-gray-400 text-gray-700',
            {
              'border-error-500 outline-error-500': errors.length,
            },
          ],
        }"
        date-format="dd.mm.yy"
        :placeholder="$attrs['time-only'] === '' ? `00:00` : placeholder"
        :manual-input="$attrs['time-only'] === ''"
      />
      <CustomIcon
        class="absolute left-6 top-1/2 -translate-y-[50%] text-gray-500"
        :name="$attrs['time-only'] === '' ? `schedule` : 'date_range'"
        width="24"
        height="24"
      />
      <CustomIcon
        v-if="tooltip"
        v-tooltip.left="tooltip"
        class="absolute right-6 top-1/2 -translate-y-[50%] text-gray-500"
        name="help-circle"
        width="16"
        height="16"
      />
    </div>
    <PrimeVueErrors :errors="errors" :variant="errorVariant" />
  </div>
</template>

<style scoped lang="scss"></style>
