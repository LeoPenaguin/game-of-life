<script setup lang="ts">
import PauseIcon from "./icons/pauseIcon.vue";
import PlayIcon from "./icons/playIcon.vue";
import ResetIcon from "./icons/resetIcon.vue";
import PresetIcon from "./icons/presetIcon.vue";
import { useGameStore } from "../stores/game";

const gameStore = useGameStore();
let timerID = 0;

const stopStartOnClick = () => {
  gameStore.setIsRunning(!gameStore.isRunning);
};
</script>

<template>
  <div id="top-bar">
    <button
      id="play"
      @click="stopStartOnClick"
      :class="{ running: gameStore.isRunning }"
      class="base-btn"
    >
      <pause-icon class="paused" />
      <play-icon class="playing" />
    </button>
    <span id="genCount">{{ gameStore.generationCount }}</span>

    <button id="reset" @click="gameStore.reset" class="base-btn">
      <reset-icon />
    </button>

    <button
      v-for="preset in gameStore.presets"
      class="base-btn preset"
      @click="gameStore.setPreset(preset)"
      :key="preset.id"
    >
      <preset-icon />
      {{ preset.name }}
    </button>
  </div>
</template>

<style lang="scss" scoped>
#top-bar {
  margin: 1rem 0;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
}

.base-btn {
  padding: 0.5rem 1rem;
  border: 2px solid;
  border-radius: 0.5rem;
  font-weight: bold;
  color: rgb(30, 255, 0);
  background: none;
  outline: none;
  cursor: pointer;
  margin-right: 0.5rem;
  display: flex;
  align-items: center;
  box-shadow: 0 0 0.5rem;
}

#top-bar #play .playing {
  stroke: rgb(30, 255, 0);
  height: 1.5rem;
  width: 1.5rem;
}

#top-bar #play .paused {
  stroke: rgb(59, 59, 59);
  height: 1.5rem;
  width: 1.5rem;
}

#top-bar #play.running {
  color: rgb(0, 153, 255);
}

#top-bar #play.running .playing {
  stroke: rgb(59, 59, 59);
  height: 1.5rem;
  width: 1.5rem;
}

#top-bar #play.running .paused {
  stroke: rgb(0, 153, 255);
  height: 1.5rem;
  width: 1.5rem;
}

#top-bar #genCount {
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-weight: bold;
  color: rgb(255, 255, 255);
  background: rgba(0, 0, 0, 0.3);
  margin-right: 1rem;
}

#top-bar #reset {
  color: rgb(255, 179, 0);
}
#top-bar #reset svg {
  stroke: rgb(255, 179, 0);
}

.preset {
  color: rgb(255, 0, 157);
}

.preset svg {
  stroke: rgb(255, 0, 157);
  margin-right: 0.5rem;
}
</style>
