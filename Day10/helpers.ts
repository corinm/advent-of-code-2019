import { Asteroid, DestroyableAsteroid, CustomCoordinates } from "./types";

export const parseMap = (rawMap: string): number[][] =>
  rawMap
    .split("\n")
    .map((row: string): string => row.trim())
    .map((row: string): number[] =>
      row.split("").map((char: string): number => {
        if (char === ".") return 0;
        else if (char === "#") return 1;
        else throw new Error(`Invalid character in map: ${char}`);
      })
    );

export const findAsteroids = asteroidMap => {
  return asteroidMap
    .map((row, i) => {
      return row.map((item, j) => {
        return { x: j, y: i, isAsteroid: item === 1 };
      });
    })
    .flat()
    .filter(item => item.isAsteroid === true)
    .map(({ x, y }) => ({ x, y }));
};

// From https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/atan2
const calculateAngleDegrees = ({ x, y }: CustomCoordinates): number => {
  return (Math.atan2(y, x) * 180) / Math.PI;
};

const rebase = (
  asteroid: DestroyableAsteroid,
  base: Asteroid
): DestroyableAsteroid => ({
  x: asteroid.x - base.x,
  y: asteroid.y - base.y,
  origX: asteroid.x,
  origY: asteroid.y
});

const populateAngle = (asteroid: Asteroid): DestroyableAsteroid => ({
  ...asteroid,
  angle: calculateAngleDegrees(asteroid)
});

const populateDistance = (asteroid: Asteroid): DestroyableAsteroid => ({
  ...asteroid,
  distance: Math.abs(asteroid.x) + Math.abs(asteroid.y)
});

const removeBase = ({ x, y }) => x !== 0 || y !== 0;

export const countVisibleAsteroids = (
  asteroids: Asteroid[],
  chosenAsteroid: Asteroid
): number => {
  const angles = asteroids
    // Reposition all asteroids so that base is 0,0
    .map(asteroid => rebase(asteroid, chosenAsteroid))
    // Remove the base asteroid
    .filter(removeBase)
    // Calculate atan2 for each asteroid
    .map(asteroid => calculateAngleDegrees(asteroid));

  // Count number of visible asteroids i.e. remove duplicate angles
  const unique = new Set(angles);
  return unique.size;
};

export const findBestBase = (asteroids: Asteroid[]): CustomCoordinates => {
  const withCounts = asteroids
    .map(asteroid => ({
      ...asteroid,
      visible: countVisibleAsteroids(asteroids, asteroid)
    }))
    .sort((a, b) => {
      if (a.visible > b.visible) {
        return -1;
      } else if (a.visible < b.visible) {
        return +1;
      } else {
        return 0;
      }
    });

  return withCounts[0];
};

/*
 * -90 -> 180, -180 -> -90
 */
export const sortByAngle = (
  a: DestroyableAsteroid,
  b: DestroyableAsteroid
): number => {
  const aAngle = a.angle < -90 ? a.angle + 360 : a.angle;
  const bAngle = b.angle < -90 ? b.angle + 360 : b.angle;

  if (aAngle > bAngle) {
    return +1;
  } else if (aAngle < bAngle) {
    return -1;
  } else {
    return 0;
  }
};

const sortByDistance = (
  a: DestroyableAsteroid,
  b: DestroyableAsteroid
): number => {
  if (a.distance > b.distance) {
    return +1;
  } else if (a.distance < b.distance) {
    return -1;
  } else {
    return 0;
  }
};

export const prepareForLaser = (
  asteroids: Asteroid[],
  base: Asteroid
): Asteroid[] => {
  const result = asteroids
    // Rebase so base is 0,0
    .map(asteroid => rebase(asteroid, base))
    // Populate angles
    .map(asteroid => populateAngle(asteroid))
    // Populate euclidean distance from base
    .map(asteroid => populateDistance(asteroid))
    // Remove 0,0
    .filter(removeBase)
    // Sort by angle then distance (within angle)
    .sort(sortByDistance)
    .sort(sortByAngle);

  return result;
};

export const laserSingleRotation = (
  asteroids: DestroyableAsteroid[],
  dict,
  destroyedCount = 0
) => {
  let asteroidsRemain = false;

  const finalAsteroids = asteroids.map(asteroid => {
    const exists = !asteroid.destroyed;
    const asteroidsAtAngle = dict[asteroid.angle];
    const isOnlyAsteroidAtAngle = asteroidsAtAngle.length === 1;
    const isClosestAsteroidAtAngle =
      asteroidsAtAngle[0].distance === asteroid.distance;

    if (!exists) {
      return asteroid;
    } else if (isOnlyAsteroidAtAngle || isClosestAsteroidAtAngle) {
      destroyedCount += 1;
      return { ...asteroid, destroyed: true, order: destroyedCount };
    } else {
      asteroidsRemain = true;
      return asteroid;
    }
  });

  return {
    asteroids: finalAsteroids,
    destroyedCount,
    asteroidsRemain
  };
};

export const createAsteroidsDict = (asteroids: DestroyableAsteroid[]): object =>
  asteroids.reduce((acc, cur) => {
    if (!acc[cur.angle]) {
      return {
        ...acc,
        [cur.angle]: [cur]
      };
    } else {
      return { ...acc, [cur.angle]: [...acc[cur.angle], cur] };
    }
  }, {});

export const solve = (asteroids: Asteroid[], base: Asteroid) => {
  let prepared = prepareForLaser(asteroids, base);
  let asteroidsRemain = true;
  let destroyedCount = 0;

  const dict = createAsteroidsDict(prepared);

  while (destroyedCount < 200) {
    const result = laserSingleRotation(prepared, dict, destroyedCount);
    prepared = result.asteroids;
    asteroidsRemain = result.asteroidsRemain;
    destroyedCount = result.destroyedCount;
  }

  return prepared;
};
