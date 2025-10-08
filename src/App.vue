<script setup lang="ts">
import AppHeader from './components/AppHeader.vue';
</script>

<template>
  <AppHeader />
  <main>
    <router-view />
  </main>
</template>

<style scoped>
main {
  --char-height: 18rem;
  --line-height: 16rem;
  --line-height: 0;
  width: 100vw;
  height: calc(100dvh - 8rem);
  display: grid;
  place-items: center;
}
</style>
