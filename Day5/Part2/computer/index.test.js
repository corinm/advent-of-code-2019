const { initialiseMemory, runOpcode } = require('.')

describe('initialiseMemory', () => {
  test('it correctly sets noun and verb', () => {
    const opcode = [1, 9, 10, 3, 2, 3, 11, 0, 99, 30, 40, 50]
    const noun = 1
    const verb = 12
    expect(initialiseMemory(opcode, noun, verb)).toEqual([1, 1, 12, 3, 2, 3, 11, 0, 99, 30, 40, 50])
  })
})

describe('runOpcode', () => {
  test('it runs the opcode as described in example', async () => {
    const opcode = [
      1, 9, 10, 3,
      2, 3, 11, 0,
      99,
      30, 40, 50]
    const { finalOpcode } = await runOpcode(opcode)
    expect(finalOpcode).toEqual([
      3500, 9, 10, 70,
      2, 3, 11, 0,
      99,
      30, 40, 50
    ])
  })

  test('example 1', async () => {
    const opcode = [1, 0, 0, 0, 99]
    const { finalOpcode } = await runOpcode(opcode)
    expect(finalOpcode).toEqual([2, 0, 0, 0, 99])
  })

  test('example 2', async () => {
    const opcode = [1, 0, 0, 0, 99]
    const { finalOpcode } = await runOpcode(opcode)
    expect(finalOpcode).toEqual([2, 0, 0, 0, 99])
  })

  test('example 3', async () => {
    const opcode = [2, 4, 4, 5, 99, 0]
    const { finalOpcode } = await runOpcode(opcode)
    expect(finalOpcode).toEqual([2, 4, 4, 5, 99, 9801])
  })

  test('example 4', async () => {
    const opcode = [1, 1, 1, 4, 99, 5, 6, 0, 99]
    const { finalOpcode } = await runOpcode(opcode)
    expect(finalOpcode).toEqual([30, 1, 1, 4, 2, 5, 6, 0, 99])
  })

  test('5.2 example 1 - return 0 as 1 is not equal to 8', async () => {
    const opcode = [3, 9, 8, 9, 10, 9, 4, 9, 99, -1, 8]
    const inputs = [1]
    const { outputs } = await runOpcode(opcode, inputs)
    expect(outputs).toEqual([0, 'EXIT'])
  })

  test('5.2 example 1 - return 1 as 8 is equal to 8', async () => {
    const opcode = [3, 9, 8, 9, 10, 9, 4, 9, 99, -1, 8]
    const inputs = [8]
    const { outputs } = await runOpcode(opcode, inputs)
    expect(outputs).toEqual([1, 'EXIT'])
  })

  test('5.2 example 2 - return 1 as 7 is less than 8', async () => {
    const opcode = [3, 9, 7, 9, 10, 9, 4, 9, 99, -1, 8]
    const inputs = [7]
    const { outputs } = await runOpcode(opcode, inputs)
    expect(outputs).toEqual([1, 'EXIT'])
  })

  test('5.2 example 2 - return 0 as 9 is not less than 8', async () => {
    const opcode = [3, 9, 7, 9, 10, 9, 4, 9, 99, -1, 8]
    const inputs = [9]
    const { outputs } = await runOpcode(opcode, inputs)
    expect(outputs).toEqual([0, 'EXIT'])
  })

  test('5.2 example 2 - return 0 as 8 is not less than 8', async () => {
    const opcode = [3, 9, 7, 9, 10, 9, 4, 9, 99, -1, 8]
    const inputs = [8]
    const { outputs } = await runOpcode(opcode, inputs)
    expect(outputs).toEqual([0, 'EXIT'])
  })
})
