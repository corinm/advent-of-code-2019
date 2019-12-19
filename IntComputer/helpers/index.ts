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
