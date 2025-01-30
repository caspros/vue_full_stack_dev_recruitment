import { onMounted } from "vue";
import { useRoute } from "vue-router";

import { useToast } from "primevue/usetoast";
import { useI18n } from "vue-i18n";

import pushToast from "@/src/features/shared/composables/pushToast.js";

export function useProvidersErrorHandler() {
  const route = useRoute();
  const { t } = useI18n();
  const toast = useToast();

  onMounted(() => {
    const error = route.query.error;

    if (!error) return;

    if (error === "no-user-found-for-social-login") {
      pushToast({
        toast,
        info: {
          content: t("components.signup.socialEmptyAccount"),
        },
      });

      return;
    }

    if (error === "needs-to-register") {
      pushToast({
        toast,
        info: {
          content: t("components.signup.needsToRegister"),
        },
      });

      return;
    }

    if (error === "bad-account-type") {
      pushToast({
        toast,
        info: {
          content: t("components.signup.badAccountType"),
        },
      });

      return;
    }

    if (error === "email-already-taken") {
      pushToast({
        toast,
        info: {
          content: t("components.signup.emailAlreadyTaken"),
        },
      });

      return;
    }

    if (error === "social-login-failed") {
      pushToast({
        toast,
        info: {
          content: t("components.signup.socialLoginFailed"),
        },
      });

      return;
    }

    if (error === "no-email-provided") {
      pushToast({
        toast,
        info: {
          content: t("components.signup.noEmailProvided"),
        },
      });

      return;
    }
  });
}
