exports.padZeroes = num => {
  const str = num.toString()
  const zeroesNeeded = 5 - str.length
  const padded = Array(zeroesNeeded).fill('0').join('')
  return `${padded}${str}`
}

exports.parseInstruction = (instruction) => {
  const instructionPadded = this.padZeroes(instruction)

  return {
    operation: parseInt(instructionPadded.slice(3, 5)),
    modeParam1: parseInt(instructionPadded.slice(2, 3)),
    modeParam2: parseInt(instructionPadded.slice(1, 2)),
    modeParam3: parseInt(instructionPadded.slice(0, 1))
  }
}
