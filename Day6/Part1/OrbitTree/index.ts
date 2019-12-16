import { createTree, getAllEdges } from "./helpers";
import { Tree } from "./types";

export default class OrbitTree {
  tree: Tree = {};

  constructor(orbitsData) {
    this.tree = createTree(orbitsData);
  }

  getTree = (): Tree => this.tree;

  getCountOfAllEdges = (): number => {
    const allEdges = getAllEdges(this.tree);
    return allEdges.size;
  };
}
