import { runOpcode } from "../computer";

export const runWithFeedbackLoop = async (
  opcode: number[],
  phaseSettings: number[],
  input
): Promise<number> => {
  let opcodeA = [...opcode];
  let opcodeB = [...opcode];
  let opcodeC = [...opcode];
  let opcodeD = [...opcode];
  let opcodeE = [...opcode];
  const [a, b, c, d, e] = phaseSettings;
  let output = null;

  while (output !== undefined) {
    const {
      outputs: outputsA,
      finalOpcode: finalOpcodeA
    } = await runOpcode(opcodeA, [a, input]);
    const outputA = outputsA[0];
    opcodeA = finalOpcodeA;

    const {
      outputs: outputsB,
      finalOpcode: finalOpcodeB
    } = await runOpcode(opcodeB, [b, outputA]);
    const outputB = outputsB[0];
    opcodeB = finalOpcodeB;

    const {
      outputs: outputsC,
      finalOpcode: finalOpcodeC
    } = await runOpcode(opcodeC, [c, outputB]);
    const outputC = outputsC[0];
    opcodeC = finalOpcodeC;

    const {
      outputs: outputsD,
      finalOpcode: finalOpcodeD
    } = await runOpcode(opcodeD, [d, outputC]);
    const outputD = outputsD[0];
    opcodeD = finalOpcodeD;

    const {
      outputs: outputsE,
      finalOpcode: finalOpcodeE
    } = await runOpcode(opcodeE, [e, outputD]);
    opcodeE = finalOpcodeE;
    output = outputsE.filter(val => val !== "EXIT")[0];
  }

  return output;
};

const noDuplicates = (i, j, k, l, m): boolean => {
  return (
    i !== j &&
    i !== k &&
    i !== l &&
    i !== m &&
    j !== k &&
    j !== l &&
    j !== m &&
    k !== l &&
    k !== m &&
    l !== m
  );
};

export const generateAllPhaseSettings = (
  min: number,
  max: number
): number[][] => {
  const settings = [];

  for (let i = min; i < max + 1; i++) {
    for (let j = min; j < max + 1; j++) {
      for (let k = min; k < max + 1; k++) {
        for (let l = min; l < max + 1; l++) {
          for (let m = min; m < max + 1; m++) {
            if (noDuplicates(i, j, k, l, m)) {
              settings.push([i, j, k, l, m]);
            }
          }
        }
      }
    }
  }

  return settings;
};

export const findMaxThrusterSignal = async (
  opcode: number[]
): Promise<number> => {
  const allPhaseSettings = generateAllPhaseSettings(5, 9);
  const allResults = await Promise.all(
    allPhaseSettings.map(setting => runWithFeedbackLoop(opcode, setting, 0))
  );
  return allResults.reduce((acc: number = 0, cur: number): number => {
    return cur > acc ? cur : acc;
  });
};
