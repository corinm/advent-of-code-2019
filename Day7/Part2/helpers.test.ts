import { runWithFeedbackLoop } from "./helpers";

xdescribe("runWithFeedbackLoop", () => {
  test("example 2.1", async () => {
    const opcode = [
      3,
      26,
      1001,
      26,
      -4,
      26,
      3,
      27,
      1002,
      27,
      2,
      27,
      1,
      27,
      26,
      27,
      4,
      27,
      1001,
      28,
      -1,
      28,
      1005,
      28,
      6,
      99,
      0,
      0,
      5
    ];
    const input = 0;
    const phaseSettings = [9, 8, 7, 6, 5];
    const thrusterSignal = await runWithFeedbackLoop(
      opcode,
      phaseSettings,
      input
    );
    expect(thrusterSignal).toEqual(139629729);
  });
});
