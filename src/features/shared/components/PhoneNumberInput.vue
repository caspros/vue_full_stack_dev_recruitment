<script setup>
import { computed, ref, watch } from "vue";
import CustomPrimeDropdown from "@/src/features/shared/components/CustomPrimeDropdown.vue";
import { useSharedStore } from "@/src/features/shared/store.js";
import CustomPrimeInputNumber from "@/src/features/shared/components/CustomPrimeInputNumber.vue";
import CustomPrimeInputText from "@/src/features/shared/components/CustomPrimeInputText.vue";

const storeShared = useSharedStore();

const countryOptions = computed(() => {
  const storeData = JSON.parse(
    JSON.stringify(storeShared.getDataByKey({ field: "countries" })),
  );

  if (!storeData) {
    return null;
  }
  return storeData;
});

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: "",
  },
  country: {
    type: Object,
    default: null,
  },
  required: {
    type: Boolean,
    default: false,
  },
  name: {
    type: String,
    default: null,
  },
  size: {
    type: String,
    default: "md",
  },
  errorOnInvalid: {
    type: Boolean,
    default: false,
  },
  warningOnInvalid: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  error: {
    type: [Boolean, String],
    default: false,
  },
});

const emit = defineEmits(["update:modelValue", "update:country"]);

const initPhoneNumberValue = () => {
  if (!props.country && countryOptions.value) {
    return countryOptions.value[0];
  } else if (props.country) {
    return JSON.parse(JSON.stringify(props.country));
  }
  return null;
};

const initPhoneNumber = () => {
  let number = props.modelValue;
  const country = props.country;
  if (number && country) {
    number = number.replace(country.prefix_phone, "");
  }
  return number;
};

const phoneNumberPrefix = ref(initPhoneNumberValue());
const phoneNumber = ref(initPhoneNumber());
const phoneNumberFull = computed(() => {
  return `${phoneNumber.value ? phoneNumber.value : ""}`;
});

watch(
  () => countryOptions.value,
  () => {
    phoneNumberPrefix.value = initPhoneNumberValue();
  },
);

watch(
  () => props.modelValue,
  v => {
    phoneNumber.value = v;
  },
);

function updatePhoneNumber() {
  emit("update:modelValue", phoneNumberFull.value);
  emit("update:country", phoneNumberPrefix.value);
}

function updatePrefix(country) {
  if (typeof country === "string") {
    country = countryOptions.value.find(item => item.code === country);
  }
  phoneNumberPrefix.value = country ? country : null;
  // phoneNumber.value = null;
}

const inputNumber = ref(null);
const focus = () => {
  inputNumber.value.focusInput();
};

const validInput = ref(true);

defineExpose({
  updatePrefix,
  focus,
});
</script>

<template>
  <CustomPrimeInputText
    ref="inputNumber"
    v-model="phoneNumber"
    v-model:valid="validInput"
    class="pl-0 [&_.p-inputtext]:border-0 [&__input]:w-full"
    :size="size"
    numeric
    :disabled="disabled"
    :name="name"
    :error="error"
    inputmode="numeric"
    :required="required"
    :error-on-invalid="errorOnInvalid"
    :warning-on-invalid="warningOnInvalid"
    @update:model-value="updatePhoneNumber"
  >
    <template v-if="$slots.label" #label>
      <slot name="label"></slot>
    </template>
    <template #iconLeft>
      <CustomPrimeDropdown
        v-model="phoneNumberPrefix"
        name="job_offer_preference.other_people_in_house"
        :required="required"
        placeholder="00"
        class="[&_>.p-dropdown]:gap-0 [&_>.p-dropdown]:border-0"
        :options="countryOptions"
        size="xs"
        :border="false"
        :error-on-invalid="errorOnInvalid && !validInput"
        :warning-on-invalid="warningOnInvalid && !validInput"
        :error="errorOnInvalid && !validInput"
        :warning="warningOnInvalid && !validInput"
        @update:model-value="updatePhoneNumber"
      >
        <template #option="{ option }">
          <div class="mr-2 flex w-full items-center gap-3">
            <div
              class="w-8 [&_svg]:h-auto [&_svg]:w-full"
              v-html="option.flag"
            ></div>
            {{ option.prefix_phone }}
            {{
              $t(
                `global.countries.${option.name.replaceAll(" ", "_").toLowerCase()}`,
              )
            }}
          </div>
        </template>
        <template #value="{ value }">
          <div class="mr-2 flex items-center gap-3">
            <div
              class="w-8 [&_svg]:h-auto [&_svg]:w-full"
              v-html="value.flag"
            ></div>
            {{ value.prefix_phone }}
          </div>
        </template>
      </CustomPrimeDropdown>
    </template>
    <template v-if="error" #error>
      <div class="relative top-[-0.5rem] h-0 p-1 text-red-300">
        {{ error }}
      </div>
    </template>
  </CustomPrimeInputText>
</template>
