<script setup>
import { useMutation } from "@vue/apollo-composable";
import gql from "graphql-tag";
import { ref, computed, onMounted, nextTick } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useToast } from "primevue/usetoast";
import AuthLayout from "@/src/features/authorization/layouts/AuthLayout.vue";
import pushToast from "@/src/features/shared/composables/pushToast.js";
import CustomPrimeInputNumber from "@/src/features/shared/components/CustomPrimeInputNumber.vue";
import CustomButton from "@/src/features/shared/components/CustomButton.vue";
import CustomForm from "@/src/features/shared/components/CustomForm.vue";
import LinkWithText from "@/src/features/authorization/components/LinkWithText.vue";
import { useAuthorizationStore } from "@/src/store/authorization.js";
import { useI18n } from "vue-i18n";

const INPUTS_COUNT = 6;

const { t } = useI18n();
const route = useRoute();
const router = useRouter();
const authorizationStore = useAuthorizationStore();

const toast = useToast();
const refNumber = ref(null);
const isLoading = ref(false);
const isDisabled = ref(false);
const form = ref({
  num1: null,
  num2: "",
  num3: "",
  num4: "",
  num5: "",
  num6: "",
});
const isCodeFromUrl = ref(false);

onMounted(() => {
  const code = route.query.code;

  if (code && code.length === INPUTS_COUNT) {
    const codeArray = code.split("");

    for (let i = 0; i < INPUTS_COUNT; i++) {
      form.value[`num${i + 1}`] = +codeArray[i];
    }

    nextTick(() => {
      isCodeFromUrl.value = true;
    });
  }
});

const finalNumber = computed(() => {
  let finalNumber = "";

  Object.values(form.value).forEach(value => {
    finalNumber += value;
  });

  return finalNumber;
});

const VerifyCodeEmail_MUTATION = gql`
  mutation VerifyCodeEmail($code: String!) {
    VerifyCodeEmail(code: $code)
  }
`;
const { mutate: verifyMutation } = useMutation(VerifyCodeEmail_MUTATION);

const SendCodeAgain_MUTATION = gql`
  mutation SendCodeAgain($email: String!) {
    SendCodeAgain(email: $email)
  }
`;
const { mutate: sendCode } = useMutation(SendCodeAgain_MUTATION, {
  clientId: "auth",
});

async function onSubmit() {
  if (Object.values(form.value).some(value => typeof value !== "number")) {
    return;
  }

  isLoading.value = true;

  const variables = { code: finalNumber.value };

  try {
    const response = await verifyMutation(variables);

    if (response.data.VerifyCodeEmail) {
      pushToast({
        toast,
        success: {
          title: t("components.verificationCode.success"),
          content: t("components.verificationCode.succesVerification"),
        },
      });

      authorizationStore.userData.email_verified_at = true;
      router.push({ name: "Details", params: { step: "account-details" } });
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

async function sendAgain() {
  try {
    const response = await sendCode({
      email: authorizationStore.userData.email,
    });

    if (response.data.SendCodeAgain) {
      pushToast({
        toast,
        success: {
          title: t("components.verificationCode.success"),
          content: t("components.verificationCode.successText"),
        },
      });
    }
  } catch (error) {
    pushToast({
      toast,
      error: error.graphQLErrors,
    });
  }
}

const LogoutAndDeleteUser_MUTATION = gql`
  mutation LogoutAndDeleteUser {
    LogoutAndDeleteUser
  }
`;

const { mutate: logoutAndDeleteUser } = useMutation(
  LogoutAndDeleteUser_MUTATION,
);

async function cancelRegistration() {
  try {
    const response = await logoutAndDeleteUser();

    if (response.data.LogoutAndDeleteUser) {
      pushToast({
        toast,
        success: {
          title: t("components.verificationCode.success"),
          content: t("components.verificationCode.cancelSuccess"),
        },
      });

      await authorizationStore.logout();
      router.push({ name: "Login" });
    }
  } catch (error) {
    pushToast({
      toast,
      error: error.graphQLErrors,
    });
  }
}

function handleKeyup({ key }, index) {
  const currentValue = +refNumber.value[index].value;
  const isValueNumber = typeof currentValue == "number";
  const isValueDigit = currentValue >= 0 && currentValue <= 9;
  const nextInput = refNumber.value[index + 1];
  const prevInput = refNumber.value[index - 1];

  if (prevInput && key === "Backspace") {
    refNumber.value[index].updateValue({
      value: null,
    });
    prevInput.focusInput();

    return;
  }

  if (key === " " || key === "Backspace") {
    return;
  }

  if (isValueNumber && isValueDigit) {
    nextInput?.focusInput();

    return;
  }

  if (isValueNumber) {
    refNumber.value[index].updateValue({
      value: currentValue.toString().slice(0, -1),
    });
  }
}

function onPaste(evt) {
  const pasteText = evt.clipboardData.getData("text");

  if (!Number(pasteText)) {
    pushToast({
      toast,
      customError: {
        title: t("components.verificationCode.error"),
        content: t("components.verificationCode.numberValid"),
      },
    });

    return;
  }

  const code = pasteText.split("");

  for (let i = 0; i < INPUTS_COUNT; i++) {
    form.value[`num${i + 1}`] = +code[i];
  }
}
</script>

<template>
  <AuthLayout>
    <template #top-right>
      <LinkWithText class="px-14 text-right">
        <template #text>
          {{ $t("components.authLayout.dontHaveAccount") }}
        </template>
        <template #link>
          <span @click="cancelRegistration()">
            {{ $t("components.authLayout.signup") }}
          </span>
        </template>
      </LinkWithText>
    </template>

    <CustomForm
      v-model:valid="isDisabled"
      class="mx-auto mt-19 flex max-w-[376px] flex-col gap-12"
      @submit="onSubmit"
      @paste="onPaste($event)"
    >
      <div :key="isCodeFromUrl" class="flex justify-center gap-8">
        <CustomPrimeInputNumber
          v-for="(_, i, index) in form"
          :key="index"
          ref="refNumber"
          v-model="form[i]"
          class="max-w-[45px] [&_.p-inputtext]:border-0"
          :max="9"
          :min="0"
          :disabled="isLoading"
          placeholder="0"
          required
          :name="i"
          @keyup="handleKeyup($event, index)"
        />
      </div>

      <CustomButton
        size="xl"
        type="submit"
        :loading="isLoading"
        :disabled="!isDisabled"
      >
        {{ $t("components.verificationCode.button") }}
      </CustomButton>

      <div>
        <LinkWithText class="text-center">
          <template #text>
            {{ $t("components.verificationCode.codeNotWorking") }}
          </template>
          <template #link>
            <span @click="sendAgain()">
              {{ $t("components.verificationCode.sendAgain") }}
            </span>
          </template>
        </LinkWithText>

        <LinkWithText class="mt-1 text-center">
          <template #link>
            <span @click="cancelRegistration()">
              {{ $t("components.verificationCode.cancel") }}
            </span>
          </template>
        </LinkWithText>
      </div>
    </CustomForm>
  </AuthLayout>
</template>
