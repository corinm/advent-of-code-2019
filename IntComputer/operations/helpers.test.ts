import { getMode } from "./helpers";

describe("getMode", () => {
  test("returns correct mode for parameter 1", () => {
    const instruction = 101;
    expect(getMode(instruction, 1)).toEqual(1);
  });

  test("returns correct mode for parameter 2", () => {
    const instruction = 1001;
    expect(getMode(instruction, 2)).toEqual(1);
  });

  test("returns correct mode for parameter 3", () => {
    const instruction = 10001;
    expect(getMode(instruction, 3)).toEqual(1);
  });
});
