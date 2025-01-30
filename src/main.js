import { createApp, provide, h } from "vue";
import { ApolloClients } from "@vue/apollo-composable";
import apolloClient from "./apollo";
import authClient from "@/src/auth.js";

import { VueQueryPlugin, QueryClient } from "@tanstack/vue-query";

import App from "./App.vue";
import { router } from "./router/index.js";
import { createPinia } from "pinia";
import Tooltip from "primevue/tooltip";
import { SnackbarService } from "vue3-snackbar";
import "vue3-snackbar/styles";
import PrimeVue from "primevue/config";
import vueClickOutsideElement from "vue-click-outside-element";
import ToastService from "primevue/toastservice";
import Ripple from "primevue/ripple";
import ConfirmationService from "primevue/confirmationservice";
import DialogService from "primevue/dialogservice";
import "./features/shared/utils/validateRules.js";
// import "./pusher.js";
import axios from "./axios.js";

import "@/src/assets/theme.scss";
import "./style.css";

// import Lara from "@/src/presets/lara";
import { startRecord } from "./features/shared/utils/recorder.js";
import i18n from "@/src/assets/config.js";

const pinia = createPinia();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 15 * 60 * 1000,
      staleTime: 5 * 60 * 1000,
      refetchOnWindowFocus: true,
      refetchInterval: 20 * 60 * 1000,
      retry: 2,
      refetchOnReconnect: true,
    },
  },
});

(async () => {
  //reset cookies on reset password page
  if (
    window.location.href.includes("reset-password") &&
    window.location.href.includes("token") &&
    window.location.href.includes("email")
  ) {
    await axios.get("api/forget-cookies");
  }

  await axios.get("sanctum/csrf-cookie");

  const app = createApp({
    setup() {
      // provide(DefaultApolloClient, apolloClient);
      provide(ApolloClients, {
        default: apolloClient,
        auth: authClient,
      });
    },

    render: () => h(App),
  });

  startRecord({ router, app });

  app.use(vueClickOutsideElement);
  // app.directive("tooltip", tooltip);
  app.directive("tooltip", Tooltip);
  app.directive("ripple", Ripple);
  app.use(SnackbarService);
  app.use(ConfirmationService);
  app.use(DialogService);
  app.use(PrimeVue, {
    unstyled: false,
    ripple: true,
  });
  app.use(ToastService);
  app.use(i18n).use(pinia).use(router).mount("#app");
  app.use(VueQueryPlugin, { queryClient });
})();
