import input from "./asteroidField";
import { parseMap, findAsteroids, findBestBase, solve } from "./helpers";

const main = (): void => {
  const map = parseMap(input);
  const asteroids = findAsteroids(map);

  // const result = findBestBase(asteroids);
  const result = solve(asteroids, { x: 22, y: 19 });

  const twoHundredth = result.filter(asteroid => asteroid.order === 200)[0];

  const answer = twoHundredth.origX * 100 + twoHundredth.origY;

  console.log(answer);
};

main();
