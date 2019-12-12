const { runOpcode } = require('./computer')

const main = async () => {
  const opcode = [4, 1, 99]
  const result = await runOpcode(opcode)
  console.log(result)
}

main()
