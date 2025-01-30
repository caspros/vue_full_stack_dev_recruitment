<script setup>
import SelectButton from "primevue/selectbutton";
</script>

<template>
  <SelectButton
    v-bind="$attrs"
    unstyled
    :allow-empty="false"
    :pt="{
      root: {
        class: [
          'relative',
          'inline-flex',
          'align-bottom',
          'cursor-pointer',
          'select-none',
          'bg-base-white',
          'min-h-[36px]',
          'rounded-full',
        ],
      },
      button: ({ context }) => ({
        class: [
          'relative',
          'overflow-hidden',
          'px-6',
          'py-4',
          'border border-solid',
          'transition-all',
          'duration-300',
          'first-of-type:rounded-l-full',
          'last-of-type:rounded-r-full',
          'text-sm font-semibold',
          'min-w-[70px] text-center',
          {
            'bg-brand-50 border-brand-100 text-brand-500': context.active,
            'border-gray-300': !context.active,
          },
        ],
      }),
    }"
  >
    <template v-for="(slot, name) in $slots" v-slot:[name]="slotData">
      <slot :name="name" v-bind="slotData"></slot>
    </template>
  </SelectButton>
</template>

<style scoped lang="scss"></style>
