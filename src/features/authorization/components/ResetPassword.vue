<script setup>
import { useMutation } from "@vue/apollo-composable";
import gql from "graphql-tag";
import { computed, nextTick, ref, watch } from "vue";
import { useToast } from "primevue/usetoast";
import pushToast from "@/src/features/shared/composables/pushToast.js";
import { RouterLink, useRouter } from "vue-router";
import CustomInputText from "@/src/features/shared/components/CustomInputText.vue";
import CustomButton from "@/src/features/shared/components/CustomButton.vue";
import CustomIcon from "@/src/features/shared/components/CustomIcon.vue";
import CustomForm from "@/src/features/shared/components/CustomForm.vue";
import { useI18n } from "vue-i18n";
import PhoneNumberInput from "@/src/features/shared/components/PhoneNumberInput.vue";
import { useStoreOptions } from "@/src/features/shared/composables/useStoreOption.js";
const router = useRouter();

const SendTokenResetPassword_MUTATION = gql`
  mutation SendTokenResetPassword(
    $email: String
    $phone: String
    $country_id: Int
  ) {
    SendTokenResetPassword(
      email: $email
      phone: $phone
      country_id: $country_id
    )
  }
`;
const { mutate: sendTokenPassword } = useMutation(
  SendTokenResetPassword_MUTATION,
  {
    clientId: "auth",
  },
);

const { t } = useI18n();
const toast = useToast();
const isLoading = ref(false);
const isDisabled = ref(false);
const form = ref({
  email: "",
  phone: "",
  country_id: null,
});

const emailInput = ref(null);
const phoneInput = ref(null);
const countryPrefix = ref(null);
const isPhoneNumber = computed(() => {
  const email = form.value.email;
  return email.length >= 3 && /^\d+$/.test(email);
});

async function resetPassword() {
  isLoading.value = true;

  try {
    const formData = JSON.parse(JSON.stringify(form.value));
    if (isPhoneNumber.value) {
      formData.phone = formData.email;
      delete formData.email;
      formData.country_id = countryPrefix.value.id;
    } else {
      delete formData.phone;
      delete formData.country_id;
    }
    const response = await sendTokenPassword(formData);

    if (response.data.SendTokenResetPassword) {
      pushToast({
        toast,
        success: {
          title: t("components.resetPassword.title"),
          content: t("components.resetPassword.resetLinkSend"),
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

const { countryOptions } = useStoreOptions();
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
</script>

<template>
  <CustomForm
    v-model:valid="isDisabled"
    class="mx-auto mt-19 flex max-w-[376px] flex-col gap-12"
    @submit="resetPassword"
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
      :placeholder="$t('views.login.form.email.placeholder')"
      type="text"
      name="email"
      minlength="4"
      required
    >
      <template #iconLeft>
        <CustomIcon name="mail" />
      </template>
    </CustomInputText>

    <CustomButton
      :loading="isLoading"
      :disabled="!isDisabled"
      size="xl"
      type="submit"
    >
      {{ $t("components.resetPassword.sendLink") }}
    </CustomButton>

    <RouterLink
      to="/login"
      class="text-center text-xs font-medium text-pink-900 transition-colors hover:text-brand-400"
    >
      {{ $t("components.resetPassword.backToSignIn") }}
    </RouterLink>
  </CustomForm>
</template>
