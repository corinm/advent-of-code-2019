const getInput = (opcode, index, offset) => {
  const inputIndex = opcode[index + offset]
  const input = opcode[inputIndex]
  return input
}

const getInputs = (opcode, index) => ({
  input1: getInput(opcode, index, 1),
  input2: getInput(opcode, index, 2)
})

const setOutput = (opcode, index, output) => {
  const outputIndex = opcode[index + 3]
  opcode[outputIndex] = output
  return opcode
}

exports.add = (opcode, index) => {
  const { input1, input2 } = getInputs(opcode, index)
  const output = input1 + input2
  setOutput(opcode, index, output)
  return opcode
}

exports.multiply = (opcode, index) => {
  const { input1, input2 } = getInputs(opcode, index)
  const output = input1 * input2
  setOutput(opcode, index, output)
  return opcode
}
