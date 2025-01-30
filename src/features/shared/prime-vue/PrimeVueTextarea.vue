<script setup>
import Textarea from "primevue/textarea";
import { useI18n } from "vue-i18n";
import CustomIcon from "../components/CustomIcon.vue";
import InputNumber from "primevue/inputnumber";
import PrimeVueErrors from "@/src/features/shared/prime-vue/PrimeVueErrors.vue";
import PrimeVueLabel from "@/src/features/shared/prime-vue/PrimeVueLabel.vue";

const { t } = useI18n();

const props = defineProps({
  errors: {
    type: Array,
    default: () => [],
  },
  placeholder: {
    type: String,
    default: null,
  },
  maxLength: {
    type: [Number, null, String],
    default: null,
  },
  rows: {
    type: String,
    default: "5",
  },
});

const inputValue = defineModel("modelValue", {
  type: String,
  default: null,
});
</script>

<template>
  <div>
    <PrimeVueLabel v-if="$slots.label">
      <slot name="label"></slot>
    </PrimeVueLabel>
    <div class="relative mt-3">
      <Textarea
        v-model="inputValue"
        v-bind="
          () => {
            let attrs = JSON.parse(JSON.stringify($attrs));
            delete attrs.value;
            return $attrs;
          }
        "
        :class="[
          'min-h-[36px] w-full resize-none border px-6 py-3',
          {
            'border-error-500 outline-error-500': errors.length,
          },
        ]"
        :rows="rows"
        :placeholder="placeholder ? placeholder : $t('global.enterText')"
      />
      <CustomIcon
        v-if="errors.length"
        class="absolute right-7 top-1/2 -translate-y-[50%] text-error-500"
        name="alert-circle"
        width="16"
        height="16"
      />
    </div>
    <Transition name="slide-right" mode="out-in" duration="50">
      <div v-if="maxLength && errors.length === 0" class="mt-1 text-xs">
        {{
          inputValue
            ? inputValue.length <= maxLength
              ? inputValue.length
              : maxLength
            : 0
        }}/{{ maxLength }}
      </div>
      <PrimeVueErrors v-else :errors="errors" />
    </Transition>
  </div>
</template>

<style scoped lang="scss"></style>
