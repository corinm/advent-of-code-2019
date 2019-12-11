const { add, multiply } = require('./operations')

exports.run = opcode => {
  let currentIndex = 0
  let isDone = false

  while (!isDone) {
    const operation = opcode[currentIndex]
    switch (operation) {
      case 1:
        add(opcode, currentIndex)
        currentIndex += 4
        break

      case 2:
        multiply(opcode, currentIndex)
        currentIndex += 4
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
