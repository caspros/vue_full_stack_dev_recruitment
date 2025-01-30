<script setup>
import WrapperInjectElement from "@/src/features/shared/components/WrapperInjectElement.vue";
const props = defineProps({
  errors: {
    type: [Array, null],
    default: null,
  },
  variant: {
    type: String,
    default: "error", // error, white
  },
});
</script>

<template>
  <WrapperInjectElement
    :class="[
      {
        'mt-1': errors && errors.length > 0,
      },
    ]"
  >
    <TransitionGroup name="fade" appear>
      <div
        v-for="(error, i) in errors"
        :key="`error-${i}`"
        :class="[
          'text-xs',
          {
            'text-error-500': variant === 'error',
            'text-base-white': variant === 'white',
          },
        ]"
      >
        {{ error }}
      </div>
    </TransitionGroup>
  </WrapperInjectElement>
</template>

<style scoped lang="scss"></style>
