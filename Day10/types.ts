export interface Asteroid {
  x: number;
  y: number;
}

export interface Destroyable {
  origX?: number; // Original X co-ordinate before translation relative to station
  origY?: number; // Original Y co-ordinate before translation relative to station
  angle?: number; // Angle of asteroid from station
  distance?: number; // Distance of asteroid from station
  destroyed?: boolean;
  order?: number; // Order in which asteroid was destroyed
}

export type DestroyableAsteroid = Asteroid & Destroyable;

export interface CustomCoordinates {
  x: number;
  y: number;
}
