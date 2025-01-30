import { createRouter, createWebHistory } from "vue-router";
import authRoutes from "../features/authorization/router/routes.js";
import { useAuthorizationStore } from "@/src/store/authorization.js";
import i18n from "@/src/assets/config.js";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...authRoutes],
});

let initialized = false;

/* eslint-disable */
router.beforeEach(async (to, from, next) => {
  if (!to.name) {
    next({ name: "Login" });
  } else if (to.name === "CgPrivacyPolicy") {
    next();
  }

  const authorizationStore = useAuthorizationStore();
  let user = authorizationStore.userData;
  if (!user && !initialized) {
    await authorizationStore.fetchUserData();
    initialized = true;
  }
  user = authorizationStore.userData;

  if (!user && to.meta.auth) {
    next({
      name: "Login",
      params: {
        redirect: window.location.pathname,
      },
    });
  } else if (!user && !to.meta.auth) {
    next();
  } else if ((user && to.meta.auth) || (!user && !to.meta.auth)) {
    const pageTitle = i18n.global.t(`${to.meta.lang}`);
    document.title = `mamamia - ${pageTitle}`;
    if (
      checkIfRouteCorrectForType(to) &&
      (to.meta.auth === true ||
        to.meta.auth.includes(authorizationStore.userRole))
    ) {
      next();
    } else {
      next({ name: getDefaultRouteForUserType() });
    }
  } else if (user && ["Login", "CgVerify", "ResetPassword"].includes(to.name)) {
    next({ name: getDefaultRouteForUserType() });
  }

  next({ name: "CaregiverAgency" });
});

function getDefaultRouteForUserType() {
  const storeAuthorization = useAuthorizationStore();
  const TYPE = storeAuthorization.userType;

  if (TYPE === "serviceAgency") {
    return "ServiceAgency";
  } else if (TYPE === "caregiverAgency") {
    return "CaregiverAgency";
  } else if (TYPE === "caregiver") {
    return "CgLayout";
  } else if (TYPE === "customer") {
    return "CustomerLayout";
  }
}

function checkIfRouteCorrectForType(to) {
  const storeAuthorization = useAuthorizationStore();
  const TYPE = storeAuthorization.userType;

  if (
    ["sign-up", "verification-code"].some(path => to.fullPath.includes(path))
  ) {
    return true;
  } else if (
    TYPE === "serviceAgency" &&
    !to.fullPath.includes("service-agency")
  ) {
    return false;
  } else if (
    TYPE === "caregiverAgency" &&
    !to.fullPath.includes("caregiver-agency")
  ) {
    return false;
  } else if (TYPE === "caregiver" && !to.fullPath.includes("caregiver/")) {
    return false;
  } else if (TYPE === "customer" && !to.fullPath.includes("customer/")) {
    return false;
  }

  return true;
}

export { router };
