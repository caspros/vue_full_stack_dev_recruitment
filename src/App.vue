<script setup>
import { useRoute } from "vue-router";
import { Vue3Snackbar } from "vue3-snackbar";
import CustomToast from "@/src/features/shared/components/CustomToast.vue";
import PrimeVueConfirmDialog from "@/src/features/shared/prime-vue/PrimeVueConfirmDialog.vue";
import DynamicDialog from "primevue/dynamicdialog";
import {
  onMounted,
  onBeforeUnmount,
  ref,
  computed,
  provide,
  watch,
  nextTick,
} from "vue";
import { useMatchingCalculationListener } from "@/src/features/shared/composables/useMatchingCalculationListener.js";
import { useAuthorizationStore } from "@/src/store/authorization.js";
import primeVueLocales from "@/src/assets/lang/primeVueLocales.json";
import { usePrimeVue } from "primevue/config";

const primevue = usePrimeVue();
const inactivityTimeout = ref(null);
const inactivityPeriod = 30 * 60 * 1000; // 30 minut

const resetInactivityTimeout = () => {
  if (inactivityTimeout.value) {
    clearTimeout(inactivityTimeout.value);
  }
  inactivityTimeout.value = setTimeout(() => {
    window.location.reload();
  }, inactivityPeriod);
};

const setupActivityListeners = () => {
  const events = ["mousemove", "keydown", "scroll", "click"];
  events.forEach(event => {
    window.addEventListener(event, resetInactivityTimeout);
  });
};

const removeActivityListeners = () => {
  const events = ["mousemove", "keydown", "scroll", "click"];
  events.forEach(event => {
    window.removeEventListener(event, resetInactivityTimeout);
  });
};

onMounted(async () => {
  setupActivityListeners();
  resetInactivityTimeout();

  // Use MutationObserver to hide the spinner once the content is loaded
  const spinner = document.getElementById("spinner-container");

  const observer = new MutationObserver(() => {
    const content = document.querySelector(".flex");
    if (content && spinner) {
      spinner.style.display = "none"; // Hide spinner
      observer.disconnect(); // Stop observing after content is loaded
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
});

onBeforeUnmount(() => {
  removeActivityListeners();
  if (inactivityTimeout.value) {
    clearTimeout(inactivityTimeout.value);
  }
});

const route = useRoute();
const user = computed(() => useAuthorizationStore().userData);
const caregiver = computed(() =>
  user.value?.current_roleable?.roleable_type === "caregiver"
    ? user.value?.current_roleable?.roleable
    : null,
);

const { watchCaregiverMatching, caregiverMatchingInProgress } =
  useMatchingCalculationListener();
watchCaregiverMatching({ caregiver });

provide("caregiverMatchingInProgress", caregiverMatchingInProgress);

const setPrimeVueLocale = computed(() => primeVueLocales[user.value?.locale]);
watch(
  setPrimeVueLocale,
  newLocale => {
    primevue.config.locale = newLocale;
  },
  { immediate: true },
);
</script>

<template>
  <CustomToast />
  <PrimeVueConfirmDialog />
  <DynamicDialog />
  <vue3-snackbar bottom right :duration="4000"></vue3-snackbar>
  <div class="font-inter text-gray-900">
    <component v-if="route.meta.layout" :is="route.meta.layout">
      <router-view></router-view>
    </component>
    <router-view v-else v-slot="{ Component }">
      <transition
        v-if="route.meta.transition"
        :name="route.meta.transition"
        mode="out-in"
      >
        <component :is="Component" />
      </transition>
      <component :is="Component" v-else />
    </router-view>
  </div>
</template>
