const { add, multiply, saveToPosition, outputParameter, jumpIfTrue } = require('./operations')
const { getOperation } = require('./helpers')

exports.initialiseMemory = (opcode, noun, verb) => {
  const newOpcode = [...opcode]
  newOpcode[1] = noun
  newOpcode[2] = verb
  return newOpcode
}

exports.runOpcode = async (opcode, inputs = []) => {
  let pointer = 0
  let isDone = false
  let inputIndex = 0
  const outputs = []

  console.log('\nRunning...\n')

  while (!isDone) {
    const instruction = opcode[pointer]
    const operation = getOperation(instruction)

    switch (operation) {
      case 1:
        opcode = add(opcode, pointer)
        pointer += 4
        break

      case 2:
        opcode = multiply(opcode, pointer)
        pointer += 4
        break

      case 3: {
        const input = inputs[inputIndex]
        inputIndex += 1
        opcode = saveToPosition(opcode, pointer, input)
        pointer += 2
        break
      }

      case 4: {
        const output = outputParameter(opcode, pointer)
        outputs.push(output)
        pointer += 2
        break
      }

      case 5:
        pointer = jumpIfTrue(opcode, pointer)
        break

      case 99:
        isDone = true
        console.log('\nFinished...\n')
        return {
          finalOpcode: opcode,
          outputs: [...outputs, 'EXIT']
        }

      default:
        isDone = true
        throw new Error(`Unsupported operation: ${operation}`)
    }
  }
}
