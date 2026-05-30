<script setup lang="ts">
import { computed } from "vue";
import type { Cell } from "@/types";
import type { StyleValue } from "vue";
import { useGame } from "../composables/useGame";

const { state } = useGame();

const gridStyle = computed<StyleValue>(() => ({
  gridTemplateColumns: `repeat(${state.width}, 1fr)`,
  gridTemplateRows: `repeat(${state.height}, 1fr)`,
}));

const clickedCell = (cell: Cell) => {
  cell.living = !cell.living;
  cell.hasLived = true;
};
</script>

<template>
  <div id="grid" :style="gridStyle">
    <template v-for="(line, index) in state.matrix" :key="index">
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
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}

.square {
  background: rgba(255, 255, 255, 0.07);
  border: 1px solid rgba(0, 0, 0, 0.4);
  box-sizing: border-box;
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
