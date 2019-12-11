const { add, multiply } = require('./operations')

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
    const operation = opcode[instructionPointer]
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
        throw new Error('?')
    }
  }
}
