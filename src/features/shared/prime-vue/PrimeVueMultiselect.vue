<script setup>
import MultiSelect from "primevue/multiselect";
import { FilterService } from "primevue/api";
import { ref } from "vue";
import PrimeVueErrors from "@/src/features/shared/prime-vue/PrimeVueErrors.vue";
import PrimeVueLabel from "@/src/features/shared/prime-vue/PrimeVueLabel.vue";
import { useI18n } from "vue-i18n";

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
  filterPlaceholder: {
    type: String,
    default: () => {
      const { t } = useI18n();
      return t("components.primeVueMultiselect.filterPlaceholder");
    },
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
    <PrimeVueLabel v-if="$slots.label">
      <slot name="label"></slot>
    </PrimeVueLabel>
    <div class="relative mt-3">
      <MultiSelect
        v-bind="$attrs"
        :class="[
          'min-h-[36px] w-full border px-6 hover:border-gray-400',
          {
            'border-error-500': errors.length,
          },
        ]"
        :placeholder="placeholder ? placeholder : $t('global.pleaseChoose')"
        :filter-match-mode="'custom'"
        :input-props="{
          class: 'min-h-[36px] flex items-center',
        }"
        :filter-input-props="{
          class: 'min-h-[36px] px-7 border',
          placeholder: filterPlaceholder,
        }"
        :filter="!!filterEvent"
        @filter="filterEvent"
      >
        <template v-for="(slot, name) in $slots" v-slot:[name]="slotData">
          <slot :name="name" v-bind="slotData"></slot>
        </template>
      </MultiSelect>
    </div>
    <PrimeVueErrors :errors="errors" />
  </div>
</template>

<style lang="scss"></style>
