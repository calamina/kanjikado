<script setup lang="ts"></script>

<template>
  <nav>
    <RouterLink to="/">katakana</RouterLink>
    <RouterLink to="/hiragana">hiragana</RouterLink>
    <!-- <RouterLink to="/kanji">kanji</RouterLink> -->
  </nav>
</template>

<style scoped>
nav {
  display: grid;
  /* grid-template-columns: repeat(3, 1fr); */
  grid-template-columns: repeat(2, 1fr);
  place-items: center;
  gap: 0.5rem;
  height: 4rem;
  width: 100%;
  padding: 0.5rem;
}

a {
  display: grid;
  place-content: center;
  border-radius: 0.75rem;
  height: 100%;
  width: 100%;
  font-size: var(--type-1);
  font-weight: 500;
  text-transform: capitalize;
  text-decoration: none;
  color: var(--text-color-dim);
  transition: padding 0.2s, background-color 0.2s, color 0.2s;
  background-color: var(--bg-color-dim);

  &:hover,
  &.router-link-active {
    background-color: var(--bg-color-secondary);
    color: var(--highlight-color);
  }
}
</style>