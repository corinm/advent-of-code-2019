import {
  setOrbiter,
  setOrbited,
  createTree,
  getAllEdges,
  getEdgesForPlanet
} from "./helpers";
import { fullTree } from "./data";

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

describe("getAllEdges", () => {
  test("should return all edges for simple case", () => {
    const tree = {
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
    };
    // COM - B - C
    expect(getAllEdges(tree)).toEqual(new Set(["COM-B", "B-C", "COM-C"]));
  });

  test("should return all edges for complex case", () => {
    const edges = getAllEdges(fullTree);
    expect(edges).toEqual(
      new Set([
        "COM-B",
        "COM-C",
        "COM-D",
        "COM-E",
        "COM-F",
        "COM-G",
        "COM-H",
        "COM-I",
        "COM-J",
        "COM-K", // 10
        "COM-L",
        "B-C",
        "B-D",
        "B-E",
        "B-F",
        "B-G",
        "B-H",
        "B-I",
        "B-J",
        "B-K", // 20
        "B-L",
        "C-D",
        "C-E",
        "C-F",
        "C-I",
        "C-J",
        "C-K",
        "C-L",
        "D-E",
        "D-F", // 30
        "D-I",
        "D-J",
        "D-K",
        "D-L",
        "E-F",
        "E-J",
        "E-K",
        "E-L",
        "G-H",
        "J-K", // 40
        "J-L",
        "K-L" // 42
      ])
    );
    expect(edges.size).toEqual(42);
  });
});

describe("getEdgesForPlanet", () => {
  test("returns all edges for B planet", () => {
    expect(getEdgesForPlanet(fullTree, "B")).toEqual(["COM-B"]);
  });

  test("returns all edges for C planet", () => {
    expect(getEdgesForPlanet(fullTree, "C")).toEqual(["B-C", "COM-C", "COM-B"]);
  });

  test("returns all edges for D planet", () => {
    expect(getEdgesForPlanet(fullTree, "D")).toEqual([
      "C-D",
      "B-D",
      "B-C",
      "COM-D",
      "COM-C",
      "COM-B"
    ]);
  });
});
