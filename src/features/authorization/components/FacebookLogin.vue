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
        uuid,
        mode,
        provider: 'facebook',
      })
    "
  >
    <CustomButton
      size="xl"
      variant="blue"
      class="!rounded-full !px-0 md:grid md:grid-cols-3 md:rounded-lg md:!px-8"
    >
      <CustomIcon
        name="facebook"
        class="justify-self-start"
        width="25"
        height="24"
      />
      <span class="hidden min-w-max justify-self-center md:inline-block">
        {{ $t("views.login.buttons.facebook") }}
      </span>
    </CustomButton>
  </a>
</template>
