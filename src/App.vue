<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import TopBar from "./components/TopBar.vue";
import GameGrid from "./components/GameGrid.vue";
import { useGame } from "./composables/useGame";

const { resize } = useGame();
const mainRef = ref<HTMLElement | null>(null);

function updateDimensions() {
  if (!mainRef.value) return;
  const baseFontSize = parseFloat(
    getComputedStyle(document.documentElement).fontSize
  );
  const cellSizePx = Math.round(0.7 * baseFontSize);
  const { clientWidth, clientHeight } = mainRef.value;
  resize(
    Math.floor(clientWidth / cellSizePx),
    Math.floor(clientHeight / cellSizePx)
  );
}

let ro: ResizeObserver;

onMounted(() => {
  ro = new ResizeObserver(updateDimensions);
  if (mainRef.value) ro.observe(mainRef.value);
  updateDimensions();
});

onUnmounted(() => ro.disconnect());
</script>

<template>
  <header>
    <top-bar />
  </header>
  <main ref="mainRef">
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
  height: 100vh;
  display: flex;
  flex-direction: column;
}

#app {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
}

h2 {
  margin: 0;
}

header {
  flex-shrink: 0;
}

main {
  flex: 1;
  min-height: 0;
  overflow: hidden;
}
</style>
