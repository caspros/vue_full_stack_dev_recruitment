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
    <CustomButton size="xl" variant="secondary-gray" class="grid grid-cols-3">
      <CustomIcon
        name="google"
        class="justify-self-start"
        width="24"
        height="24"
      />
      <span class="min-w-max justify-self-center">
        {{ $t("views.login.buttons.google") }}
      </span>
    </CustomButton>
  </a>
</template>
