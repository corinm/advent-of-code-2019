const { add, multiply } = require('./operations')

exports.runOpcode = opcode => {
  let instructionPointer = 0
  let isDone = false

  while (!isDone) {
    const operation = opcode[instructionPointer]
    switch (operation) {
      case 1:
        add(opcode, instructionPointer)
        instructionPointer += 4
        break

      case 2:
        multiply(opcode, instructionPointer)
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
