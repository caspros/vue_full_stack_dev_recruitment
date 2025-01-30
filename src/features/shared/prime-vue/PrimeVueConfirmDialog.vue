<script setup>
import ConfirmDialog from "primevue/confirmdialog";
import CustomButton from "@/src/features/shared/components/CustomButton.vue";
import CustomIcon from "@/src/features/shared/components/CustomIcon.vue";
</script>

<template>
  <ConfirmDialog>
    <template #container="{ message, acceptCallback, rejectCallback }">
      <div class="flex items-center gap-2 border-b border-gray-200 px-6 py-4">
        <div>
          <CustomIcon
            :name="message.icon"
            width="24"
            height="24"
            class="text-warning-500"
          />
        </div>
        <div class="text-lg font-medium text-gray-700">
          {{ message.header }}
        </div>
      </div>
      <div class="max-w-[600px] px-6 py-10 text-sm">
        {{ message.message }}
      </div>
      <div>
        <div class="flex justify-end gap-4 px-6 pb-10">
          <CustomButton
            v-if="
              rejectCallback && message.rejectVariant && message.rejectLabel
            "
            size="lg"
            :variant="message.rejectVariant"
            :data-test-attr="message.rejectDataTestAttr"
            @click="rejectCallback"
          >
            {{ message.rejectLabel }}
          </CustomButton>
          <CustomButton
            size="lg"
            :variant="message.acceptVariant"
            :data-test-attr="message.acceptDataTestAttr"
            @click="acceptCallback"
          >
            {{ message.acceptLabel }}
          </CustomButton>
        </div>
      </div>
    </template>
  </ConfirmDialog>
</template>

<style scoped lang="scss"></style>
