const { runOpcode } = require('./computer')
const opcode = require('./diagnosticProgram')

const main = async () => {
  try {
    const { outputs } = await runOpcode(opcode, [1])
    console.log(outputs)
  } catch (e) {
    console.error(e)
  }
}

main()
