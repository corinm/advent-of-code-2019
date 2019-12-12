exports.padZeroes = num => {
  const str = num.toString()
  const zeroesNeeded = 5 - str.length
  const padded = Array(zeroesNeeded).fill('0').join('')
  return `${padded}${str}`
}

exports.getOperation = instruction => {
  const instructionPadded = this.padZeroes(instruction)
  return parseInt(instructionPadded.slice(3, 5))
}

exports.getMode = (instruction, parameterNumber) => {
  const instructionPadded = this.padZeroes(instruction)
  if (parameterNumber === 1) {
    return parseInt(instructionPadded.slice(2, 3))
  } else if (parameterNumber === 2) {
    return parseInt(instructionPadded.slice(1, 2))
  } else if (parameterNumber === 3) {
    return parseInt(instructionPadded.slice(0, 1))
  } else {
    throw new Error(`Unexpected parameter number: ${parameterNumber}`)
  }
}
