<script setup>
import Accordion from "primevue/accordion";
import AccordionTab from "primevue/accordiontab";
import { ref } from "vue";

defineProps({
  data: {
    type: Array,
  },
});

const accordionIndex = ref(0);
</script>

<template>
  <Accordion
    v-model:activeIndex="accordionIndex"
    expandIcon="pi pi-plus"
    collapseIcon="pi pi-minus"
  >
    <AccordionTab :key="index" v-for="(accordion, index) in data">
      <template #header>
        <slot
          name="header"
          :data="accordion"
          :isOpen="accordionIndex === index"
        ></slot>
      </template>

      <slot :data="accordion"></slot>
    </AccordionTab>
  </Accordion>
</template>
