import { readFileSync } from "fs";
import OrbitTree from "./OrbitTree";

const main = () => {
  try {
    const data = readFileSync(`${__dirname}/orbits.txt`, "UTF-8");
    const orbits = data.split("\n");
    const ot = new OrbitTree(orbits);
    const count = ot.getCountOfAllEdges();
    console.log(count);
  } catch (e) {
    console.error(e);
  }
};

main();
