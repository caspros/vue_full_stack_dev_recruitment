<script setup>
import gql from "graphql-tag";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useMutation } from "@vue/apollo-composable";
import { useToast } from "primevue/usetoast";
import pushToast from "@/src/features/shared/composables/pushToast.js";
import CustomButton from "@/src/features/shared/components/CustomButton.vue";
import CustomForm from "@/src/features/shared/components/CustomForm.vue";
import CustomInputText from "@/src/features/shared/components/CustomInputText.vue";
import CustomPrimeDropdown from "@/src/features/shared/components/CustomPrimeDropdown.vue";
import { SALUTATIONS, TITLES } from "../../shared/constants/constants";
import { useAuthorizationStore } from "@/src/store/authorization.js";

const SALUTATION_OPTIONS = SALUTATIONS;
const TITLE_OPTIONS = TITLES;

const authorizationStore = useAuthorizationStore();
const toast = useToast();
const router = useRouter();
const isLoading = ref(false);
const valid = ref(false);
const form = ref({
  salutation: "",
  title: "",
  first_name: "",
  last_name: "",
  file_tokens: [],
});

async function onSubmit() {
  isLoading.value = true;
  const finalForm = {
    ...form.value,
    title: form.value.title === "none" ? "" : form.value.title,
  };
  const { result, error } = await authorizationStore.updateUserData({
    data: finalForm,
  });
  if (result.id) {
    router.push({ name: "Details", params: { step: "company-details" } });
  } else if (error) {
    pushToast({
      toast,
      error: error.graphQLErrors,
    });
  }

  isLoading.value = false;
}
</script>

<template>
  <CustomForm
    v-model:valid="valid"
    class="flex flex-col gap-8"
    @submit="onSubmit"
  >
    <div class="grid grid-cols-2 gap-12">
      <div>
        <label class="mb-3 text-sm font-medium text-gray-700">
          {{ $t("components.accountDetails.salutation") }}
        </label>

        <CustomPrimeDropdown
          v-model="form.salutation"
          :options="SALUTATION_OPTIONS"
          name="job_offer_preference.other_people_in_house"
          required
          :placeholder="$t('global.pleaseChoose')"
        >
        </CustomPrimeDropdown>
      </div>

      <div>
        <label class="mb-3 text-sm font-medium text-gray-700">
          {{ $t("components.accountDetails.title") }}
        </label>

        <CustomPrimeDropdown
          v-model="form.title"
          :options="TITLE_OPTIONS"
          name="job_offer_preference.other_people_in_house"
          :placeholder="$t('global.pleaseChoose')"
        >
        </CustomPrimeDropdown>
      </div>
    </div>

    <CustomInputText
      v-model="form.first_name"
      :placeholder="$t('components.accountDetails.enterFirstName')"
      name="name"
      minlength="4"
      required
    >
      <template #label>
        {{ $t("components.accountDetails.firstName") }}
      </template>
    </CustomInputText>

    <CustomInputText
      v-model="form.last_name"
      :placeholder="$t('components.accountDetails.enterLastName')"
      name="name"
      minlength="4"
      required
    >
      <template #label>
        {{ $t("components.accountDetails.lastName") }}
      </template>
    </CustomInputText>

    <CustomButton
      class="mt-11"
      type="submit"
      :loading="isLoading"
      :disabled="!valid"
    >
      {{ $t("components.accountDetails.next") }}
    </CustomButton>
  </CustomForm>
</template>
