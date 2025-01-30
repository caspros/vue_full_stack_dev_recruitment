<script setup>
import { RouterLink, useRoute } from "vue-router";
import ApplicationLogo from "@/src/features/shared/components/ApplicationLogo.vue";
import AuthSlogan from "@/src/features/authorization/components/AuthSlogan.vue";
import TickList from "@/src/features/authorization/components/TickList.vue";
import LinkWithText from "@/src/features/authorization/components/LinkWithText.vue";
import { productFruits } from "product-fruits";
import { onMounted } from "vue";
import i18n from "@/src/assets/config.js";

const route = useRoute();

const LIST_DATA = {
  description: "components.tickList.description",
  items: [
    {
      title: "components.tickList.item1.title",
      description: "components.tickList.item1.description",
    },
    {
      title: "components.tickList.item2.title",
      description: "components.tickList.item2.description",
    },
    {
      title: "components.tickList.item3.title",
      description: "components.tickList.item3.description",
    },
  ],
};

onMounted(() => {
  i18n.global.locale.value = "pl";

  if (window.productFruits && window.productFruits.services) {
    window.productFruits.services?.destroy();
  }
  productFruits.init("0q3RRyySrLmbqf15", "pl", {
    username: `unauthorizedUser-${new Date().getTime()}`,
  });
});
</script>

<template>
  <div class="min-h-screen justify-items-center lg:grid lg:grid-cols-[1fr_1fr]">
    <div class="mt-[242px] hidden px-10 lg:block">
      <AuthSlogan />
      <TickList
        v-if="!route.meta.isHiddenList"
        class="mt-[40px]"
        :description="LIST_DATA.description"
        :items="LIST_DATA.items"
      />
    </div>

    <div class="min-h-screen w-full bg-white px-10 pt-8 lg:flex lg:flex-col">
      <slot name="top-right">
        <LinkWithText
          v-if="route.name === 'SignUp'"
          class="mb-6 px-14 text-center lg:mb-0 lg:text-right"
          to="/login"
        >
          <template #text>
            {{ $t("components.signUp.alreadyHaveAccout") }}
          </template>
          <template #link> {{ $t("components.signUp.signIn") }} </template>
        </LinkWithText>
        <LinkWithText
          v-else-if="route.name === 'Login'"
          class="mb-6 px-14 text-center lg:mb-0 lg:text-right"
          to="/sign-up"
        >
          <template #text>
            {{ $t("components.authLayout.dontHaveAccount") }}
          </template>
          <template #link> {{ $t("components.authLayout.signup") }}</template>
        </LinkWithText>
      </slot>
      <div class="lg:flex lg:grow lg:flex-col lg:justify-start">
        <RouterLink to="/">
          <ApplicationLogo class="mt-0 w-full text-brand-500 lg:mb-[120px]" />
        </RouterLink>
        <div>
          <h1
            v-if="route.meta.title"
            class="mb-30 mt-30 text-center text-display-lg font-light text-gray-600"
          >
            {{ $t(route.meta.title) }}
          </h1>

          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>
