const { getMode } = require('./helpers')

const positionMode = mode => mode === 0
const immediateMode = mode => mode === 1

const getParameter = (opcode, pointer, offset) => {
  const instruction = opcode[pointer]
  const mode = getMode(instruction, offset)

  if (positionMode(mode)) {
    const address = opcode[pointer + offset]
    return opcode[address]
  } else if (immediateMode(mode)) {
    return opcode[pointer + offset]
  } else {
    throw new Error(`Unknown mode: ${mode}`)
  }
}

const getParameters = (opcode, pointer) => ({
  parameter1: getParameter(opcode, pointer, 1),
  parameter2: getParameter(opcode, pointer, 2)
})

const setOutput = (opcode, pointer, output) => {
  const newOpcode = [...opcode]
  const outputAddress = opcode[pointer + 3]
  newOpcode[outputAddress] = output
  return newOpcode
}

exports.add = (opcode, pointer) => {
  const { parameter1, parameter2 } = getParameters(opcode, pointer)
  const output = parameter1 + parameter2
  const newOpcode = setOutput(opcode, pointer, output)
  return newOpcode
}

exports.multiply = (opcode, pointer) => {
  const { parameter1, parameter2 } = getParameters(opcode, pointer)
  const output = parameter1 * parameter2
  const newOpcode = setOutput(opcode, pointer, output)
  return newOpcode
}

exports.saveToPosition = (opcode, pointer, input) => {
  const newOpcode = [...opcode]
  const outputAddress = opcode[pointer + 1]
  newOpcode[outputAddress] = input
  return newOpcode
}

exports.outputParameter = (opcode, pointer) => {
  return getParameter(opcode, pointer, 1)
}

exports.jumpIfTrue = (opcode, pointer) => {
  const { parameter1, parameter2 } = getParameters(opcode, pointer)
  return parameter1 === 0 ? pointer : parameter2
}

exports.jumpIfFalse = (opcode, pointer) => {
  const { parameter1, parameter2 } = getParameters(opcode, pointer)
  return parameter1 !== 0 ? pointer : parameter2
}

exports.lessThan = (opcode, pointer) => {
  const { parameter1, parameter2 } = getParameters(opcode, pointer)
  const output = parameter1 < parameter2 ? 1 : 0
  const newOpcode = setOutput(opcode, pointer, output)
  return newOpcode
}

exports.equals = (opcode, pointer) => {
  const { parameter1, parameter2 } = getParameters(opcode, pointer)
  console.log(parameter1, parameter2)
  const output = parameter1 === parameter2 ? 1 : 0
  const newOpcode = setOutput(opcode, pointer, output)
  return newOpcode
}
