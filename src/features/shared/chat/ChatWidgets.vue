<script setup>
import { useAuthorizationStore } from "@/src/store/authorization.js";
import { computed } from "vue";
import { CometChatMessages } from "@cometchat/chat-uikit-vue";
import CustomIcon from "@/src/features/shared/components/CustomIcon.vue";

const cometChatUsers = computed(() => {
  return useAuthorizationStore().cometChatCurrentConversationsUsers;
});

const removeUser = user => {
  const index = cometChatUsers.value.findIndex(item => item.uuid === user.uuid);
  if (index >= 0) {
    useAuthorizationStore().cometChatCurrentConversationsUsers.splice(index, 1);
  }
};
</script>

<template>
  <div class="flex flex-row-reverse gap-10 pr-10">
    <div
      v-for="(user, i) in cometChatUsers"
      :key="`comet-chat-user-${i}`"
      class="bg-base-white shadow-[0_0_10px_2px_rgba(0,0,0,0.3)]"
    >
      <div class="flex justify-end px-2 pt-2">
        <CustomIcon name="x" class="cursor-pointer" @click="removeUser(user)" />
      </div>
      <CometChatMessages
        class="h-[400px] w-[300px]"
        :user="user"
      ></CometChatMessages>
    </div>
  </div>
</template>

<style scoped lang="scss">
::v-deep {
  .cc-messages-wrapper__messages {
    display: flex;
    flex-direction: column;
  }
  .cc-messages-wrapper__messages-list {
    flex-grow: 1;
    .cc-list__list {
      height: 172px;
    }
  }
}
</style>
