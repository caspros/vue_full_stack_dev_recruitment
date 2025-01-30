<script setup>
import { ref, defineProps, watch, nextTick } from "vue";

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  shine: {
    type: String,
    default: null,
  },
  radar: {
    type: String,
    default: null,
  },
  width: {
    type: [Number, String],
    default: 20,
  },
  height: {
    type: [Number, String],
    default: 20,
  },
});

const icon = ref(null);
const iconComponent = ref(null);

function setIconAttributes() {
  if (!icon.value) {
    return;
  }
  const svg = icon.value.$el;
  if (props.width) {
    svg.setAttribute("width", props.width);
  } else if (props.height) {
    svg.removeAttribute("width");
  }
  if (props.height) {
    svg.setAttribute("height", props.height);
  } else if (props.width) {
    svg.removeAttribute("height");
  }
}

watch(
  () => props.name,
  async () => {
    iconComponent.value = await import(`../icons/${props.name}.vue`);
    nextTick(() => {
      setIconAttributes();
    });
  },
  {
    immediate: true,
  },
);
</script>

<template>
  <div
    :class="[
      `flex items-center justify-center`,
      {
        'relative': shine || radar,
      },
    ]"
  >
    <component
      :is="iconComponent.default"
      v-if="iconComponent"
      ref="icon"
      :class="[
        `${shine ? `text-${shine}-500` : ''} ${
          radar ? `text-${radar}-500` : ''
        }`,
        {
          'relative z-20 m-6': shine || radar,
        },
      ]"
    />
    <div
      v-else
      :class="[
        `w-[${width}px] h-[${height}px]`,
        {
          'relative z-20 m-6': shine || radar,
        },
      ]"
    ></div>
    <template v-if="shine">
      <div
        :class="`absolute min-h-[30px] min-w-[30px] bg-${shine}-200 left-[50%] top-[50%] z-10 -translate-x-2/4 -translate-y-2/4 rounded-full`"
      ></div>
      <div
        :class="`absolute min-h-[45px] min-w-[45px] bg-${shine}-100 left-[50%] top-[50%] -translate-x-2/4 -translate-y-2/4 rounded-full`"
      ></div>
    </template>
    <template v-if="radar">
      <div
        :class="`absolute min-h-[30px] min-w-[30px] border-2 border-solid border-${radar}-500 left-[50%] top-[50%] z-10 -translate-x-2/4 -translate-y-2/4 rounded-full opacity-50`"
      ></div>
      <div
        :class="`absolute min-h-[45px] min-w-[45px] border-2 border-solid border-${radar}-500 left-[50%] top-[50%] -translate-x-2/4 -translate-y-2/4 rounded-full opacity-20`"
      ></div>
    </template>
  </div>
</template>
