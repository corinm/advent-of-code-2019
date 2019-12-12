const { initialiseMemory, runOpcode } = require('../Part1/computer')
const gravityAssistProgram = require('../Part1/gravityAssistProgram')

const main = () => {
  for (let noun = 0; noun <= 99; noun++) {
    for (let verb = 0; verb <= 99; verb++) {
      const opcode = initialiseMemory([...gravityAssistProgram], noun, verb)
      const [output] = runOpcode(opcode)

      if (output === 19690720) {
        console.log({ noun, verb, check: 100 * noun + verb })
      }
    }
  }
}

main()
