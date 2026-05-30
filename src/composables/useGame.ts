import { reactive } from "vue";
import type { Cell } from "@/types";
import type { Preset } from "@/types";

const GRID_WIDTH = 100;
const GRID_HEIGHT = 50;
const DEFAULT_SPEED = 100;

const state = reactive({
  width: GRID_WIDTH,
  height: GRID_HEIGHT,
  speed: DEFAULT_SPEED,
  matrix: [] as Cell[][],
  generationCount: 0,
  isRunning: false,
  presets: [
    { id: 1, name: "preset 1" },
    { id: 2, name: "preset 2" },
    { id: 3, name: "preset 3" },
    { id: 4, name: "preset 4" },
  ] as Preset[],
});

let timerID: ReturnType<typeof setInterval> | null = null;

function createMatrix() {
  state.matrix = Array.from({ length: state.height }, () =>
    Array.from({ length: state.width }, () => ({ living: false })),
  );
}

function getAliveAroundCount(i: number, j: number): number {
  let count = 0;
  for (let di = -1; di <= 1; di++) {
    for (let dj = -1; dj <= 1; dj++) {
      if (di === 0 && dj === 0) continue;
      const ni = i + di;
      const nj = j + dj;
      if (ni >= 0 && ni < state.height && nj >= 0 && nj < state.width) {
        if (state.matrix[ni][nj].living) count++;
      }
    }
  }
  return count;
}

function calculateGeneration(): void {
  state.matrix = state.matrix.map((row, i) =>
    row.map((cell: Cell, j) => {
      const n = getAliveAroundCount(i, j);
      const willLive = cell.living ? n === 2 || n === 3 : n === 3;
      return {
        living: willLive,
        hasLived: cell.hasLived || cell.living,
      };
    }),
  );
}

function startTimer(): void {
  timerID = setInterval(() => {
    state.generationCount++;
    calculateGeneration();
  }, state.speed);
}

function stopTimer(): void {
  if (timerID !== null) {
    clearInterval(timerID);
    timerID = null;
  }
}

function setIsRunning(isRunning: boolean): void {
  state.isRunning = isRunning;
  if (isRunning) {
    startTimer();
  } else {
    stopTimer();
  }
}

function reset(): void {
  createMatrix();
  state.generationCount = 0;
  setIsRunning(false);
}

function setPreset(preset: Preset): void {
  reset();

  const fromTop = Math.floor(state.height / 4);
  const fromLeft = Math.floor(state.width / 4);

  if (preset.id === 1) {
    const positions = [
      { col: fromTop, row: fromLeft },
      { col: fromTop, row: fromLeft + 1 },
      { col: fromTop, row: fromLeft + 2 },
      { col: fromTop + 1, row: fromLeft + 2 },
      { col: fromTop + 2, row: fromLeft + 1 },

      { col: fromTop, row: fromLeft + 5 },
      { col: fromTop, row: fromLeft + 1 + 5 },
      { col: fromTop, row: fromLeft + 2 + 5 },
      { col: fromTop + 1, row: fromLeft + 2 + 5 },
      { col: fromTop + 2, row: fromLeft + 1 + 5 },

      { col: fromTop + 5, row: fromLeft },
      { col: fromTop + 5, row: fromLeft + 1 },
      { col: fromTop + 5, row: fromLeft + 2 },
      { col: fromTop + 1 + 5, row: fromLeft + 2 },
      { col: fromTop + 2 + 5, row: fromLeft + 1 },

      { col: fromTop + 5, row: fromLeft + 5 },
      { col: fromTop + 5, row: fromLeft + 1 + 5 },
      { col: fromTop + 5, row: fromLeft + 2 + 5 },
      { col: fromTop + 1 + 5, row: fromLeft + 2 + 5 },
      { col: fromTop + 2 + 5, row: fromLeft + 1 + 5 },

      { col: fromTop, row: fromLeft - 5 },
      { col: fromTop, row: fromLeft - 1 - 5 },
      { col: fromTop, row: fromLeft - 2 - 5 },
      { col: fromTop - 1, row: fromLeft - 2 - 5 },
      { col: fromTop - 2, row: fromLeft - 1 - 5 },

      { col: fromTop, row: fromLeft - 5 - 5 },
      { col: fromTop, row: fromLeft - 1 - 5 - 5 },
      { col: fromTop, row: fromLeft - 2 - 5 - 5 },
      { col: fromTop - 1, row: fromLeft - 2 - 5 - 5 },
      { col: fromTop - 2, row: fromLeft - 1 - 5 - 5 },

      { col: fromTop + 5, row: fromLeft - 5 },
      { col: fromTop + 5, row: fromLeft - 1 - 5 },
      { col: fromTop + 5, row: fromLeft - 2 - 5 },
      { col: fromTop - 1 + 5, row: fromLeft - 2 - 5 },
      { col: fromTop - 2 + 5, row: fromLeft - 1 - 5 },

      { col: fromTop + 5, row: fromLeft - 5 - 5 },
      { col: fromTop + 5, row: fromLeft - 1 - 5 - 5 },
      { col: fromTop + 5, row: fromLeft - 2 - 5 - 5 },
      { col: fromTop - 1 + 5, row: fromLeft - 2 - 5 - 5 },
      { col: fromTop - 2 + 5, row: fromLeft - 1 - 5 - 5 },
    ];
    positions.forEach(({ col, row }) => {
      state.matrix[col][row].living = true;
    });
  }

  if (preset.id === 2) {
    const positions = [
      { col: fromTop, row: fromLeft },
      { col: fromTop, row: fromLeft + 1 },
      { col: fromTop + 1, row: fromLeft + 1 },
      { col: fromTop + 1, row: fromLeft },

      { col: fromTop, row: fromLeft + 10 },
      { col: fromTop + 1, row: fromLeft + 10 },
      { col: fromTop + 2, row: fromLeft + 10 },

      { col: fromTop - 1, row: fromLeft + 11 },
      { col: fromTop + 3, row: fromLeft + 11 },

      { col: fromTop - 2, row: fromLeft + 12 },
      { col: fromTop + 4, row: fromLeft + 12 },
      { col: fromTop - 2, row: fromLeft + 13 },
      { col: fromTop + 4, row: fromLeft + 13 },

      { col: fromTop + 1, row: fromLeft + 14 },

      { col: fromTop - 1, row: fromLeft + 15 },
      { col: fromTop + 3, row: fromLeft + 15 },

      { col: fromTop, row: fromLeft + 16 },
      { col: fromTop + 1, row: fromLeft + 16 },
      { col: fromTop + 2, row: fromLeft + 16 },

      { col: fromTop + 1, row: fromLeft + 17 },

      { col: fromTop - 2, row: fromLeft + 20 },
      { col: fromTop - 1, row: fromLeft + 20 },
      { col: fromTop, row: fromLeft + 20 },

      { col: fromTop - 2, row: fromLeft + 21 },
      { col: fromTop - 1, row: fromLeft + 21 },
      { col: fromTop, row: fromLeft + 21 },

      { col: fromTop - 3, row: fromLeft + 22 },
      { col: fromTop + 1, row: fromLeft + 22 },

      { col: fromTop - 4, row: fromLeft + 24 },
      { col: fromTop - 3, row: fromLeft + 24 },
      { col: fromTop + 1, row: fromLeft + 24 },
      { col: fromTop + 2, row: fromLeft + 24 },

      { col: fromTop - 2, row: fromLeft + 34 },
      { col: fromTop - 2, row: fromLeft + 35 },
      { col: fromTop - 1, row: fromLeft + 34 },
      { col: fromTop - 1, row: fromLeft + 35 },
    ];
    positions.forEach(({ col, row }) => {
      state.matrix[col][row].living = true;
    });
  }

  if (preset.id === 3) {
    const positions = [
      { col: fromTop - 1, row: fromLeft },
      { col: fromTop + 1, row: fromLeft },

      { col: fromTop, row: fromLeft + 2 },

      { col: fromTop - 1, row: fromLeft + 3 },
      { col: fromTop + 1, row: fromLeft + 3 },

      { col: fromTop - 2, row: fromLeft + 4 },
      { col: fromTop, row: fromLeft + 4 },
      { col: fromTop + 2, row: fromLeft + 4 },

      { col: fromTop - 2, row: fromLeft + 5 },
      { col: fromTop - 1, row: fromLeft + 5 },
      { col: fromTop + 1, row: fromLeft + 5 },

      { col: fromTop - 2, row: fromLeft + 6 },
      { col: fromTop - 1, row: fromLeft + 6 },
      { col: fromTop + 1, row: fromLeft + 6 },

      { col: fromTop - 2, row: fromLeft + 7 },
      { col: fromTop, row: fromLeft + 7 },
      { col: fromTop + 2, row: fromLeft + 7 },

      { col: fromTop - 1, row: fromLeft + 8 },
      { col: fromTop + 1, row: fromLeft + 8 },

      { col: fromTop, row: fromLeft + 9 },

      { col: fromTop - 1, row: fromLeft + 11 },
      { col: fromTop + 1, row: fromLeft + 11 },
    ];
    positions.forEach(({ col, row }) => {
      state.matrix[col][row].hasLived = true;
      state.matrix[col][row].living = true;
    });
  }

  if (preset.id === 4) {
    for (let i = 0; i < state.matrix.length; i++) {
      for (let j = 0; j < state.matrix[i].length; j++) {
        if (Math.floor(Math.random() * 9) === 1) {
          state.matrix[i][j].hasLived = true;
          state.matrix[i][j].living = true;
        }
      }
    }
  }
}

function resize(newWidth: number, newHeight: number): void {
  setIsRunning(false);
  state.width = newWidth;
  state.height = newHeight;
  createMatrix();
}

export function useGame() {
  return { state, createMatrix, setPreset, reset, setIsRunning, resize };
}
