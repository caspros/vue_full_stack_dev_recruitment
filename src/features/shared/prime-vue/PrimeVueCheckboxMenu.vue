<script setup>
import { ref, defineModel } from "vue";
import Menu from "primevue/menu";
import PrimeVueCheckbox from "@/src/features/shared/prime-vue/PrimeVueCheckbox.vue";

defineProps({
  items: {
    type: Array,
    required: true,
  },
});

const selectedValues = defineModel("modelValue", {
  type: Array,
  default: [],
});

const menu = ref();
const toggle = event => {
  menu.value.toggle(event);
};
</script>

<template>
  <div @click="toggle">
    <slot> </slot>
  </div>

  <Menu
    ref="menu"
    :model="items"
    popup
    class="[&_.p-checkbox-box]:border [&_.p-highlight>.p-checkbox-box]:bg-brand-500"
  >
    <template #submenuheader="{ item: { label } }">
      <span class="text-sm text-gray-600">
        {{ $t(label) }}
      </span>
    </template>

    <template #item="{ item }">
      <div class="px-2 py-4" @click.stop>
        <PrimeVueCheckbox v-model="selectedValues" :value="item.value">
          <template #label> {{ $t(item.label) }} </template>
        </PrimeVueCheckbox>
      </div>
    </template>
  </Menu>
</template>
