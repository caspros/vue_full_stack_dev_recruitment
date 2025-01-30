<script setup>
import CustomIcon from "@/src/features/shared/components/CustomIcon.vue";
import Toast from "primevue/toast";

const getToastIcon = message => {
  if (message.error) {
    return "x";
  }
  return "CheckCircleOutlined";
};

const getToastMessageTitle = message => {
  if (message.error) {
    return message.error.title;
  } else if (message.success) {
    return message.success.title;
  } else if (message.info) {
    return message.info.title;
  } else if (message.warning) {
    return message.warning.title;
  }
  return "CheckCircleOutlined";
};

const getToastMessageContent = message => {
  if (message.error) {
    return message.error.content;
  } else if (message.success) {
    return message.success.content;
  } else if (message.info) {
    return message.info.content;
  } else if (message.warning) {
    return message.warning.content;
  }
  return "CheckCircleOutlined";
};

const toastMessageClicked = (e, message, close) => {
  const eventName = e.target.getAttribute("toast-event");

  if (
    eventName &&
    message.events.find(item => item.name === eventName)?.callback
  ) {
    const event = message.events.find(item => item.name === eventName);
    event.callback();

    if (event.close && close) {
      close();
    }
  }

  if (
    message?.success?.content?.includes("data-custom-link-listener") &&
    close
  ) {
    setTimeout(() => {
      close();
    }, 300);
  }
};
</script>

<template>
  <Toast position="top-right" class="w-[300px] md:w-[501px]">
    <template #container="{ message, closeCallback }">
      <div
        :class="[
          'flex items-center gap-6 rounded-lg border-none px-8 py-7 shadow',
        ]"
      >
        <div>
          <div>
            <CustomIcon :name="getToastIcon(message)" width="22" height="22" />
          </div>
        </div>
        <div class="grow">
          <div class="text-md font-medium">
            {{ getToastMessageTitle(message) }}
          </div>
          <div
            class="text-sm"
            @click="toastMessageClicked($event, message, closeCallback)"
            v-html="getToastMessageContent(message)"
          ></div>
        </div>
        <div class="cursor-pointer" @click="closeCallback">
          <CustomIcon name="x" width="22" height="22" />
        </div>
      </div>
    </template>
  </Toast>
</template>

<style scoped lang="scss"></style>
