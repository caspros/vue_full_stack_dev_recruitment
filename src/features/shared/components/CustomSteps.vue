<script setup>
import CustomIcon from "@/src/features/shared/components/CustomIcon.vue";

const props = defineProps({
  steps: {
    type: Array,
    required: true,
    default: () => [],
  },
  modelValue: {
    type: Number,
    required: true,
  },
});
</script>

<template>
  <div class="flex items-center justify-between">
    <template v-for="(step, i) in steps" :key="`step-${i}`">
      <div
        :class="[
          'font-sm flex items-center gap-4 font-medium text-brand-500 transition-colors',
          {
            'opacity-50': step.value > modelValue,
          },
        ]"
      >
        <div
          class="flex h-[24px] w-[24px] items-center justify-center rounded-full bg-brand-50 text-xs"
        >
          <template v-if="step.value + 1 > modelValue">
            {{ step.value }}</template
          >
          <CustomIcon v-else width="16" height="16" name="check-circle" />
        </div>
        {{ step.label }}
      </div>
      <div
        :class="[
          'grow px-6 transition-colors',
          {
            'opacity-10': step.value >= modelValue,
          },
        ]"
        v-if="i < steps.length - 1"
      >
        <div class="w-100 border border-dashed border-brand-500"></div>
      </div>
    </template>
  </div>
</template>

<style scoped>
.step {
  display: flex;
  align-items: center;
  padding: 8px 16px;
  border-radius: 6px;
}
.step-indicator {
  height: 10px;
  width: 10px;
  border-radius: 50%;
  margin-left: 8px;
}
</style>
