import { ref, watch, nextTick } from "vue";

import { useStoreOptions } from "@/src/features/shared/composables/useStoreOption.js";
import { useSharedStore } from "@/src/features/shared/store.js";

export function useEmailOrPhoneInput(form) {
  const { countryOptions } = useStoreOptions();
  useSharedStore().fetchCountriesQuery();

  const isPhoneNumber = ref(false);

  watch(
    () => form.value.email,
    v => {
      isPhoneNumber.value = v.length >= 3 && /^\d+$/.test(v);
    },
  );

  const emailInput = ref(null);
  const phoneInput = ref(null);
  const countryPrefix = ref(null);

  watch(
    () => countryOptions.value,
    v => {
      if (v) {
        countryPrefix.value = v.find(item => item.id === 37);
      }
    },
    {
      immediate: true,
    },
  );

  watch(
    () => isPhoneNumber.value,
    v => {
      nextTick(() => {
        if (v) {
          phoneInput.value.focus();
        } else {
          emailInput.value.focus();
        }
      });
    },
  );

  return {
    isPhoneNumber,
    emailInput,
    phoneInput,
    countryPrefix,
  };
}
