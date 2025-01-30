<script setup></script>

<template>
  <div class="loader"></div>
</template>

<style scoped lang="scss">
.loader {
  width: 50px;
  height: 28px;
  --_g: no-repeat radial-gradient(farthest-side, #641a53, 94%, #0000);
  background:
    var(--_g) 50% 0,
    var(--_g) 100% 0;
  background-size: 12px 12px;
  position: relative;
  animation: l23-0 1.5s linear infinite;
}
.loader:before {
  @apply bg-brand-500;
  content: "";
  position: absolute;
  height: 12px;
  aspect-ratio: 1;
  border-radius: 50%;
  left: 0;
  top: 0;
  animation:
    l23-1 1.5s linear infinite,
    l23-2 0.5s cubic-bezier(0, 200, 0.8, 200) infinite;
}
@keyframes l23-0 {
  0%,
  31% {
    background-position:
      50% 0,
      100% 0;
  }
  33% {
    background-position:
      50% 100%,
      100% 0;
  }
  43%,
  64% {
    background-position:
      50% 0,
      100% 0;
  }
  66% {
    background-position:
      50% 0,
      100% 100%;
  }
  79% {
    background-position:
      50% 0,
      100% 0;
  }
  100% {
    transform: translateX(calc(-100% / 3));
  }
}
@keyframes l23-1 {
  100% {
    left: calc(100% + 7px);
  }
}
@keyframes l23-2 {
  100% {
    top: -0.1px;
  }
}
</style>
