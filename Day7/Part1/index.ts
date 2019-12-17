import { findMaxThrusterSignal, generateAllPhaseSettings } from "./helpers";
import opcode from "../opcode";

const main = async () => {
  const result = await findMaxThrusterSignal(opcode);
  console.log(result);
};

main();
