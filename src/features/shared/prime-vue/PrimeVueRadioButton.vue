<script setup>
import RadioButton from "primevue/radiobutton";
import { getRandomString } from "@/src/features/shared/utils/getRandomString.js";

const uuid = getRandomString();
</script>

<template>
  <div class="align-center flex gap-4">
    <div>
      <RadioButton
        v-bind="$attrs"
        :input-id="`prime-vue-radio-button-${uuid}`"
      />
    </div>
    <div>
      <label
        class="cursor-pointer text-sm font-medium"
        :for="`prime-vue-radio-button-${uuid}`"
      >
        <slot></slot>
      </label>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
