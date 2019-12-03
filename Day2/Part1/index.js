const gravityAssistProgram = require('./gravityAssistProgram')

const { run } = require('./helpers')

// before running the program, replace position 1 with the value 12 and replace position 2 with the value 2
const setup = opcode => {
  opcode[1] = 12
  opcode[2] = 2
  return opcode
}

const stateBeforeCrash = setup(gravityAssistProgram)
const outcome = run(stateBeforeCrash)

console.log(outcome[0])