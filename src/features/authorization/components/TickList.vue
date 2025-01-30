<script setup>
import CustomIcon from "@/src/features/shared/components/CustomIcon.vue";

defineProps({
  items: {
    type: Array,
    default: () => [],
  },
  description: {
    type: String,
    default: "",
  },
});
</script>

<template>
  <div>
    <div v-if="description" class="mb-15 text-lg font-normal text-gray-600">
      {{ $t(description) }}
    </div>

    <ul class="space-y-10 text-gray-600">
      <li
        v-for="(item, i) in items"
        :key="`item-${i}`"
        class="flex items-center gap-10"
      >
        <CustomIcon
          name="tick"
          width="24"
          height="25"
          class="relative h-[34px] min-w-[34px] rounded-full border-2 border-success-200 text-success-400 after:absolute after:inset-1/2 after:aspect-square after:w-[48px] after:-translate-x-2/4 after:-translate-y-2/4 after:rounded-full after:border-2 after:border-success-100 after:content-['']"
        />

        <div>
          <div class="text-sm font-bold">{{ $t(item.title) }}</div>
          <div class="text-xs font-medium">
            {{ $t(item.description) }}
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
