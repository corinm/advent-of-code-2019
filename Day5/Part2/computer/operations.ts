import { getMode } from "./helpers";

const positionMode = mode => mode === 0;
const immediateMode = mode => mode === 1;

const getParameter = (
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

const getParameters = (opcode: number[], pointer: number) => ({
  parameter1: getParameter(opcode, pointer, 1),
  parameter2: getParameter(opcode, pointer, 2)
});

const setOutput = (opcode: number[], pointer: number, output): number[] => {
  const newOpcode = [...opcode];
  const outputAddress = opcode[pointer + 3];
  newOpcode[outputAddress] = output;
  return newOpcode;
};

export const add = (opcode: number[], pointer: number): number[] => {
  const { parameter1, parameter2 } = getParameters(opcode, pointer);
  const output = parameter1 + parameter2;
  const newOpcode = setOutput(opcode, pointer, output);
  return newOpcode;
};

export const multiply = (opcode: number[], pointer: number): number[] => {
  const { parameter1, parameter2 } = getParameters(opcode, pointer);
  const output = parameter1 * parameter2;
  const newOpcode = setOutput(opcode, pointer, output);
  return newOpcode;
};

export const saveToPosition = (
  opcode: number[],
  pointer: number,
  input: number
): number[] => {
  const newOpcode = [...opcode];
  const outputAddress = opcode[pointer + 1];
  newOpcode[outputAddress] = input;
  return newOpcode;
};

export const outputParameter = (opcode: number[], pointer: number) => {
  return getParameter(opcode, pointer, 1);
};

/**
 * Opcode 5 is jump-if-true: if the first parameter is non-zero, it sets the
 * instruction pointer to the value from the second parameter.
 * Otherwise, it does nothing
 */
export const jumpIfTrue = (opcode: number[], pointer: number) => {
  const { parameter1, parameter2 } = getParameters(opcode, pointer);
  return parameter1 !== 0 ? parameter2 : pointer + 3;
};

export const jumpIfFalse = (opcode: number[], pointer: number) => {
  const { parameter1, parameter2 } = getParameters(opcode, pointer);
  return parameter1 !== 0 ? pointer + 3 : parameter2;
};

export const lessThan = (opcode: number[], pointer: number) => {
  const { parameter1, parameter2 } = getParameters(opcode, pointer);
  const output = parameter1 < parameter2 ? 1 : 0;
  const newOpcode = setOutput(opcode, pointer, output);
  return newOpcode;
};

export const equals = (opcode: number[], pointer: number) => {
  const { parameter1, parameter2 } = getParameters(opcode, pointer);
  const output = parameter1 === parameter2 ? 1 : 0;
  const newOpcode = setOutput(opcode, pointer, output);
  return newOpcode;
};
