import { runOpcode } from "../computer";

export const run = async (
  opcode: number[],
  phaseSettings: number[]
): Promise<number> => {
  const [a, b, c, d, e] = phaseSettings;

  const { outputs: outputsA } = await runOpcode(opcode, [a, 0]);
  const outputA = outputsA[0];
  const { outputs: outputsB } = await runOpcode(opcode, [b, outputA]);
  const outputB = outputsB[0];
  const { outputs: outputsC } = await runOpcode(opcode, [c, outputB]);
  const outputC = outputsC[0];
  const { outputs: outputsD } = await runOpcode(opcode, [d, outputC]);
  const outputD = outputsD[0];
  const { outputs: outputsE } = await runOpcode(opcode, [e, outputD]);
  const outputE = outputsE[0];

  return outputE;
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

export const generateAllPhaseSettings = (): number[][] => {
  const settings = [];

  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      for (let k = 0; k < 5; k++) {
        for (let l = 0; l < 5; l++) {
          for (let m = 0; m < 5; m++) {
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
  const allPhaseSettings = generateAllPhaseSettings();
  const allResults = await Promise.all(
    allPhaseSettings.map(setting => run(opcode, setting))
  );
  return allResults.reduce((acc: number = 0, cur: number): number => {
    return cur > acc ? cur : acc;
  });
};
