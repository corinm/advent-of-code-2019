import { padZeroes } from "../helpers";

export const getMode = (
  instruction: number,
  parameterNumber: number
): number => {
  const instructionPadded = padZeroes(instruction);
  if (parameterNumber === 1) {
    return parseInt(instructionPadded.slice(2, 3));
  } else if (parameterNumber === 2) {
    return parseInt(instructionPadded.slice(1, 2));
  } else if (parameterNumber === 3) {
    return parseInt(instructionPadded.slice(0, 1));
  } else {
    throw new Error(`Unexpected parameter number: ${parameterNumber}`);
  }
};

const positionMode = mode => mode === 0;
const immediateMode = mode => mode === 1;

export const getParameter = (
  opcode: number[],
  pointer: number,
  offset: number
): number => {
  const instruction = opcode[pointer];
  const mode = getMode(instruction, offset);

  if (positionMode(mode)) {
    const address: number = opcode[pointer + offset];
    return opcode[address];
  } else if (immediateMode(mode)) {
    return opcode[pointer + offset];
  } else {
    throw new Error(`Unknown mode: ${mode}`);
  }
};

export const getParameters = (opcode: number[], pointer: number) => ({
  parameter1: getParameter(opcode, pointer, 1),
  parameter2: getParameter(opcode, pointer, 2)
});

export const setOutput = (
  opcode: number[],
  pointer: number,
  output
): number[] => {
  const newOpcode = [...opcode];
  const outputAddress = opcode[pointer + 3];
  newOpcode[outputAddress] = output;
  return newOpcode;
};
