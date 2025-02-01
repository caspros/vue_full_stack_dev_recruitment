<script setup>
import { useRoute } from "vue-router";
import LinkWithText from "@/src/features/authorization/components/LinkWithText.vue";

const route = useRoute();
</script>

<template>
  <div>
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
      <template #link> {{ $t("components.authLayout.signup") }} </template>
    </LinkWithText>
  </div>
</template>
