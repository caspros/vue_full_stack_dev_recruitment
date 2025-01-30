<script setup>
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";
import CustomBadge from "@/src/features/shared/components/CustomBadge.vue";
import CustomIcon from "@/src/features/shared/components/CustomIcon.vue";
import CustomButton from "@/src/features/shared/components/CustomButton.vue";
import { useRouter } from "vue-router";

const emit = defineEmits(["update:modelValue"]);
const router = useRouter();
const props = defineProps({
  disabled: Boolean,
  theme: {
    type: String,
    default: "default",
    validator: value => ["brand", "default"].includes(value),
  },
  options: {
    type: Array,
    default: () => [],
  },
  chevron: {
    type: Boolean,
    default: false,
  },
});

function handleClick(option) {
  if (option.click) {
    option.click();
  } else if (option.route) {
    router.push({ name: option.route });
  } else {
    emit("update:modelValue", option.value);
  }
}
</script>

<template>
  <div class="relative">
    <Menu v-slot="{ open }">
      <MenuButton class="flex cursor-pointer items-center">
        <slot name="buttonOverride">
          <CustomButton
            size="lg"
            :variant="theme === 'brand' ? 'primary' : 'secondary-gray'"
          >
            <slot></slot>
            <CustomIcon
              v-if="options.length > 0"
              name="chevron-down"
              :class="[
                'ml-4 duration-100 ease-in-out',
                {
                  'rotate-180': open,
                },
              ]"
            />
            <CustomBadge v-if="$slots.badge" class="ml-2">
              <slot name="badge"></slot>
            </CustomBadge>
          </CustomButton>
          <!--          <div-->
          <!--            :class="[-->
          <!--              'rounded-full min-h-[48px] pl-8 text-sm font-semibold flex items-center',-->
          <!--              {-->
          <!--                'text-brand-100 bg-brand-500': theme === 'brand',-->
          <!--                'bg-base-white border border-gray-200': theme === 'default',-->
          <!--                'pr-8': options.length > 0,-->
          <!--                'pr-6': options.length === 0,-->
          <!--              },-->
          <!--            ]"-->
          <!--          >-->
          <!--            <slot></slot>-->
          <!--            <CustomIcon-->
          <!--              v-if="options.length > 0"-->
          <!--              name="chevron-down"-->
          <!--              :class="[-->
          <!--                'ml-4 ease-in-out duration-100',-->
          <!--                {-->
          <!--                  'rotate-180': open,-->
          <!--                },-->
          <!--              ]"-->
          <!--            />-->
          <!--            <CustomBadge v-if="$slots.badge" class="ml-2">-->
          <!--              <slot name="badge"></slot>-->
          <!--            </CustomBadge>-->
          <!--          </div>-->
        </slot>
        <CustomIcon
          v-if="chevron"
          :class="[
            'ml-4 text-base-white duration-300 ease-in-out',
            {
              'rotate-180': open,
            },
          ]"
          name="chevron-down"
        />
      </MenuButton>
      <Transition
        v-if="options.length > 0"
        :name="false ? `transition-nav` : ''"
      >
        <MenuItems
          class="absolute right-0 top-full z-50 mt-2 flex min-w-[208px] flex-col rounded-xl border border-gray-200 bg-base-white px-2 py-6 shadow"
        >
          <MenuItem
            v-for="(option, i) in options"
            :key="`option-${i}`"
            v-slot="{ active }"
            @click="handleClick(option)"
          >
            <div>
              <div
                v-if="option.show !== false"
                :class="[
                  'flex min-h-[38px] cursor-pointer items-center whitespace-nowrap rounded-lg px-8 py-5 text-sm font-medium',
                  { 'bg-gray-100': active },
                  { 'text-error-400': option.error },
                  { 'text-gray-700': !option.error },
                ]"
              >
                <CustomIcon
                  v-if="option.icon"
                  :name="option.icon"
                  class="mr-2"
                  width="24"
                  height="24"
                />
                {{ $t(option.label) }}
              </div>
            </div>
          </MenuItem>
        </MenuItems>
      </Transition>
    </Menu>
  </div>
</template>

<style lang="scss">
.transition-nav-enter-active,
.transition-nav-leave-active {
  transition: all 150ms ease-out;
}

.transition-nav-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.transition-nav-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>
