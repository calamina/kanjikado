<script setup lang="ts">
import katakana from "@/assets/content/katakana.json"
import CardDeck from "@/components/CardDeck.vue";
</script>

<template>
  <CardDeck :symbols="katakana" />
</template>

<style scoped></style>
