import {
  add,
  multiply,
  saveToPosition,
  outputParameter,
  jumpIfTrue,
  jumpIfFalse,
  lessThan,
  equals
} from "./operations";
import { getOperation } from "./helpers";

export const initialiseMemory = (opcode, noun, verb) => {
  const newOpcode = [...opcode];
  newOpcode[1] = noun;
  newOpcode[2] = verb;
  return newOpcode;
};

export const runOpcode = async (opcode, inputs = []) => {
  let pointer = 0;
  let isDone = false;
  let inputIndex = 0;
  const outputs = [];
  let loopCount = 0;

  // console.log("\nRunning...\n");

  while (!isDone) {
    if (loopCount >= 50) {
      throw new Error("Infinite loop");
    }

    // console.log(`Iteration: ${loopCount}`)
    loopCount++;
    const instruction = opcode[pointer];
    const operation = getOperation(instruction);

    switch (operation) {
      case 1:
        opcode = add(opcode, pointer);
        pointer += 4;
        break;

      case 2:
        opcode = multiply(opcode, pointer);
        pointer += 4;
        break;

      case 3: {
        const input = inputs[inputIndex];
        inputIndex += 1;
        opcode = saveToPosition(opcode, pointer, input);
        pointer += 2;
        break;
      }

      case 4: {
        const output = outputParameter(opcode, pointer);
        outputs.push(output);
        pointer += 2;
        break;
      }

      case 5:
        pointer = jumpIfTrue(opcode, pointer);
        break;

      case 6:
        pointer = jumpIfFalse(opcode, pointer);
        break;

      case 7:
        opcode = lessThan(opcode, pointer);
        pointer += 4;
        break;

      case 8:
        opcode = equals(opcode, pointer);
        pointer += 4;
        break;

      case 99:
        isDone = true;
        // console.log("\nFinished...\n");
        return {
          finalOpcode: opcode,
          outputs: [...outputs, "EXIT"]
        };

      default:
        isDone = true;
        throw new Error(`Unsupported operation: ${operation}`);
    }
  }
};
