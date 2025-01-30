<script setup>
import Message from "primevue/message";
import CustomIcon from "@/src/features/shared/components/CustomIcon.vue";

const props = defineProps({
  customIcon: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <Message>
    <template v-if="customIcon" #messageicon>
      <CustomIcon width="24" height="24" name="information" />
    </template>
    <slot></slot>
  </Message>
</template>
