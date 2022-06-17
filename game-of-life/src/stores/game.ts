import type { Cell } from "@/typings/game";
import type { Preset } from "@/typings/preset";
import { defineStore } from "pinia";

export const useGameStore = defineStore({
  id: "counter",
  state: () => ({
    width: 50,
    height: 50,
    matrix: [] as Cell[][],
    generationCount: 0,
    isRunning: false,
    timerID: {} as NodeJS.Timer,
    presets: [
      { id: 1, name: "preset 1" },
      { id: 2, name: "preset 2" },
      { id: 3, name: "preset 3" },
      { id: 4, name: "preset 4" },
    ] as Preset[],
  }),
  actions: {
    createMatrix() {
      this.matrix = new Array(this.height);

      for (let i = 0; i < this.matrix.length; i++) {
        this.matrix[i] = new Array(this.width);
      }

      for (let i = 0; i < this.matrix.length; i++) {
        const line = this.matrix[i];
        for (let j = 0; j < line.length; j++) {
          this.matrix[i][j] = { living: false };
        }
      }
    },
    setPreset(preset: Preset) {
      this.reset();
      this.setIsRunning(false);

      const fromTop = Math.floor(this.height / 4);
      const fromLeft = Math.floor(this.width / 4);

      if (preset.id == 1) {
        const positions = [];

        positions.push(
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
          { col: fromTop - 2 + 5, row: fromLeft - 1 - 5 - 5 }
        );

        positions.forEach((pos) => {
          const cell = this.matrix[pos.col][pos.row];
          cell.living = true;
        });
      }

      if (preset.id == 2) {
        const positions = [];

        positions.push(
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
          { col: fromTop - 1, row: fromLeft + 35 }
        );

        positions.forEach((pos) => {
          const cell = this.matrix[pos.col][pos.row];
          cell.living = true;
        });
      }

      if (preset.id == 3) {
        const positions = [];

        positions.push(
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
          { col: fromTop + 1, row: fromLeft + 11 }
        );

        positions.forEach((pos) => {
          const cell = this.matrix[pos.col][pos.row];
          cell.hasLived = true;
          cell.living = true;
        });
      }

      if (preset.id == 4) {
        for (let i = 0; i < this.matrix.length; i++) {
          const line = this.matrix[i];
          for (let j = 0; j < line.length; j++) {
            if (Math.floor(Math.random() * 9) == 1) {
              const cell = this.matrix[i][j];
              cell.hasLived = true;
              cell.living = true;
            }
          }
        }
      }
    },
    reset() {
      this.createMatrix();
      this.generationCount = 0;
      this.setIsRunning(false);
    },
    calculateGeneration(): void {
      const changingCells = [] as {
        col: number;
        row: number;
        alive: boolean;
      }[];

      for (let i = 0; i < this.matrix.length; i++) {
        const line = this.matrix[i];
        for (let j = 0; j < line.length; j++) {
          const cell: Cell = this.matrix[i][j];
          const livingNeighboursCount = this.getAliveAroundCount(i, j);

          if (!cell.living && livingNeighboursCount === 3) {
            changingCells.push({ col: i, row: j, alive: true });
          } else if (cell.living && livingNeighboursCount <= 1) {
            changingCells.push({ col: i, row: j, alive: false });
          } else if (cell.living && livingNeighboursCount >= 4) {
            changingCells.push({ col: i, row: j, alive: false });
          } else if (
            cell.living &&
            (livingNeighboursCount === 2 || livingNeighboursCount === 3)
          ) {
            changingCells.push({ col: i, row: j, alive: true });
          }
        }
      }

      changingCells.forEach((changingCell) => {
        const cell = this.matrix[changingCell.col][changingCell.row];

        if (cell.living) {
          cell.living = changingCell.alive;
          cell.hasLived = true;
        } else {
          cell.living = changingCell.alive;
        }
      });
    },
    getAliveAroundCount(i: number, j: number): number {
      const around = [] as Cell[];

      if (this.matrix[i - 1] !== undefined) {
        around.push(this.matrix[i - 1][j - 1]);
        around.push(this.matrix[i - 1][j]);
        around.push(this.matrix[i - 1][j + 1]);
      }

      around.push(this.matrix[i][j - 1]);
      around.push(this.matrix[i][j + 1]);

      if (this.matrix[i + 1] !== undefined) {
        around.push(this.matrix[i + 1][j - 1]);
        around.push(this.matrix[i + 1][j]);
        around.push(this.matrix[i + 1][j + 1]);
      }

      let aliveNeighboursCount = 0;

      around.forEach((element) => {
        if (element && element.living === true) {
          aliveNeighboursCount++;
        }
      });

      return aliveNeighboursCount;
    },
    setIsRunning(isRunning: boolean) {
      this.isRunning = isRunning;

      if (isRunning) {
        this.startTimer();
      } else {
        this.stopTimer();
      }
    },
    startTimer(): void {
      this.timerID = setInterval(() => {
        if (this.timerID) {
          clearInterval(this.timerID);
        }
        this.generationCount += 1;
        this.calculateGeneration();
        this.startTimer();
      }, 100);
    },
    stopTimer(): void {
      clearTimeout(this.timerID);
    },
  },
});
