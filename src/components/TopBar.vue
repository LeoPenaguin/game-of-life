<script setup lang="ts">
import PauseIcon from "./icons/pauseIcon.vue";
import PlayIcon from "./icons/playIcon.vue";
import ResetIcon from "./icons/resetIcon.vue";
import PresetIcon from "./icons/presetIcon.vue";
import { useGame } from "../composables/useGame";

const { state, setIsRunning, reset, setPreset } = useGame();

const stopStartOnClick = () => {
  setIsRunning(!state.isRunning);
};
</script>

<template>
  <div id="top-bar">
    <button
      id="play"
      @click="stopStartOnClick"
      :class="{ running: state.isRunning }"
      class="base-btn"
    >
      <pause-icon v-if="state.isRunning" class="paused" />
      <play-icon v-else class="playing" />
    </button>
    <span id="genCount">{{ state.generationCount }}</span>

    <button id="reset" @click="reset" class="base-btn">
      <reset-icon />
    </button>

    <button
      v-for="preset in state.presets"
      class="base-btn preset"
      @click="setPreset(preset)"
      :key="preset.id"
    >
      <preset-icon />
      {{ preset.name }}
    </button>
  </div>
</template>

<style lang="scss" scoped>
#top-bar {
  padding: 0.5rem;
  display: flex;
  align-items: center;
  background: rgb(255, 255, 255);
}

.base-btn {
  padding: 0.5rem 1rem;
  border: 0.3rem solid;
  border-radius: 0.5rem;
  box-shadow: 0px 0.5rem 0;
  font-weight: bold;
  color: rgb(30, 255, 0);
  background: none;
  outline: none;
  cursor: pointer;
  margin: 0 0.5rem 0.5rem 0;
  display: flex;
  align-items: center;
  background: white;
  &:hover {
    box-shadow: 0px 0.3rem 0px;
    margin-bottom: 0.3rem;
    margin-top: 0.2rem;
  }
  &:active {
    box-shadow: 0px 0px 0px;
    margin-bottom: 0;
    margin-top: 0.5rem;
  }
}

#top-bar #play {
  color: red;
  .paused,
  .playing {
    stroke: currentcolor;
    height: 1.5rem;
    width: 1.5rem;
  }
}

#top-bar #genCount {
  font-weight: bold;
  color: red;
  margin-right: 1rem;
  font-size: 2rem;
  width: 4rem;
}

#top-bar #reset {
  color: rgb(255, 179, 0);
  svg {
    stroke: currentcolor;
  }
}

.preset {
  color: rgb(255, 0, 157);
  svg {
    stroke: currentcolor;
    margin-right: 0.5rem;
  }
}
</style>
