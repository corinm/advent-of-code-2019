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

export const depthFirstSearch = (tree: Tree): Set<string> => {
  // Initialize an empty stack for storage of nodes, S.
  // For each vertex u, define u.visited to be false.
  // Push the root (first node to be visited) onto S.
  // While S is not empty:
  //     Pop the first element in S, u.
  //     If u.visited = false, then:
  //         U.visited = true
  //         for each unvisited neighbor w of u:
  //             Push w into S.
  // End process when all nodes have been visited

  const root = "COM";
  let stack = [root];
  const visited: Set<string> = new Set();
  const visitedEdges: Set<string> = new Set();

  while (stack.length > 0) {
    const vertex = stack.pop();

    if (!visited.has(vertex)) {
      // Store vertex
      visited.add(vertex);

      // Store edges
      tree[vertex].children.forEach((childVertex: string) => {
        visitedEdges.add(`${vertex}-${childVertex}`);
      });

      stack = [...stack, ...tree[vertex].children];
    }
  }

  return visitedEdges;
};

const removeCom = key => key !== "COM";
const flatten = (acc: string[] = [], cur): string[] => [...acc, ...cur];
const createEdges = (planet: Planet): string[] => [
  `COM-${planet.id}`,
  `${planet.parent}-${planet.id}`
];

export const getEdgesForPlanet = (
  tree: Tree,
  planetId: string,
  planetsVisited: string[] = []
): string[] => {
  const planet = tree[planetId];
  const parentId = planet.parent;

  if (planetId === "COM") {
    const allPlanets = [...planetsVisited, "COM"];
    return allPlanets
      .map((planet1: string, i: number) => {
        return allPlanets.map((planet2: string, j: number) => {
          if (planet1 === planet2) {
            // Skip
          } else if (planet2 === "COM") {
            // Skip
          } else if (i <= j) {
            // Skip
          } else {
            return `${planet1}-${planet2}`;
          }
        });
      })
      .reduce(flatten)
      .filter(value => value);
  } else {
    planetsVisited.push(planetId);
    return [...getEdgesForPlanet(tree, parentId, planetsVisited)];
  }
};

export const getAllEdges = (tree: Tree): Set<string> => {
  const edges: string[] = Object.keys(tree)
    .filter(removeCom)
    .map((key: string): Planet => ({ ...tree[key], id: key }))
    .map(planet => getEdgesForPlanet(tree, planet.id))
    .reduce(flatten);

  return new Set(edges);
};
