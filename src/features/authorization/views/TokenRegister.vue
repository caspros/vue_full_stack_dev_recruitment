<script setup>
import { useRoute, useRouter } from "vue-router";
import { onMounted } from "vue";
import { useAuthorizationStore } from "@/src/store/authorization.js";

const authorizationStore = useAuthorizationStore();

const route = useRoute();
const router = useRouter();

onMounted(async () => {
  const token = decodeURIComponent(route.params.token);
  // localStorage.setItem("token", token);
  await authorizationStore.fetchUserData();

  router.push({ name: "CaregiverAgency" });
});
</script>

<template>
  <div
    id="spinner-container"
    style="
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      display: flex;
      justify-content: center;
      align-items: center;
    "
  >
    <div
      class="spinner"
      style="
        width: 4em;
        height: 4em;
        border: 7px solid rgba(0, 0, 0, 0.1);
        border-top-color: #a0398a;
        border-radius: 50%;
        animation: spin 1s linear infinite;
      "
    ></div>
  </div>
</template>
