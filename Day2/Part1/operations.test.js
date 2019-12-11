const { add, multiply } = require('./operations')

describe('add', () => {
  test('it should add', () => {
    const opcode = [
      1, 9, 10, 3,
      2, 3, 11, 0,
      99,
      30, 40, 50]
    const result = add(opcode, 0)
    expect(result).toEqual([
      1, 9, 10, 70,
      2, 3, 11, 0,
      99,
      30, 40, 50
    ])
  })
})

describe('multiply', () => {
  test('it should multiply', () => {
    const opcode = [
      1, 9, 10, 70,
      2, 3, 11, 0,
      99,
      30, 40, 50]
    const result = multiply(opcode, 4)
    expect(result).toEqual([
      3500, 9, 10, 70,
      2, 3, 11, 0,
      99,
      30, 40, 50
    ])
  })
})
