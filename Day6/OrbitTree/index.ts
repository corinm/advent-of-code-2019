import { createTree, countOrbits, getCommonAncestor } from "./helpers";
import { Tree } from "./types";

export default class OrbitTree {
  tree: Tree = {};

  constructor(orbitsData) {
    this.tree = createTree(orbitsData);
  }

  getTree = (): Tree => this.tree;

  countOrbits = (): number => countOrbits(this.tree);

  getStepsToSanta = () => getCommonAncestor(this.tree, "YOU", "SAN");
}
