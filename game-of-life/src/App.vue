<script setup lang="ts">
import TopBar from "./components/TopBar.vue";
import GameGrid from "./components/GameGrid.vue";
import { useGameStore } from "./stores/game";

const gameStore = useGameStore();

gameStore.createMatrix();
</script>

<template>
  <header>
    <top-bar />
  </header>

  <main>
    <game-grid />
  </main>
</template>

<style lang="scss">
body {
  background: rgb(34, 34, 34);
  font-family: sans-serif;
  margin: 0;
  color: white;
  overflow: hidden;
}

h2 {
  margin: 0;
}
</style>
