const positionMode = mode => mode === 0
const immediateMode = mode => mode === 1

const getParameter = (opcode, pointer, offset, mode) => {
  if (positionMode(mode)) {
    const address = opcode[pointer + offset]
    return opcode[address]
  } else if (immediateMode(mode)) {
    return opcode[pointer + offset]
  } else {
    throw new Error(`Unknown mode: ${mode}`)
  }
}

const getParameters = (opcode, pointer, modeParam1, modeParam2) => ({
  parameter1: getParameter(opcode, pointer, 1, modeParam1),
  parameter2: getParameter(opcode, pointer, 2, modeParam2)
})

const setOutput = (opcode, pointer, output) => {
  const newOpcode = [...opcode]
  const outputAddress = opcode[pointer + 3]
  newOpcode[outputAddress] = output
  return newOpcode
}

exports.add = ({ opcode, pointer, modeParam1, modeParam2 }) => {
  const { parameter1, parameter2 } = getParameters(opcode, pointer, modeParam1, modeParam2)
  const output = parameter1 + parameter2
  const newOpcode = setOutput(opcode, pointer, output)
  return newOpcode
}

exports.multiply = ({ opcode, pointer, modeParam1, modeParam2 }) => {
  const { parameter1, parameter2 } = getParameters(opcode, pointer, modeParam1, modeParam2)
  const output = parameter1 * parameter2
  const newOpcode = setOutput(opcode, pointer, output)
  return newOpcode
}
