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

function getAliveAroundCount(row: number, col: number): number {
  let count = 0;
  for (let rowOffset = -1; rowOffset <= 1; rowOffset++) {
    for (let colOffset = -1; colOffset <= 1; colOffset++) {
      if (rowOffset === 0 && colOffset === 0) continue;
      const neighborRow = row + rowOffset;
      const neighborCol = col + colOffset;
      if (
        neighborRow >= 0 &&
        neighborRow < state.height &&
        neighborCol >= 0 &&
        neighborCol < state.width
      ) {
        if (state.matrix[neighborRow][neighborCol].living) count++;
      }
    }
  }
  return count;
}

function calculateGeneration(): void {
  state.matrix = state.matrix.map((rowCells, row) =>
    rowCells.map((cell: Cell, col) => {
      const n = getAliveAroundCount(row, col);
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

// Places a pattern string on the grid. '#' = alive cell, anything else = skip.
// startRow/startCol define the top-left corner of the pattern bounding box.
function placePattern(
  pattern: string,
  startRow: number,
  startCol: number,
  markHasLived = false,
): void {
  pattern
    .trim()
    .split("\n")
    .forEach((line, rowOffset) => {
      [...line].forEach((char, colOffset) => {
        if (char !== "#") return;
        const row = startRow + rowOffset;
        const col = startCol + colOffset;
        if (row >= 0 && row < state.height && col >= 0 && col < state.width) {
          state.matrix[row][col].living = true;
          if (markHasLived) state.matrix[row][col].hasLived = true;
        }
      });
    });
}

function setPreset(preset: Preset): void {
  reset();

  const centerRow = Math.floor(state.height / 4);
  const centerCol = Math.floor(state.width / 4);

  if (preset.id === 1) {
    // Two mirror shapes placed in a 2x2 arrangement around the center
    const shapeA = `
###
..#
.#.`.trim();

    const shapeB = `
.#.
#..
###`.trim();

    placePattern(shapeA, centerRow,     centerCol     );
    placePattern(shapeA, centerRow,     centerCol + 5 );
    placePattern(shapeA, centerRow + 5, centerCol     );
    placePattern(shapeA, centerRow + 5, centerCol + 5 );
    placePattern(shapeB, centerRow - 2, centerCol - 7 );
    placePattern(shapeB, centerRow - 2, centerCol - 12);
    placePattern(shapeB, centerRow + 3, centerCol - 7 );
    placePattern(shapeB, centerRow + 3, centerCol - 12);
  }

  if (preset.id === 2) {
    // Gosper Glider Gun — period-30 gun that emits a glider every 30 generations
    placePattern(
      `
........................#...........
......................#.#...........
............##......##............##
...........#...#....##............##
##........#.....#...##..............
##........#...#.##....#.#...........
..........#.....#.......#...........
...........#...#....................
............##......................`.trim(),
      centerRow - 4,
      centerCol,
    );
  }

  if (preset.id === 3) {
    // Vertically symmetric pattern
    placePattern(
      `
....####....
#..#.##.#..#
..#.#..#.#..
#..#.##.#..#
....#..#....`.trim(),
      centerRow - 2,
      centerCol,
      true,
    );
  }

  if (preset.id === 4) {
    for (let row = 0; row < state.matrix.length; row++) {
      for (let col = 0; col < state.matrix[row].length; col++) {
        if (Math.floor(Math.random() * 9) === 1) {
          state.matrix[row][col].hasLived = true;
          state.matrix[row][col].living = true;
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
