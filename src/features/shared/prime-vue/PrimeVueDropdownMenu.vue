<template>
  <div class="card justify-content-center flex">
    <div class="cursor-pointer" @click="toggle">
      <slot name="button"> </slot>
    </div>

    <Menu
      ref="menu"
      id="overlay_menu"
      class="!mt-3 px-3 py-2 [&__.p-menuitem-content]:!bg-white"
      :class="{ '[&_.p-submenu-header]:hidden': isSubheaderHidden }"
      :model="menuModel"
      :popup="true"
    >
      <template v-if="!isSubheaderHidden" #submenuheader="{ item: { label } }">
        <span class="text-sm text-gray-600">
          {{ label }}
        </span>
      </template>

      <template #item="{ item }">
        <slot name="item" :item="item"> </slot>
      </template>
    </Menu>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Menu from "primevue/menu";

defineProps({
  isSubheaderHidden: {
    type: Boolean,
  },
  menuModel: {
    type: Array,
  },
});

const menu = ref();

const toggle = event => {
  menu.value.toggle(event);
};
</script>
