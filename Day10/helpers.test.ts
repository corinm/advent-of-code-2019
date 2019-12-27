import {
  parseMap,
  findAsteroids,
  countVisibleAsteroids,
  findBestBase,
  prepareForLaser,
  createAsteroidsDict,
  laserSingleRotation,
  sortByAngle
} from "./helpers";

describe("parseMap", () => {
  test("correctly parses example 1", () => {
    const rawMap = `.#..#
      .....
      #####
      ....#
      ...##`;
    expect(parseMap(rawMap)).toEqual([
      [0, 1, 0, 0, 1],
      [0, 0, 0, 0, 0],
      [1, 1, 1, 1, 1],
      [0, 0, 0, 0, 1],
      [0, 0, 0, 1, 1]
    ]);
  });
});

describe("findAsteroids", () => {
  test("finds all asteroids in example 1", () => {
    const map = [
      [0, 1, 0, 0, 1],
      [0, 0, 0, 0, 0],
      [1, 1, 1, 1, 1],
      [0, 0, 0, 0, 1],
      [0, 0, 0, 1, 1]
    ];
    const result = findAsteroids(map);
    expect(result).toEqual([
      { x: 1, y: 0 },
      { x: 4, y: 0 },
      { x: 0, y: 2 },
      { x: 1, y: 2 },
      { x: 2, y: 2 },
      { x: 3, y: 2 },
      { x: 4, y: 2 },
      { x: 4, y: 3 },
      { x: 3, y: 4 },
      { x: 4, y: 4 }
    ]);
  });
});

describe("countVisibleAsteroids", () => {
  test("correctly counts example 1, asteroid 1", () => {
    const asteroids = [
      { x: 1, y: 0 },
      { x: 4, y: 0 },
      { x: 0, y: 2 },
      { x: 1, y: 2 },
      { x: 2, y: 2 },
      { x: 3, y: 2 },
      { x: 4, y: 2 },
      { x: 4, y: 3 },
      { x: 3, y: 4 },
      { x: 4, y: 4 }
    ];
    const chosenAsteroid = { x: 1, y: 0 };
    expect(countVisibleAsteroids(asteroids, chosenAsteroid)).toEqual(7);
  });
});

describe("findBestBase", () => {
  test("should return correct asteroid for example 1", () => {
    const asteroids = [
      { x: 1, y: 0 },
      { x: 4, y: 0 },
      { x: 0, y: 2 },
      { x: 1, y: 2 },
      { x: 2, y: 2 },
      { x: 3, y: 2 },
      { x: 4, y: 2 },
      { x: 4, y: 3 },
      { x: 3, y: 4 },
      { x: 4, y: 4 }
    ];
    expect(findBestBase(asteroids)).toEqual({ x: 3, y: 4, visible: 8 });
  });

  test("should return correct asteroid for example 2", () => {
    const rawInput = `......#.#.
    #..#.#....
    ..#######.
    .#.#.###..
    .#..#.....
    ..#....#.#
    #..#....#.
    .##.#..###
    ##...#..#.
    .#....####`;
    const map = parseMap(rawInput);
    const asteroids = findAsteroids(map);
    expect(findBestBase(asteroids)).toEqual({ x: 5, y: 8, visible: 33 });
  });

  test("should return correct asteroid for example 3", () => {
    const rawInput = `#.#...#.#.
    .###....#.
    .#....#...
    ##.#.#.#.#
    ....#.#.#.
    .##..###.#
    ..#...##..
    ..##....##
    ......#...
    .####.###.`;
    const map = parseMap(rawInput);
    const asteroids = findAsteroids(map);
    expect(findBestBase(asteroids)).toEqual({ x: 1, y: 2, visible: 35 });
  });

  test("should return correct asteroid for example 4", () => {
    const rawInput = `.#..#..###
    ####.###.#
    ....###.#.
    ..###.##.#
    ##.##.#.#.
    ....###..#
    ..#.#..#.#
    #..#.#.###
    .##...##.#
    .....#.#..`;
    const map = parseMap(rawInput);
    const asteroids = findAsteroids(map);
    expect(findBestBase(asteroids)).toEqual({ x: 6, y: 3, visible: 41 });
  });

  test("should return correct asteroid for example 4", () => {
    const rawInput = `.#..##.###...#######
    ##.############..##.
    .#.######.########.#
    .###.#######.####.#.
    #####.##.#.##.###.##
    ..#####..#.#########
    ####################
    #.####....###.#.#.##
    ##.#################
    #####.##.###..####..
    ..######..##.#######
    ####.##.####...##..#
    .#####..#.######.###
    ##...#.##########...
    #.##########.#######
    .####.#.###.###.#.##
    ....##.##.###..#####
    .#.#.###########.###
    #.#.#.#####.####.###
    ###.##.####.##.#..##`;
    const map = parseMap(rawInput);
    const asteroids = findAsteroids(map);
    expect(findBestBase(asteroids)).toEqual({ x: 11, y: 13, visible: 210 });
  });
});

describe("sortByAngle", () => {
  test("leaves already sorted items as is", () => {
    const items = [
      { x: 0, y: 0, angle: -90 },
      { x: 0, y: 0, angle: -45 },
      { x: 0, y: 0, angle: 0 },
      { x: 0, y: 0, angle: 45 },
      { x: 0, y: 0, angle: 90 },
      { x: 0, y: 0, angle: 135 },
      { x: 0, y: 0, angle: 180 },
      { x: 0, y: 0, angle: -135 }
    ];
    expect(items.sort(sortByAngle)).toEqual([
      { x: 0, y: 0, angle: -90 },
      { x: 0, y: 0, angle: -45 },
      { x: 0, y: 0, angle: 0 },
      { x: 0, y: 0, angle: 45 },
      { x: 0, y: 0, angle: 90 },
      { x: 0, y: 0, angle: 135 },
      { x: 0, y: 0, angle: 180 },
      { x: 0, y: 0, angle: -135 }
    ]);
  });

  test("sorts from -90 to 180, then -180 to -90", () => {
    const items = [
      { x: 0, y: 0, angle: 0 },
      { x: 0, y: 0, angle: 45 },
      { x: 0, y: 0, angle: 180 },
      { x: 0, y: 0, angle: 90 },
      { x: 0, y: 0, angle: 135 },
      { x: 0, y: 0, angle: -45 },
      { x: 0, y: 0, angle: -135 },
      { x: 0, y: 0, angle: -90 }
    ];
    expect(items.sort(sortByAngle)).toEqual([
      { x: 0, y: 0, angle: -90 },
      { x: 0, y: 0, angle: -45 },
      { x: 0, y: 0, angle: 0 },
      { x: 0, y: 0, angle: 45 },
      { x: 0, y: 0, angle: 90 },
      { x: 0, y: 0, angle: 135 },
      { x: 0, y: 0, angle: 180 },
      { x: 0, y: 0, angle: -135 }
    ]);
  });
});

describe("prepareForLaser", () => {
  test("correctly populates angle and distance", () => {
    const asteroids = [
      { x: 1, y: 0 },
      { x: 4, y: 0 },
      { x: 0, y: 2 },
      { x: 1, y: 2 },
      { x: 2, y: 2 }, // Removes the base
      { x: 3, y: 2 },
      { x: 4, y: 2 },
      { x: 4, y: 3 },
      { x: 3, y: 4 },
      { x: 4, y: 4 }
    ];
    const base = { x: 2, y: 2 };
    //  -135 -90 -45
    // 180    X   0
    //  135  90  45
    expect(prepareForLaser(asteroids, base)).toEqual([
      { x: 2, y: -2, angle: -45, distance: 4, origX: 4, origY: 0 },
      { x: 1, y: 0, angle: 0, distance: 1, origX: 3, origY: 2 },
      { x: 2, y: 0, angle: 0, distance: 2, origX: 4, origY: 2 },
      {
        x: 2,
        y: 1,
        angle: 26.56505117707799,
        distance: 3,
        origX: 4,
        origY: 3
      },
      { x: 2, y: 2, angle: 45, distance: 4, origX: 4, origY: 4 },
      {
        x: 1,
        y: 2,
        angle: 63.43494882292201,
        distance: 3,
        origX: 3,
        origY: 4
      },
      { x: -1, y: 0, angle: 180, distance: 1, origX: 1, origY: 2 },
      { x: -2, y: 0, angle: 180, distance: 2, origX: 0, origY: 2 },
      {
        x: -1,
        y: -2,
        angle: -116.56505117707799,
        distance: 3,
        origX: 1,
        origY: 0
      }
    ]);
  });
});

describe("createAsteroidsDict", () => {
  test("it returns the appropriate dictionary", () => {
    const asteroids = [
      { x: 2, y: -2, angle: -45, distance: 4 },
      { x: 1, y: 0, angle: 0, distance: 1 },
      { x: 2, y: 0, angle: 0, distance: 2 }
    ];
    expect(createAsteroidsDict(asteroids)).toEqual({
      "-45": [{ x: 2, y: -2, angle: -45, distance: 4 }],
      "0": [
        { x: 1, y: 0, angle: 0, distance: 1 },
        { x: 2, y: 0, angle: 0, distance: 2 }
      ]
    });
  });
});

describe("laserSingleRotation", () => {
  test("it should remove appropriate asteroids from example 4", () => {
    const asteroids = [
      { x: 2, y: -2, angle: -45, distance: 4 },
      { x: 1, y: 0, angle: 0, distance: 1 },
      { x: 2, y: 0, angle: 0, distance: 2 },
      { x: 2, y: 1, angle: 26.56505117707799, distance: 3 },
      { x: 2, y: 2, angle: 45, distance: 4 },
      { x: 1, y: 2, angle: 63.43494882292201, distance: 3 },
      { x: -1, y: 0, angle: 180, distance: 1 },
      { x: -2, y: 0, angle: 180, distance: 2 },
      { x: -1, y: -2, angle: -116.56505117707799, distance: 3 }
    ];
    const dict = asteroids.reduce((acc, cur) => {
      if (!acc[cur.angle]) {
        return {
          ...acc,
          [cur.angle]: [cur]
        };
      } else {
        return { ...acc, [cur.angle]: [...acc[cur.angle], cur] };
      }
    }, {});
    expect(laserSingleRotation(asteroids, dict)).toEqual({
      asteroids: [
        { x: 2, y: -2, angle: -45, distance: 4, destroyed: true, order: 1 },
        { x: 1, y: 0, angle: 0, distance: 1, destroyed: true, order: 2 },
        { x: 2, y: 0, angle: 0, distance: 2 },
        {
          x: 2,
          y: 1,
          angle: 26.56505117707799,
          distance: 3,
          destroyed: true,
          order: 3
        },
        { x: 2, y: 2, angle: 45, distance: 4, destroyed: true, order: 4 },
        {
          x: 1,
          y: 2,
          angle: 63.43494882292201,
          distance: 3,
          destroyed: true,
          order: 5
        },
        { x: -1, y: 0, angle: 180, distance: 1, destroyed: true, order: 6 },
        { x: -2, y: 0, angle: 180, distance: 2 },
        {
          x: -1,
          y: -2,
          angle: -116.56505117707799,
          distance: 3,
          destroyed: true,
          order: 7
        }
      ],
      asteroidsRemain: true,
      destroyedCount: 7
    });
  });
});
