import AuthLayout from "@/src/features/authorization/layouts/AuthLayout.vue";
import SimpleLayout from "@/src/features/authorization/layouts/SimpleLayout.vue";
import { useSharedStore } from "@/src/features/shared/store.js";

export default [
  {
    path: "/login/:redirect?",
    component: () => import("@/src/features/authorization/views/SignIn.vue"),
    name: "Login",
    beforeEnter: async (to, from, next) => {
      useSharedStore().fetchCountriesQuery();
      next();
    },
    meta: {
      layout: AuthLayout,
      auth: false,
      title: "views.login.header",
    },
  },
  {
    path: "/sign-up",
    component: () => import("@/src/features/authorization/views/SignUp.vue"),
    name: "SignUp",
    beforeEnter: async (to, from, next) => {
      useSharedStore().fetchCountriesQuery();
      next();

      if (to.query.error) {
        next({
          name: "Login",
          query: {
            error: to.query.error,
          },
        });
      }
    },
    meta: {
      layout: AuthLayout,
      auth: false,
      title: "views.signup.header",
    },
  },
  {
    path: "/verification-code",
    component: () =>
      import("@/src/features/authorization/views/VerificationCode.vue"),
    name: "VerificationCode",
    meta: {
      layout: SimpleLayout,
      auth: true,
      title: "components.verificationCode.title",
    },
  },
  {
    path: "/reset-password",
    component: () =>
      import("@/src/features/authorization/views/ResetPassword.vue"),
    name: "ResetPassword",
    beforeEnter: async (to, from, next) => {
      useSharedStore().fetchCountriesQuery();
      next();
    },
    meta: {
      layout: AuthLayout,
      auth: false,
      isHiddenList: true,
    },
  },
  {
    path: "/sign-up/:token",
    component: () =>
      import("@/src/features/authorization/views/TokenRegister.vue"),
    name: "AuthToken",
    meta: {
      layout: SimpleLayout,
      auth: false,
    },
  },
  {
    path: "/sign-up/details/:step",
    component: () => import("@/src/features/authorization/views/Details.vue"),
    name: "Details",
    meta: {
      layout: AuthLayout,
      auth: true,
    },
  },
];
