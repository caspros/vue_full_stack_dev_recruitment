<script setup>
import ApplicationLogo from "@/src/features/shared/components/ApplicationLogo.vue";
import { computed, onMounted, Transition } from "vue";
import { useRoute, useRouter } from "vue-router";
import { ref, watchEffect, watch } from "vue";
import Avatar from "@/src/features/shared/components/Avatar.vue";
import CustomNav from "@/src/features/shared/components/CustomNav.vue";
import { useAuthorizationStore } from "@/src/store/authorization.js";
import ReportButton from "@/src/features/shared/components/ReportButton.vue";
import ChatWidgets from "@/src/features/shared/chat/ChatWidgets.vue";
import { usersPusherEvents } from "@/src/features/shared/composables/usersPusherEvents.js";

const route = useRoute();
const router = useRouter();
const homeRoute = ref(null);
const links = ref([]);
const authorizationStore = useAuthorizationStore();

watchEffect(() => {
  if (route.name) {
    homeRoute.value = route.matched[0];
  }
});

const storeUserData = computed(() => {
  return authorizationStore.getDataByKey({ field: "userData" });
});

const { newMessagesCount } = usersPusherEvents();

watch(
  () => storeUserData.value,
  userData => {
    newMessagesCount.value = userData
      ? userData.unread_twilio_whats_app_messages
      : 0;
  },
  {
    immediate: true,
  },
);

function isActive(routeLink) {
  return !!route.matched.find(item => item.name === routeLink.name);
}

const options = [
  {
    label: "layouts.applicationLayout.dropdown.options.accountSettings",
    route:
      storeUserData.value.current_roleable.roleable_type === "serviceAgency"
        ? "SAAccountSettings"
        : "AccountSettings",
    icon: "settings",
  },
  // {
  //   label: "layouts.applicationLayout.dropdown.options.accounting",
  //   route: "AccountSettings",
  //   icon: "monetization_on",
  // },
  {
    label: "layouts.applicationLayout.dropdown.options.logout",
    icon: "logout",
    click: async () => {
      await authorizationStore.logout();

      router.push("/login");
    },
  },
];

const layoutSticky = ref(null);
const showLayoutSticky = ref(false);
const layoutStickyTop = ref(null);
const showLayoutStickyTop = ref(false);

const cometChatUser = computed(() => {
  return useAuthorizationStore().cometChatUser;
});

onMounted(() => {
  const observerLayoutSticky = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      if (mutation.type === "childList") {
        showLayoutSticky.value = layoutSticky.value.children.length !== 0;
      }
    });
  });

  observerLayoutSticky.observe(layoutSticky.value, { childList: true });

  const observerLayoutStickyTop = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      if (mutation.type === "childList") {
        showLayoutStickyTop.value = layoutStickyTop.value.children.length !== 0;
      }
    });
  });

  observerLayoutStickyTop.observe(layoutStickyTop.value, { childList: true });
});
</script>

<template>
  <div id="web-application-layout" class="flex h-screen flex-col">
    <header class="bg-brand-500">
      <div
        class="justify-space-between container flex min-h-[96px] items-center"
      >
        <template v-if="homeRoute">
          <RouterLink :to="{ path: homeRoute.redirect }">
            <ApplicationLogo class="text-base-white" />
          </RouterLink>
          <div class="flex grow items-center justify-center">
            <template
              v-for="(routeItem, i) in homeRoute.children"
              :key="`route-${i}`"
            >
              <RouterLink
                v-if="!routeItem.meta.hide"
                :to="{ name: routeItem.name }"
                :class="[
                  'flex min-h-[48px] items-center rounded-2xl px-8 text-md font-semibold transition-colors duration-300',
                  {
                    'text-brand-100 hover:bg-brand-600 hover:text-base-white':
                      !isActive(routeItem),
                    'bg-brand-700 text-base-white': isActive(routeItem),
                  },
                ]"
              >
                {{ $t(routeItem.meta.lang) }}
                <div
                  v-if="routeItem.name === 'Messages' && newMessagesCount"
                  class="ml-4 rounded-full bg-error-500 px-3 text-xs"
                >
                  {{ newMessagesCount }}
                </div>
                <div
                  v-if="
                    routeItem.name === 'CGAChat' &&
                    cometChatUser &&
                    cometChatUser.unreadMessageCount
                  "
                  class="ml-4 rounded-full bg-error-500 px-3 text-xs"
                >
                  {{ cometChatUser.unreadMessageCount }}
                </div>
                <!--                <div-->
                <!--                  :class="[-->
                <!--                    'ml-4 text-xs font-medium min-h-[22px] flex items-center rounded-full px-3 text-brand-700',-->
                <!--                    {-->
                <!--                      'bg-base-white': isActive(route),-->
                <!--                      'bg-brand-100': !isActive(route),-->
                <!--                    },-->
                <!--                  ]"-->
                <!--                >-->
                <!--                  N/A-->
                <!--                </div>-->
              </RouterLink>
            </template>
          </div>
          <div class="flex items-center gap-12">
            <ReportButton></ReportButton>
            <!--            <NotificationBadge-->
            <!--              class="text-brand-100"-->
            <!--              icon="bell-01"-->
            <!--              :count="0"-->
            <!--              transparent-->
            <!--            />-->
            <CustomNav :options="options" chevron>
              <template #buttonOverride>
                <Avatar
                  size="lg"
                  :image-url="
                    storeUserData && storeUserData.avatar
                      ? storeUserData.avatar.aws_url
                      : null
                  "
                />
              </template>
            </CustomNav>
          </div>
        </template>
      </div>
    </header>
    <Transition name="slide-up" appear>
      <div
        v-show="showLayoutStickyTop"
        class="sticky bottom-0 z-10 bg-base-white shadow-[0_0_25px_-5px_rgba(0,0,0,0.3)]"
      >
        <div
          id="layout-sticky-top"
          ref="layoutStickyTop"
          class="container py-8"
        ></div>
      </div>
    </Transition>
    <div class="mb-16 grow">
      <RouterView v-slot="{ Component }">
        <Transition name="fade" mode="out-in" appear>
          <KeepAlive include="CaregiverLeads">
            <component :is="Component" />
          </KeepAlive>
        </Transition>
      </RouterView>
    </div>
    <Transition name="slide-up" appear>
      <div
        v-show="showLayoutSticky"
        class="sticky bottom-0 z-10 bg-base-white shadow-[0_0_25px_-5px_rgba(0,0,0,0.3)]"
      >
        <div id="layout-sticky" ref="layoutSticky" class="container py-8"></div>
      </div>
    </Transition>
    <footer
      class="relative z-20 bg-gray-700 text-sm text-gray-400 [&_a]:underline"
    >
      <div class="fixed bottom-0 right-0 z-100">
        <ChatWidgets />
      </div>
      <div class="flex items-center justify-center gap-20 px-4 py-8">
        <RouterLink :to="{ path: homeRoute.redirect }">
          <ApplicationLogo width="64" height="16.3" class="text-base-white" />
        </RouterLink>
        <div>❤️ 2024 Mamamia GmbH.</div>
        <a>Legal notice</a>
        <a>Data protection</a>
        <a>General term of use</a>
      </div>
    </footer>
  </div>
</template>

<style scoped lang="scss"></style>
