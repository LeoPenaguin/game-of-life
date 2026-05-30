export interface Preset {
  id: number;
  name: string;
}

export interface Cell {
  living: boolean;
  hasLived?: boolean;
}
