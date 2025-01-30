<script setup>
import { useRoute } from "vue-router";
import { computed, defineAsyncComponent } from "vue";

const VIEWS = {
  resetPassword: {
    component: defineAsyncComponent(
      () => import("@/src/features/authorization/components/ResetPassword.vue"),
    ),
    title: "components.resetPassword.title",
    description: "components.resetPassword.description",
  },
  setPassword: {
    component: defineAsyncComponent(
      () => import("@/src/features/authorization/components/SetPassword.vue"),
    ),
    title: "components.setPassword.title",
    description: "components.setPassword.description",
  },
};

const route = useRoute();
const view = computed(() => {
  const token = route.query.token;
  const email = route.query.email;

  if (token && email) {
    return VIEWS.setPassword;
  }

  return VIEWS.resetPassword;
});
</script>

<template>
  <div>
    <h1 class="mb-4 text-center text-display-lg font-light text-gray-600">
      {{ $t(view.title) }}
    </h1>

    <p class="mx-auto w-5/6 text-center text-sm font-light text-gray-600">
      {{ $t(view.description) }}
    </p>

    <component :is="view.component" />
  </div>
</template>

<style scoped lang="scss"></style>
