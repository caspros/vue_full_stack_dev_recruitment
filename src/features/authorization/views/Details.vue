<script setup>
import { computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import CustomSteps from "@/src/features/shared/components/CustomSteps.vue";
import AccountDetails from "@/src/features/authorization/components/AccountDetails.vue";
import CompanyDetails from "@/src/features/authorization/components/CompanyDetails.vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const STEPS = {
  "account-details": {
    value: 1,
    label: t("components.details.step1.label"),
    component: AccountDetails,
    title: "components.details.step1.title",
    description: "components.details.step1.description",
  },
  "company-details": {
    value: 2,
    label: t("components.details.step2.label"),
    component: CompanyDetails,
    title: "components.details.step2.title",
    description: "components.details.step2.description",
  },
  "finish": {
    value: 3,
    label: t("components.details.step3.label"),
  },
};

const BREADCRUMBS_STEPS = Object.values(STEPS).map(step => ({
  label: step.label,
  value: step.value,
}));

const DEFAULT_STEP = "account-details";

const route = useRoute();
const currentStep = computed(() => {
  const step = route.params.step;

  return STEPS[step] || STEPS[DEFAULT_STEP];
});

const router = useRouter();
onMounted(() => {
  if (!STEPS[route.params.step]) {
    router.replace({
      name: "Details",
      params: {
        step: DEFAULT_STEP,
      },
    });
  }
});
</script>

<template>
  <div class="mx-auto mt-30 max-w-[536px] overflow-x-hidden">
    <h1 class="mb-4 text-center text-display-lg font-light text-gray-600">
      {{ $t(currentStep.title) }}
    </h1>

    <p class="mx-auto w-5/6 text-center text-sm font-light text-gray-600">
      {{ $t(currentStep.description) }}
    </p>

    <CustomSteps
      :model-value="currentStep.value"
      class="mb-16 mt-30"
      :steps="BREADCRUMBS_STEPS"
    />

    <Transition name="slide-left">
      <component :is="currentStep.component" />
    </Transition>
  </div>
</template>
