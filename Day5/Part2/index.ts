import { runOpcode } from "../../IntComputer";
import diagnosticProgram from "./diagnosticProgram";

const main = async () => {
  try {
    const result = await runOpcode(diagnosticProgram, [5]);
    console.log(result);
  } catch (e) {
    console.error(e);
  }
};

main();
