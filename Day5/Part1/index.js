const { runOpcode } = require('./computer')

const main = () => {
  const opcode = [1002, 4, 3, 4, 33]
  console.log(runOpcode(opcode))
}

main()
