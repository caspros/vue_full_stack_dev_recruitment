<script setup>
import { ref } from "vue";

import gql from "graphql-tag";
import { useI18n } from "vue-i18n";
import { useMutation } from "@vue/apollo-composable";
import { useRouter } from "vue-router";
import { useToast } from "primevue/usetoast";

import CustomButton from "@/src/features/shared/components/CustomButton.vue";
import CustomForm from "@/src/features/shared/components/CustomForm.vue";
import CustomIcon from "@/src/features/shared/components/CustomIcon.vue";
import CustomInputText from "@/src/features/shared/components/CustomInputText.vue";
import DividerWithText from "@/src/features/authorization/components/DividerWithText.vue";
import FacebookLogin from "@/src/features/authorization/components/FacebookLogin.vue";
import GoogleLogin from "@/src/features/authorization/components/GoogleLogin.vue";
import PhoneNumberInput from "@/src/features/shared/components/PhoneNumberInput.vue";

import { useAuthorizationStore } from "@/src/store/authorization.js";

import pushToast from "@/src/features/shared/composables/pushToast.js";
import { useEmailOrPhoneInput } from "@/src/features/authorization/composables/useEmailOrPhoneInput.js";
import { useProvidersErrorHandler } from "@/src/features/authorization/composables/useProvidersErrorHandler.js";

useProvidersErrorHandler();

const CGRegister_MUTATION = gql`
  mutation RegisterCaregiver(
    $first_name: String!
    $last_name: String!
    $phone: Int!
    $password: String!
    $phone_country_id: Int!
  ) {
    RegisterCaregiver(
      first_name: $first_name
      last_name: $last_name
      phone: $phone
      password: $password
      phone_country_id: $phone_country_id
    ) {
      token
    }
  }
`;

const { t } = useI18n();
const toast = useToast();
const isLoading = ref(false);
const isDisabled = ref(false);
const form = ref({
  phone: "",
  phone_country_id: 37,
  password: "",
});

function clearForm() {
  form.value = {
    phone: "",
    password: "",
    phone_country_id: 37,
  };
}

const router = useRouter();
const authorizationStore = useAuthorizationStore();
async function handleRegister(token) {
  // localStorage.setItem("token", token);

  await authorizationStore.fetchUserData();

  pushToast({
    toast,
    success: {
      title: t("components.signUp.success"),
      content: t("components.signUp.successText"),
    },
  });

  router.push({ name: "CgJobs" });
}

const { mutate: registerMutate } = useMutation(CGRegister_MUTATION, {
  variables: form.value,
  clientId: "auth",
});
async function register() {
  try {
    isLoading.value = true;

    const response = await registerMutate({
      variables: form.value,
    });

    clearForm();
    await handleRegister(response.data.RegisterCaregiver.token);
  } catch (error) {
    pushToast({
      toast,
      error: error.graphQLErrors,
    });
  } finally {
    isLoading.value = false;
  }
}

const { isPhoneNumber, emailInput, phoneInput, countryPrefix } =
  useEmailOrPhoneInput(form);
</script>

<template>
  <CustomForm
    v-model:valid="isDisabled"
    class="mx-auto mt-19 flex max-w-[376px] flex-col gap-12"
    @submit="register"
  >
    <CustomInputText
      v-model="form.first_name"
      :placeholder="$t('views.signIn.form.firstName.placeholder')"
      type="text"
      name="first_name"
      required
    />

    <CustomInputText
      v-model="form.last_name"
      :placeholder="$t('views.signIn.form.lastName.placeholder')"
      type="text"
      name="last_name"
      required
    />

    <PhoneNumberInput
      ref="phoneInput"
      v-model.number="form.phone"
      v-model:country="countryPrefix"
      name="phone"
      @update:country="
        v => {
          form.phone_country_id = v.id;
        }
      "
    />

    <CustomInputText
      v-model="form.password"
      :placeholder="$t('views.signIn.form.password.placeholder')"
      type="password"
      minlength="4"
      name="password"
      required
    >
      <template #iconLeft>
        <CustomIcon name="password" />
      </template>
    </CustomInputText>

    <CustomButton type="submit" :disabled="!isDisabled" :loading="isLoading">
      {{ $t("components.signUp.signUp") }}
    </CustomButton>

    <DividerWithText> {{ $t("components.signIn.or") }}</DividerWithText>
    <div class="flex flex-col gap-6">
      <FacebookLogin mode="register" />
      <GoogleLogin mode="register" />
    </div>
  </CustomForm>
</template>

<style scoped lang="scss"></style>
