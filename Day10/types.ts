export interface Asteroid {
  x: number;
  y: number;
  isAsteroid?: boolean;
  angle?: number;
  distance?: number;
  destroyed?: boolean;
  order?: number;
  origX?: number;
  origY?: number;
}

export interface CustomCoordinates {
  x: number;
  y: number;
}
