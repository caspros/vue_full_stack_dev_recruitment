<script setup>
import CustomButton from "@/src/features/shared/components/CustomButton.vue";
import CustomIcon from "@/src/features/shared/components/CustomIcon.vue";

import { useAuthProviderLink } from "../../shared/composables/useAuthProviderLink";

defineProps({
  uuid: {
    type: String,
    required: false,
  },
  mode: {
    type: String,
    required: false,
  },
});

const { getHref } = useAuthProviderLink();
</script>

<template>
  <a
    :href="
      getHref({
        provider: 'google',
        mode,
        uuid,
      })
    "
  >
    <CustomButton
      size="xl"
      variant="secondary-gray"
      class="!rounded-full !px-0 md:grid md:grid-cols-3 md:rounded-lg md:!px-8"
    >
      <CustomIcon
        name="google"
        class="justify-self-start"
        width="24"
        height="24"
      />
      <span class="hidden min-w-max justify-self-center md:inline-block">
        {{ $t("views.login.buttons.google") }}
      </span>
    </CustomButton>
  </a>
</template>
