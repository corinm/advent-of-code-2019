const getParameter = (opcode, pointer, offset) => {
  const address = opcode[pointer + offset]
  return opcode[address]
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
