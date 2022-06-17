<script setup lang="ts">
import type { Cell } from "@/typings/game";
import type { StyleValue } from "vue";
import { useGameStore } from "../stores/game";

const gameStore = useGameStore();

const style: StyleValue = {
  gridTemplateColumns: "repeat(" + gameStore.width + ", 1fr)",
  "grid-template-rows": "repeat(" + gameStore.height + ", 1fr)",
};

const clickedCell = (cell: Cell) => {
  cell.living = !cell.living;
  cell.hasLived = true;
};
</script>

<template>
  <div id="grid" :style="style">
    <template v-for="(line, index) in gameStore.matrix" :key="index">
      <div
        v-for="(cell, index2) in line"
        :key="index2"
        class="square"
        :class="{ living: cell.living, hasLived: cell.hasLived }"
        @click="clickedCell(cell)"
      ></div>
    </template>
  </div>
</template>

<style lang="scss" scoped>
#grid {
  display: grid;
  width: fit-content;
  height: fit-content;
  border: 1px solid rgba(0, 0, 0, 0.4);
}

.square {
  background: rgba(255, 255, 255, 0.07);
  width: 0.7rem;
  height: 0.7rem;
  border: 1px solid rgba(0, 0, 0, 0.4);
}

.square.hasLived {
  background: rgba(0, 0, 0, 0.07);
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.07);
}

.square.living {
  background: rgb(0, 174, 255);
  box-shadow: 0 0 0.5rem rgb(0, 174, 255);
}
</style>
