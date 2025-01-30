<script setup>
import { useMutation } from "@vue/apollo-composable";
import gql from "graphql-tag";
import { ref, onMounted } from "vue";
import { RouterLink, useRoute, useRouter } from "vue-router";
import CustomInputText from "@/src/features/shared/components/CustomInputText.vue";
import CustomButton from "@/src/features/shared/components/CustomButton.vue";
import CustomIcon from "@/src/features/shared/components/CustomIcon.vue";
import CustomForm from "@/src/features/shared/components/CustomForm.vue";
import { useToast } from "primevue/usetoast";
import pushToast from "@/src/features/shared/composables/pushToast.js";
import { useI18n } from "vue-i18n";

const CGAResetPassword_MUTATION = gql`
  mutation ResetPassword(
    $password: String!
    $password_confirmation: String!
    $token: String!
    $email: String!
  ) {
    ResetPassword(
      password: $password
      password_confirmation: $password_confirmation
      token: $token
      email: $email
    ) {
      id
    }
  }
`;
const { mutate: resetPassword } = useMutation(CGAResetPassword_MUTATION, {
  clientId: "auth",
});

const { t } = useI18n();
const route = useRoute();
const toast = useToast();
const router = useRouter();

const isLoading = ref(false);
const isDisabled = ref(false);
const form = ref({
  password: "",
  password_confirmation: "",
  token: "",
  email: "",
});

onMounted(() => {
  const token = route.query.token;
  const email = route.query.email;

  if (token) {
    form.value.token = token;
    form.value.email = email;
  }
});

async function sendForm() {
  isLoading.value = true;

  try {
    const response = await resetPassword(form.value);

    if (response?.data?.ResetPassword?.id) {
      pushToast({
        toast,
        success: {
          title: t("components.resetPassword.title"),
          content: t("components.resetPassword.passwordReset"),
        },
      });
      router.push({
        name: "Login",
      });
    } else {
      pushToast({
        toast,
        customError: {
          title: t("form.errors.title"),
          content: t("form.errors.somethingWrong"),
        },
      });
    }
  } catch (error) {
    pushToast({
      toast,
      error: error.graphQLErrors,
    });
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <CustomForm
    v-model:valid="isDisabled"
    class="mx-auto mt-19 flex max-w-[376px] flex-col gap-12"
    @submit="sendForm"
  >
    <CustomInputText
      v-model="form.password"
      :placeholder="$t('views.login.form.password.placeholder')"
      type="password"
      name="password"
      minlength="4"
      required
    >
      <template #iconLeft>
        <CustomIcon name="password" />
      </template>
    </CustomInputText>

    <CustomInputText
      v-model="form.password_confirmation"
      :placeholder="$t('views.login.form.password.placeholder')"
      type="password"
      name="passwordRepeat"
      minlength="8"
      required
    >
      <template #iconLeft>
        <CustomIcon name="password" />
      </template>
    </CustomInputText>

    <CustomButton
      :loading="isLoading"
      :disabled="!isDisabled"
      size="xl"
      type="submit"
    >
      {{ $t("components.setPassword.createNewPassword") }}
    </CustomButton>

    <RouterLink
      to="/login"
      class="text-center text-xs font-medium text-pink-900 transition-colors hover:text-brand-400"
    >
      {{ $t("components.setPassword.backToSignIn") }}
    </RouterLink>
  </CustomForm>
</template>
