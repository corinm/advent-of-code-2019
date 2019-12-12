const { add, multiply } = require('./operations')
const { parseInstruction } = require('./helpers')

exports.initialiseMemory = (opcode, noun, verb) => {
  const newOpcode = [...opcode]
  newOpcode[1] = noun
  newOpcode[2] = verb
  return newOpcode
}

exports.runOpcode = opcode => {
  let instructionPointer = 0
  let isDone = false

  while (!isDone) {
    const instruction = opcode[instructionPointer]
    const { operation, modeP1, modeP2, modeP3 } = parseInstruction(instruction)

    switch (operation) {
      case 1:
        opcode = add(opcode, instructionPointer)
        instructionPointer += 4
        break

      case 2:
        opcode = multiply(opcode, instructionPointer)
        instructionPointer += 4
        break

      case 99:
        isDone = true
        return opcode

      default:
        isDone = true
        throw new Error(`Unsupported operation: ${operation}`)
    }
  }
}
