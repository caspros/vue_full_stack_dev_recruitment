<script setup>
import gql from "graphql-tag";
import { useMutation } from "@vue/apollo-composable";
import { useToast } from "primevue/usetoast";
import { useRouter } from "vue-router";
import { ref, computed, watch } from "vue";
import pushToast from "@/src/features/shared/composables/pushToast.js";
import CustomButton from "@/src/features/shared/components/CustomButton.vue";
import CustomForm from "@/src/features/shared/components/CustomForm.vue";
import CustomInputText from "@/src/features/shared/components/CustomInputText.vue";
import CustomPrimeDropdown from "@/src/features/shared/components/CustomPrimeDropdown.vue";
import PhoneNumberInput from "@/src/features/shared/components/PhoneNumberInput.vue";
import { useSharedStore } from "@/src/features/shared/store.js";
import { SALUTATIONS } from "../../shared/constants/constants";
import { useAuthorizationStore } from "@/src/store/authorization.js";
import { useI18n } from "vue-i18n";

const SALUTATION_OPTIONS = SALUTATIONS;

const storeShared = useSharedStore();
storeShared.fetchCountriesQuery();
const countryOptions = computed(() => {
  const storeData = JSON.parse(
    JSON.stringify(storeShared.getDataByKey({ field: "countries" })),
  );

  if (!storeData) {
    return [];
  }

  return storeData.map(item => ({ ...item }));
});

watch(
  () => countryOptions.value,
  () => {
    filterCountries.value = countryOptions.value;
  },
);

const { t } = useI18n();
const authorizationStore = useAuthorizationStore();
const storeCGA = useCaregiverAgencyStore();
const toast = useToast();
const router = useRouter();
const phoneNumberInput = ref(null);
const isLoading = ref(false);
const valid = ref(false);
const form = ref({
  name: "",
  director_salutation: "",
  director_first_name: "",
  director_last_name: "",
  country: "",
  street: "",
  zip_code: "",
  city: "",
  phone: "",
  file_tokens: [],
  description: ".",
  is_vat: false,
});

async function onSubmit() {
  router.push({ name: "JobMarket" });
}

const filterCountries = ref([]);

function searchByName(v) {
  if (!countryOptions.value) {
    return [];
  }

  if (!v) {
    return countryOptions.value;
  }

  filterCountries.value = countryOptions.value.filter(item =>
    item.name.toLowerCase().includes(v.toLowerCase()),
  );
}

function setNumber() {
  phoneNumberInput.value.updatePrefix(form.value.country);
}
</script>

<template>
  <CustomForm
    v-model:valid="valid"
    class="mt-19 flex flex-col gap-8 pr-8"
    @submit="onSubmit"
  >
    <label class="text-sm font-bold text-blue-950">{{
      $t("components.companyDetails.company")
    }}</label>
    <CustomInputText
      v-model="form.name"
      :placeholder="$t('views.signIn.form.name.placeholder')"
      name="companyName"
      minlength="4"
      required
    >
      <template #label>{{
        $t("components.companyDetails.companyName")
      }}</template>
    </CustomInputText>

    <label class="mt-10 text-sm font-bold text-blue-950">
      {{ $t("components.companyDetails.managingDirector") }}
    </label>

    <div>
      <label class="text-sm font-medium text-gray-700">
        {{ $t("components.companyDetails.saluation") }}
      </label>
      <CustomPrimeDropdown
        v-model="form.director_salutation"
        class="mt-3"
        :options="SALUTATION_OPTIONS"
        name="salutation"
        required
        :placeholder="$t('global.pleaseChoose')"
      >
      </CustomPrimeDropdown>
    </div>

    <CustomInputText
      v-model="form.director_first_name"
      :placeholder="$t('components.companyDetails.pleaseEnter')"
      name="firstName"
      minlength="4"
      required
    >
      <template #label>
        {{ $t("components.companyDetails.firstName") }}</template
      >
    </CustomInputText>

    <CustomInputText
      v-model="form.director_last_name"
      :placeholder="$t('components.companyDetails.pleaseEnter')"
      name="lastName"
      minlength="4"
      required
    >
      <template #label>{{ $t("components.companyDetails.lastName") }}</template>
    </CustomInputText>

    <label class="mt-10 text-sm font-bold text-blue-950">
      {{ $t("components.companyDetails.officialCompanyAdress") }}
    </label>

    <div>
      <label class="text-sm font-medium text-gray-700">
        {{ $t("components.companyDetails.country") }}
      </label>
      <CustomPrimeDropdown
        v-model="form.country"
        class="mt-3"
        :options="filterCountries"
        name="country"
        required
        :placeholder="$t('global.pleaseChoose')"
        :filter="searchByName"
        @update:model-value="setNumber"
      >
        <template #option="{ option }"> {{ option.name }} </template>
        <template #value="{ value }"> {{ value.name }} </template>
      </CustomPrimeDropdown>
    </div>

    <CustomInputText
      v-model="form.street"
      :placeholder="$t('components.companyDetails.pleaseEnter')"
      name="street"
      minlength="4"
      required
    >
      <template #label> {{ $t("components.companyDetails.street") }}</template>
    </CustomInputText>

    <CustomInputText
      v-model="form.zip_code"
      :placeholder="$t('components.companyDetails.pleaseEnter')"
      name="postalCode"
      minlength="4"
      required
    >
      <template #label>{{
        $t("components.companyDetails.postalCode")
      }}</template>
    </CustomInputText>

    <CustomInputText
      v-model="form.city"
      :placeholder="$t('components.companyDetails.pleaseEnter')"
      name="city"
      minlength="4"
      required
    >
      <template #label>{{ $t("components.companyDetails.city") }}</template>
    </CustomInputText>

    <PhoneNumberInput ref="phoneNumberInput" v-model="form.phone" class="mt-3">
      <template #label>
        {{ $t("components.companyDetails.phoneNumber") }}
      </template>
    </PhoneNumberInput>

    <CustomButton
      class="mb-32 mt-11"
      type="submit"
      :disabled="!valid"
      :loading="isLoading"
    >
      {{ $t("components.companyDetails.finish") }}
    </CustomButton>
  </CustomForm>
</template>
