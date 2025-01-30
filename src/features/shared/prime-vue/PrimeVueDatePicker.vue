<script setup>
import { computed } from "vue";
import Calendar from "primevue/calendar";
import CustomIcon from "@/src/features/shared/components/CustomIcon.vue";

const props = defineProps({
  modelValue: {
    type: String,
    default: null,
  },
});
const emit = defineEmits(["update:modelValue"]);

// We need to convert date to string
const model = computed({
  get: () => {
    if (props.modelValue) {
      let [hours, minutes] = props.modelValue.split(":").map(Number);
      let today = new Date();
      today.setHours(hours, minutes, 0, 0);
      return today;
    }
    return null;
  },
  set: v => {
    let hours = v.getHours();
    let minutes = v.getMinutes();

    // Pad hours and minutes with leading zeros if necessary
    let timeString = `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;
    emit("update:modelValue", timeString);
  },
});
</script>

<template>
  <Calendar
    v-model="model"
    showIcon
    iconDisplay="input"
    timeOnly
    :manualInput="true"
    inputId="templatedisplay"
    class="relative text-md font-normal"
  >
    <template #inputicon="{ clickCallback }">
      <div class="absolute ml-5 flex h-full">
        <CustomIcon
          width="24"
          height="24"
          class="font my-auto justify-self-start text-gray-400"
          name="clock"
          @click="clickCallback"
        />
      </div>
      <div class="absolute right-[0px] ml-5 flex h-full pr-5">
        <CustomIcon
          width="24"
          height="24"
          class="font my-auto justify-self-start text-lg text-gray-400"
          name="chevron-down"
          @click="clickCallback"
        />
      </div>
    </template>
  </Calendar>
</template>
