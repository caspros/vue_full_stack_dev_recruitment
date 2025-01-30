<script setup>
import { defineModel, ref, watch } from "vue";
import Listbox from "primevue/listbox";

const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
  optionValue: {
    type: String,
    default: null,
  },
});

const visible = ref(false);
const toggle = () => {
  setTimeout(() => {
    visible.value = !visible.value;
  }, 50);
};

const selectedItem = defineModel("modelValue", {
  type: [String, Number, Object],
  default: 0,
});

watch(
  () => selectedItem.value,
  v => {
    toggle();
  },
);
</script>

<template>
  <div
    v-click-outside-element="
      () => {
        visible ? (visible = false) : null;
      }
    "
    class="card justify-content-center relative flex"
  >
    <div class="cursor-pointer" @click="toggle">
      <slot name="button"> </slot>
    </div>

    <Listbox
      v-if="visible"
      v-model="selectedItem"
      :options="items"
      :option-value="optionValue"
      class="absolute right-0 top-[102%] z-10 whitespace-nowrap px-4 py-8"
    >
      <template #option="{ option }">
        <div class="flex min-h-[40px] items-center rounded-md px-4 py-3">
          <slot name="item" :item="option" />
        </div>
      </template>
    </Listbox>
  </div>
</template>
