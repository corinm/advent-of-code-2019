import { readFileSync } from "fs";

import {
  setOrbiter,
  setOrbited,
  createTree,
  countOrbits,
  countAncestors,
  getAncestors,
  getCommonAncestor
} from "./helpers";
import { fullTree, fullTreeWithSanta } from "./data";
import OrbitTree from "../OrbitTree";

describe("setOrbiter", () => {
  test("should set the orbiter if not already present", () => {
    const tree = {};
    const orbited = "A";
    const orbiter = "B";
    const newTree = setOrbiter(tree, orbited, orbiter);
    expect(newTree).toEqual({
      B: {
        parent: "A",
        children: []
      }
    });
  });

  test("should set the orbiter if already present", () => {
    const tree = {
      B: {
        children: ["C"]
      }
    };
    const orbited = "A";
    const orbiter = "B";
    const newTree = setOrbiter(tree, orbited, orbiter);
    expect(newTree).toEqual({
      B: {
        parent: "A",
        children: ["C"]
      }
    });
  });
});

describe("setOrbited", () => {
  test("should set the orbited if not already present", () => {
    const tree = {};
    const orbited = "A";
    const orbiter = "B";
    const newTree = setOrbited(tree, orbited, orbiter);
    expect(newTree).toEqual({
      A: {
        children: ["B"]
      }
    });
  });

  test("should set the orbited if already present", () => {
    const tree = {
      A: {
        parent: "COM",
        children: []
      }
    };
    const orbited = "A";
    const orbiter = "B";
    const newTree = setOrbited(tree, orbited, orbiter);
    expect(newTree).toEqual({
      A: {
        parent: "COM",
        children: ["B"]
      }
    });
  });

  test("should set the orbited if already present and has children", () => {
    const tree = {
      A: {
        parent: "COM",
        children: ["D"]
      }
    };
    const orbited = "A";
    const orbiter = "B";
    const newTree = setOrbited(tree, orbited, orbiter);
    expect(newTree).toEqual({
      A: {
        parent: "COM",
        children: ["D", "B"]
      }
    });
  });
});

describe("createTree", () => {
  test("creates simple tree", () => {
    const orbitData = ["COM)B", "B)C"];
    const tree = createTree(orbitData);
    expect(tree).toEqual({
      COM: {
        children: ["B"]
      },
      B: {
        parent: "COM",
        children: ["C"]
      },
      C: {
        parent: "B",
        children: []
      }
    });
  });
});

describe("countOrbits", () => {
  test("should return 42 for fullTree", () => {
    expect(countOrbits(fullTree)).toEqual(42);
  });

  test("returns 358244 for tree of part 1 data", () => {
    const data = readFileSync(`${__dirname}/../orbits.txt`, "UTF-8");
    const orbits = data.split("\n");
    const ot = new OrbitTree(orbits);
    const tree = ot.getTree();
    expect(countOrbits(tree)).toEqual(358244);
  });
});

describe("countAncestors", () => {
  test("returns 1 ancestor for planet B", () => {
    expect(countAncestors(fullTree, "B")).toEqual(1);
  });

  test("returns 2 ancestors for planet C", () => {
    expect(countAncestors(fullTree, "C")).toEqual(2);
  });

  test("returns 3 ancestors for planet D", () => {
    expect(countAncestors(fullTree, "D")).toEqual(3);
  });
});

describe("getAncestors", () => {
  test("returns ancestors for planet B", () => {
    expect(getAncestors(fullTree, "B")).toEqual(["COM"]);
  });

  test("returns ancestors for planet C", () => {
    expect(getAncestors(fullTree, "C")).toEqual(["B", "COM"]);
  });

  test("returns ancestors for planet D", () => {
    expect(getAncestors(fullTree, "D")).toEqual(["C", "B", "COM"]);
  });
});

describe("getCommonAncestor", () => {
  test("corrently answers example", () => {
    expect(getCommonAncestor(fullTreeWithSanta, "YOU", "SAN")).toEqual({
      commonAncestor: "D",
      steps: ["J", "E", "D", "I"],
      stepsCount: 4
    });
  });
});
