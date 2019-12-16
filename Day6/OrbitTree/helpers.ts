import { Tree, Planet } from "./types";

export const setOrbiter = (
  tree: Tree,
  orbited: string,
  orbiter: string
): Tree => {
  if (tree[orbiter]) {
    return {
      ...tree,
      [orbiter]: {
        ...tree[orbiter],
        parent: orbited
      }
    };
  } else {
    return {
      ...tree,
      [orbiter]: {
        parent: orbited,
        children: []
      }
    };
  }
};

export const setOrbited = (
  tree: Tree,
  orbited: string,
  orbiter: string
): Tree => {
  if (tree[orbited]) {
    return {
      ...tree,
      [orbited]: {
        ...tree[orbited],
        children: [...tree[orbited].children, orbiter]
      }
    };
  } else {
    return {
      ...tree,
      [orbited]: {
        children: [orbiter]
      }
    };
  }
};

export const createTree = (orbitsData: string[]): Tree => {
  let tree = {};

  orbitsData
    .map(str => str.split(")"))
    .forEach(([orbited, orbiter]) => {
      tree = setOrbiter(tree, orbited, orbiter);
      tree = setOrbited(tree, orbited, orbiter);
    });

  return tree;
};

export const countAncestors = (tree: Tree, planetId: string): number => {
  let ancestors = 0;
  let currentPlanetId = planetId;
  let currentPlanet = tree[planetId];

  while (currentPlanetId !== "COM") {
    ancestors += 1;
    currentPlanetId = currentPlanet.parent;
    currentPlanet = tree[currentPlanet.parent];
  }

  return ancestors;
};

const sum = (acc: number = 0, cur: number) => acc + cur;

export const countOrbits = (tree: Tree) => {
  return Object.keys(tree)
    .map((planetId: string): number => countAncestors(tree, planetId))
    .reduce(sum);
};

export const getAncestors = (tree: Tree, planetId: string): string[] => {
  let currentPlanetId = planetId;
  let currentPlanet = tree[planetId];
  const ancestors = [];

  while (currentPlanetId !== "COM") {
    ancestors.push(currentPlanet.parent);
    currentPlanetId = currentPlanet.parent;
    currentPlanet = tree[currentPlanet.parent];
  }

  return ancestors;
};

const removeCurrentOrbit = (_, i: number) => i !== 0;

export const getCommonAncestor = (
  tree: Tree,
  planet1: string,
  planet2: string
) => {
  const planet1Ancestors = getAncestors(tree, planet1).filter(
    removeCurrentOrbit
  );
  const planet2Ancestors = getAncestors(tree, planet2);

  if (planet1Ancestors[0] === planet2Ancestors[0]) {
    return {
      commonAncestor: planet1Ancestors[0],
      steps: []
    };
  } else {
    let commonAncestor = null;
    let stepsPlanet1 = [];
    let stepsPlanet2 = [];

    planet1Ancestors.forEach((planet: string, i: number) => {
      const isCommonAncestor = planet2Ancestors.includes(planet);

      if (!isCommonAncestor) {
        stepsPlanet1.push(planet);
      }
      if (!commonAncestor && isCommonAncestor) {
        commonAncestor = planet;
        stepsPlanet1.push(planet);
      }
    });

    let commonAncestorFound = false;

    planet2Ancestors.forEach((planet: string, i: number) => {
      if (planet === commonAncestor) {
        commonAncestorFound = true;
      }
      if (!commonAncestorFound) {
        stepsPlanet2.push(planet);
      }
    });

    const steps = [...stepsPlanet1, ...stepsPlanet2.reverse()];

    return {
      commonAncestor,
      steps,
      stepsCount: steps.length
    };
  }
};
