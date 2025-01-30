<script setup>
import { onMounted } from "vue";

import i18n from "@/src/assets/config.js";

onMounted(() => {
  i18n.global.locale.value = "pl";
});
</script>

<template>
  <slot></slot>
</template>
