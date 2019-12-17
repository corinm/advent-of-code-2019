import { run, findMaxThrusterSignal } from "./helpers";

describe("run", () => {
  test("example 1", async () => {
    const opcode = [
      3,
      15,
      3,
      16,
      1002,
      16,
      10,
      16,
      1,
      16,
      15,
      15,
      4,
      15,
      99,
      0,
      0
    ];
    const phaseSettings = [4, 3, 2, 1, 0];
    const thrusterSignal = await run(opcode, phaseSettings);
    expect(thrusterSignal).toEqual(43210);
  });

  test("example 2", async () => {
    const opcode = [
      3,
      23,
      3,
      24,
      1002,
      24,
      10,
      24,
      1002,
      23,
      -1,
      23,
      101,
      5,
      23,
      23,
      1,
      24,
      23,
      23,
      4,
      23,
      99,
      0,
      0
    ];
    const phaseSettings = [0, 1, 2, 3, 4];
    const thrusterSignal = await run(opcode, phaseSettings);
    expect(thrusterSignal).toEqual(54321);
  });

  test("example 3", async () => {
    const opcode = [
      3,
      31,
      3,
      32,
      1002,
      32,
      10,
      32,
      1001,
      31,
      -2,
      31,
      1007,
      31,
      0,
      33,
      1002,
      33,
      7,
      33,
      1,
      33,
      31,
      31,
      1,
      32,
      31,
      31,
      4,
      31,
      99,
      0,
      0,
      0
    ];
    const phaseSettings = [1, 0, 4, 3, 2];
    const thrusterSignal = await run(opcode, phaseSettings);
    expect(thrusterSignal).toEqual(65210);
  });
});

describe("findMaxThrusterSignal", () => {
  test("example 1", async () => {
    const opcode = [
      3,
      15,
      3,
      16,
      1002,
      16,
      10,
      16,
      1,
      16,
      15,
      15,
      4,
      15,
      99,
      0,
      0
    ];
    const thrusterSignal = await findMaxThrusterSignal(opcode);
    expect(thrusterSignal).toEqual(43210);
  });

  test("example 2", async () => {
    const opcode = [
      3,
      23,
      3,
      24,
      1002,
      24,
      10,
      24,
      1002,
      23,
      -1,
      23,
      101,
      5,
      23,
      23,
      1,
      24,
      23,
      23,
      4,
      23,
      99,
      0,
      0
    ];
    const thrusterSignal = await findMaxThrusterSignal(opcode);
    expect(thrusterSignal).toEqual(54321);
  });

  test("example 3", async () => {
    const opcode = [
      3,
      31,
      3,
      32,
      1002,
      32,
      10,
      32,
      1001,
      31,
      -2,
      31,
      1007,
      31,
      0,
      33,
      1002,
      33,
      7,
      33,
      1,
      33,
      31,
      31,
      1,
      32,
      31,
      31,
      4,
      31,
      99,
      0,
      0,
      0
    ];
    const thrusterSignal = await findMaxThrusterSignal(opcode);
    expect(thrusterSignal).toEqual(65210);
  });
});
