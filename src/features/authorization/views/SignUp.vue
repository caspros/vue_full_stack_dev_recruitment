<script setup>
import { ref } from "vue";

import * as yup from "yup";
import gql from "graphql-tag";
import { useI18n } from "vue-i18n";
import { useMutation } from "@vue/apollo-composable";
import { useRouter } from "vue-router";
import { useToast } from "primevue/usetoast";
import { useForm, useField } from "vee-validate";

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

const { t } = useI18n();
const toast = useToast();
const isLoading = ref(false);

const schema = yup.object({
  first_name: yup.string().required(t("views.signIn.form.firstName.required")),
  last_name: yup.string().required(t("views.signIn.form.lastName.required")),
  phone: yup
    .string()
    .required(t("views.signIn.form.phone.required"))
    .matches(/^\+?\d{10,15}$/, t("views.signIn.form.phone.invalid")),
  password: yup
    .string()
    .required(t("views.signIn.form.password.required"))
    .min(4, t("views.signIn.form.password.minLength")),
});

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

const { handleSubmit, setErrors, isSubmitting, isValid, errors } = useForm({
  validationSchema: schema,
});

const { value: firstName } = useField("first_name");
const { value: lastName } = useField("last_name");
const { value: phone } = useField("phone");
const { value: password } = useField("password");

const { mutate: registerMutate } = useMutation(CGRegister_MUTATION, {
  clientId: "auth",
});

const router = useRouter();
const authorizationStore = useAuthorizationStore();

async function handleRegister(token) {
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

const register = handleSubmit(async values => {
  try {
    isLoading.value = true;
    const response = await registerMutate({
      variables: {
        first_name: values.first_name,
        last_name: values.last_name,
        phone: values.phone,
        password: values.password,
        phone_country_id: 37,
      },
    });

    await handleRegister(response.data.RegisterCaregiver.token);
  } catch (error) {
    pushToast({
      toast,
      error: error.graphQLErrors,
    });
  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <CustomForm
    v-model:valid="isValid"
    class="mx-auto mt-19 flex max-w-[376px] flex-col gap-16 md:gap-12"
    @submit="register"
  >
    <CustomInputText
      v-model="firstName"
      :placeholder="$t('views.signIn.form.firstName.placeholder')"
      type="text"
      name="first_name"
      :error="errors.first_name"
      required
    />

    <CustomInputText
      v-model="lastName"
      :placeholder="$t('views.signIn.form.lastName.placeholder')"
      type="text"
      name="last_name"
      :error="errors.last_name"
      required
    />

    <PhoneNumberInput
      v-model.number="phone"
      name="phone"
      :error="errors.phone"
    />

    <CustomInputText
      v-model="password"
      :placeholder="$t('views.signIn.form.password.placeholder')"
      type="password"
      minlength="4"
      name="password"
      :error="errors.password"
      required
    >
      {{ errors.password }}
      <template #iconLeft>
        <CustomIcon name="password" />
      </template>
    </CustomInputText>

    <CustomButton type="submit" :disabled="!isValid" :loading="isLoading">
      {{ $t("components.signUp.signUp") }}
    </CustomButton>

    <DividerWithText> {{ $t("components.signIn.or") }}</DividerWithText>
    <div class="flex flex-row justify-center gap-4 md:flex-col">
      <FacebookLogin mode="register" />
      <GoogleLogin mode="register" />
    </div>
  </CustomForm>
</template>

<style scoped lang="scss"></style>
