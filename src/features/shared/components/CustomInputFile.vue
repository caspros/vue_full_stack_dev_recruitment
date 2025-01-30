<script setup>
import { ref, watch } from "vue";
import CustomIcon from "@/src/features/shared/components/CustomIcon.vue";
import LoaderDots8 from "@/src/features/shared/loadings/LoaderDots8.vue";
import heic2any from "heic2any";

const props = defineProps({
  acceptedTypes: {
    type: String,
    default: () => "*/*",
  },
  modelValue: {
    type: File,
    default: null,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  required: {
    type: Boolean,
    default: false,
  },
  name: {
    type: String,
    default: "",
  },
  warning: {
    type: Boolean,
    default: false,
  },
  showLoader: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:modelValue"]);

const fileInput = ref(null);
const file = ref(props.modelValue ? props.modelValue : null);

watch(file, async newValue => {
  if (props.disabled) {
    return;
  }
  if (newValue && newValue.type === "image/heic") {
    const convertedBlob = await heic2any({
      blob: file,
      toType: "image/jpeg",
    });
    const convertedFile = new File(
      [convertedBlob],
      newValue.name.replace(/\.[^/.]+$/, ".jpg"),
      {
        type: "image/jpeg",
        lastModified: newValue.lastModified,
      },
    );
    emit("update:modelValue", convertedFile);
  } else if (newValue) {
    emit("update:modelValue", newValue);
  }
});

const onDrop = event => {
  if (props.disabled) {
    return;
  }
  file.value = event.dataTransfer.files[0];
};

const onFileChange = event => {
  if (props.disabled) {
    return;
  }
  file.value = event.target.files[0];
};

const openFilePicker = () => {
  if (props.disabled) {
    return;
  }
  fileInput.value.click();
};
</script>

<template>
  <div
    :class="[
      'relative flex min-h-[66px] items-center justify-center overflow-hidden rounded-lg border-2 border-dashed border-gray-300 bg-gray-50',
      {
        'hover:bg-gray-100': !warning,
        'border-warning-400 bg-warning-500/[.1] outline-warning-300/[.2] hover:bg-warning-600/[.1]':
          warning,
        'cursor-pointer': !showLoader,
      },
    ]"
    @drop.prevent="onDrop"
    @dragover.prevent
    @click="openFilePicker"
  >
    <div
      v-if="showLoader"
      class="absolute flex h-full w-full items-center justify-center bg-gray-50"
    >
      <LoaderDots8 />
    </div>
    <input
      ref="fileInput"
      type="file"
      :accept="acceptedTypes"
      class="hidden"
      :disabled="disabled"
      :required="required"
      :name="name"
      @change="onFileChange"
    />
    <div class="flex items-center gap-6 px-5 text-sm text-gray-600">
      <div
        class="flex h-[40px] w-[40px] items-center justify-center rounded-lg border border-gray-200 bg-base-white"
      >
        <CustomIcon name="upload-cloud-02" />
      </div>
      <div v-if="!file">
        <div class="inline font-semibold text-brand-700">
          {{ $t("components.customInputFile.placeholder.first") }}
        </div>
        {{ $t("components.customInputFile.placeholder.second") }}
      </div>
      <div v-else>Wybrano plik: {{ file.name }}</div>
    </div>
  </div>
</template>
