<script setup>
import { RouterLink, useRoute } from "vue-router";
import ApplicationLogo from "@/src/features/shared/components/ApplicationLogo.vue";
import AuthSlogan from "@/src/features/authorization/components/AuthSlogan.vue";
import TickList from "@/src/features/authorization/components/TickList.vue";
import { productFruits } from "product-fruits";
import { onMounted } from "vue";
import i18n from "@/src/assets/config.js";
import AuthLinkWithTextWrapper from "@/src/features/authorization/components/AuthLinkWithTextWrapper.vue";

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
      <div class="hidden md:block">
        <slot name="top-right">
          <AuthLinkWithTextWrapper />
        </slot>
      </div>
      <div class="mt-32 md:mt-0 lg:flex lg:grow lg:flex-col lg:justify-start">
        <RouterLink to="/">
          <ApplicationLogo class="mt-0 w-full text-brand-500 lg:mb-[120px]" />
        </RouterLink>
        <div
          v-if="route.name === 'SignUp'"
          class="mx-auto mt-24 block max-w-[300px] p-4 text-center text-lg text-gray-900 md:hidden"
        >
          {{ $t("views.register.mobileHeaderDescription.firstPart") }}
          <span class="text-purple-600">
            {{
              $t("views.register.mobileHeaderDescription.jobsCount", [1.367])
            }}
          </span>
          {{ $t("views.register.mobileHeaderDescription.lastPart") }}
        </div>

        <div>
          <h1
            v-if="route.meta.title"
            class="mb-20 mt-20 text-center text-display-lg font-bold text-gray-600 md:mb-30 md:mt-30 md:font-light"
          >
            {{ $t(route.meta.title) }}
          </h1>

          <slot></slot>
        </div>
        <div class="block md:hidden">
          <slot name="bottom-middle">
            <AuthLinkWithTextWrapper />
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>
