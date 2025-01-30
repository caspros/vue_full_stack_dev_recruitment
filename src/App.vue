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
  window.addEventListener("mousemove", resetInactivityTimeout);
  window.addEventListener("keydown", resetInactivityTimeout);
  window.addEventListener("scroll", resetInactivityTimeout);
  window.addEventListener("click", resetInactivityTimeout);
};

const removeActivityListeners = () => {
  window.removeEventListener("mousemove", resetInactivityTimeout);
  window.removeEventListener("keydown", resetInactivityTimeout);
  window.removeEventListener("scroll", resetInactivityTimeout);
  window.removeEventListener("click", resetInactivityTimeout);
};

onMounted(async () => {
  setupActivityListeners();
  resetInactivityTimeout();
  await nextTick();
  const contentCheckInterval = setInterval(() => {
    const content = document.querySelector(".flex");
    if (content) {
      const spinner = document.getElementById("spinner-container");
      if (spinner) {
        spinner.style.display = "none";
      }
      clearInterval(contentCheckInterval);
    }
  }, 300);
});

onBeforeUnmount(() => {
  removeActivityListeners();
  if (inactivityTimeout.value) {
    clearTimeout(inactivityTimeout.value);
  }
});

const route = useRoute();

const caregiver = computed(() => {
  const { userData } = useAuthorizationStore();
  return userData?.current_roleable?.roleable_type === "caregiver"
    ? userData?.current_roleable?.roleable
    : null;
});

const user = computed(() => {
  return useAuthorizationStore().userData;
});

watch(
  () => user.value,
  v => {
    if (v) {
      primevue.config.locale = primeVueLocales[v.locale];
    }
  },
  {
    immediate: true,
    deep: true,
  },
);

const { watchCaregiverMatching, caregiverMatchingInProgress } =
  useMatchingCalculationListener();
watchCaregiverMatching({ caregiver });

provide("caregiverMatchingInProgress", caregiverMatchingInProgress);
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
