const { runOpcode } = require('./computer')
const gravityAssistProgram = require('./gravityAssistProgram')

/*
 * Before running the program, replace position 1 with the value 12 and replace
 * position 2 with the value 2
 */
const initialiseMemory = opcode => {
  opcode[1] = 12
  opcode[2] = 2
  return opcode
}

const stateBeforeCrash = initialiseMemory(gravityAssistProgram)
const outcome = runOpcode(stateBeforeCrash)

console.log(outcome[0])
