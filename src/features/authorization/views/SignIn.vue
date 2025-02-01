<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";

import gql from "graphql-tag";
import { useI18n } from "vue-i18n";
import { useMutation } from "@vue/apollo-composable";
import { useQueryClient } from "@tanstack/vue-query";
import { useToast } from "primevue/usetoast";
import { useForm, useField } from "vee-validate";
import * as yup from "yup";

import { RouterLink } from "vue-router";

import CustomButton from "@/src/features/shared/components/CustomButton.vue";
import CustomForm from "@/src/features/shared/components/CustomForm.vue";
import CustomIcon from "@/src/features/shared/components/CustomIcon.vue";
import CustomInputText from "@/src/features/shared/components/CustomInputText.vue";
import DividerWithText from "@/src/features/authorization/components/DividerWithText.vue";
import FacebookLogin from "@/src/features/authorization/components/FacebookLogin.vue";
import GoogleLogin from "@/src/features/authorization/components/GoogleLogin.vue";
import PhoneNumberInput from "@/src/features/shared/components/PhoneNumberInput.vue";

import { useAuthorizationStore } from "@/src/store/authorization.js";
import { useEmailOrPhoneInput } from "@/src/features/authorization/composables/useEmailOrPhoneInput.js";
import { useProvidersErrorHandler } from "@/src/features/authorization/composables/useProvidersErrorHandler.js";

import pushToast from "@/src/features/shared/composables/pushToast.js";

const { t } = useI18n();
const authorizationStore = useAuthorizationStore();

const router = useRouter();
const route = useRoute();

useProvidersErrorHandler();

const schema = yup.object({
  email: yup
    .string()
    .required(t("components.signIn.validation.emailRequired"))
    .email(t("components.signIn.validation.invalidEmail")),
  password: yup
    .string()
    .required(t("components.signIn.validation.passwordRequired"))
    .min(4, t("components.signIn.validation.passwordMinLength")),
});

const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!, $remember: Boolean!) {
    Login(email: $email, password: $password, remember: $remember) {
      token
    }
  }
`;

const toast = useToast();
const form = ref({
  email: "",
  password: "",
  remember: false,
});
const isValid = ref(true);
const isLoading = ref(false);

const { isPhoneNumber, emailInput, phoneInput, countryPrefix } =
  useEmailOrPhoneInput(form);

const { onDone, mutate: login } = useMutation(LOGIN_MUTATION, {
  clientId: "auth",
});

const { handleSubmit, errors, isSubmitting } = useForm({
  validationSchema: schema,
});

const { value: emailValue, errorMessage: emailError } = useField("email");
const { value: passwordValue, errorMessage: passwordError } =
  useField("password");

function submitForm() {
  isLoading.value = true;
  login({
    email: form.value.email,
    password: form.value.password,
    remember: form.value.remember,
    phone_country_id: isPhoneNumber.value ? countryPrefix.value.id : null,
  });
}

onDone(async result => {
  try {
    if (result.data.Login) {
      // localStorage.setItem("token", result.data.Login.token);
      await authorizationStore.fetchUserData();
      router.push(
        route?.params?.redirect
          ? { path: route.params.redirect }
          : { name: "CaregiverAgency" },
      );
    } else {
      pushToast({
        toast,
        customError: {
          title: t("components.signIn.error.title"),
          content: t("components.signIn.error.message"),
        },
      });
    }
  } catch (error) {
    pushToast({
      toast,
      error: error.graphQLErrors,
    });

    isLoading.value = false;
  }
});

useQueryClient().clear();
</script>

<template>
  <CustomForm
    v-model:valid="isValid"
    class="mx-auto mt-19 flex max-w-[376px] flex-col gap-6 md:gap-12"
    @submit="handleSubmit(submitForm)"
  >
    <PhoneNumberInput
      v-if="isPhoneNumber"
      ref="phoneInput"
      v-model="form.email"
      v-model:country="countryPrefix"
      name="email"
    />
    <CustomInputText
      v-else
      ref="emailInput"
      v-model="form.email"
      :placeholder="$t('views.signIn.form.email.placeholder')"
      type="text"
      name="email"
      minlength="4"
      required
    >
      <template #iconLeft>
        <CustomIcon name="mail" />
      </template>
      <span v-if="emailError" class="text-red-500">{{ emailError }}</span>
    </CustomInputText>

    <CustomInputText
      v-model="form.password"
      :placeholder="$t('views.login.form.password.placeholder')"
      type="password"
      minlength="4"
      name="password"
      required
    >
      <template #iconLeft>
        <CustomIcon name="password" />
      </template>
      <span v-if="passwordError" class="text-red-500">{{ passwordError }}</span>
    </CustomInputText>

    <CustomButton :disabled="!isValid || isLoading" size="xl" type="submit">
      {{ $t("views.login.buttons.login") }}
    </CustomButton>

    <RouterLink
      to="/reset-password"
      class="text-center text-xs font-medium text-pink-900 transition-colors hover:text-brand-400"
    >
      {{ $t("components.signIn.frogotPassword") }}
    </RouterLink>

    <DividerWithText> {{ $t("components.signIn.or") }}</DividerWithText>
    <div class="mb-4 flex flex-row justify-center gap-4 md:mb-0 md:flex-col">
      <FacebookLogin mode="login" />
      <GoogleLogin mode="login" />
    </div>
  </CustomForm>
</template>

<style scoped lang="scss"></style>
