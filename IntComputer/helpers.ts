export const padZeroes = (num: number): string => {
  const str = num.toString();
  const zeroesNeeded = 5 - str.length;
  const padded: string = Array(zeroesNeeded)
    .fill("0")
    .join("");
  return `${padded}${str}`;
};

export const getOperation = (instruction: number): number => {
  const instructionPadded: string = padZeroes(instruction);
  return parseInt(instructionPadded.slice(3, 5));
};

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
