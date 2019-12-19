import { getParameter, getParameters, setOutput } from "./helpers";

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
