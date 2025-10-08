<script setup lang="ts"></script>

<template>
  <header>
    <nav>
      <RouterLink to="/katakana">katakana</RouterLink>
      <RouterLink to="/hiragana">hiragana</RouterLink>
      <RouterLink to="/kanji">kanji</RouterLink>
    </nav>
  </header>
</template>

<style scoped>
header {
  height: 4rem;
  width: 100vw;
  display: grid;
  place-items: center;
}

nav {
  display: flex;
  align-items: center;
  gap: 2rem;
  height: 4rem;
}

a {
  display: flex;
  align-items: center;
  border-radius: 2rem;
  height: 4rem;
  font-size: 1.75rem;
  font-weight: 500;
  text-transform: capitalize;
  text-decoration: none;
  color: var(--text-color-dim);
  transition: padding 0.2s, background-color 0.2s, color 0.2s;

  &:hover,
  &.router-link-active {
    color: var(--highlight-color);
    text-decoration: underline;
    text-decoration-thickness: 4px;
    text-underline-offset: 6px;
    /* background-color: var(--bg-color-secondary); */
  }
}
</style>