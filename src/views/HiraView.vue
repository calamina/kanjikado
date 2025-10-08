<script setup lang="ts">
import hiragana from "@/assets/content/hiragana.json"
import CardDeck from "@/components/CardDeck.vue";
</script>

<template>
  <CardDeck :symbols="hiragana" />
</template>

<style scoped></style>
