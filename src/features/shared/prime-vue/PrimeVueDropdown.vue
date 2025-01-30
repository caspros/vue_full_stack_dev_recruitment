<script setup>
import Dropdown from "primevue/dropdown";
import { FilterService } from "primevue/api";
import { ref } from "vue";
import PrimeVueErrors from "@/src/features/shared/prime-vue/PrimeVueErrors.vue";
import PrimeVueLabel from "@/src/features/shared/prime-vue/PrimeVueLabel.vue";

const emits = defineEmits(["filter"]);
const props = defineProps({
  errors: {
    type: Array,
    default: () => [],
  },
  placeholder: {
    type: String,
    default: null,
  },
  filterInputPlaceholder: {
    type: String,
    default: null,
  },
  leftJoin: {
    type: Boolean,
    default: false,
  },
});

const filterDelay = ref(null);
const filterEvent = e => {
  e.originalEvent.preventDefault();
  if (filterDelay.value) {
    clearTimeout(filterDelay.value);
  }
  filterDelay.value = setTimeout(() => {
    emits("filter", e.value);
  }, 300);
};

FilterService.register("custom", (value, filter) => {
  return true;
});
</script>

<template>
  <div>
    <PrimeVueLabel v-if="$slots.label" class="mb-3">
      <slot name="label"></slot>
    </PrimeVueLabel>
    <div class="relative">
      <Dropdown
        v-bind="$attrs"
        :class="[
          'min-h-[36px] w-full border px-6 hover:border-gray-400',
          {
            'border-error-500': errors.length,
            'rounded-l-none': leftJoin,
          },
        ]"
        :placeholder="placeholder ? placeholder : $t('global.pleaseChoose')"
        :filter-match-mode="'custom'"
        :input-props="{
          class: 'min-h-[36px] flex items-center border-none',
        }"
        :filter-input-props="{
          class: ['min-h-[36px] px-7 border'],
          placeholder: filterInputPlaceholder
            ? filterInputPlaceholder
            : $t('global.search'),
        }"
        @filter="filterEvent"
      >
        <template v-for="(slot, name) in $slots" v-slot:[name]="slotData">
          <slot :name="name" v-bind="slotData"></slot>
        </template>
      </Dropdown>
    </div>
    <PrimeVueErrors :errors="errors" />
  </div>
</template>

<style scoped lang="scss"></style>
