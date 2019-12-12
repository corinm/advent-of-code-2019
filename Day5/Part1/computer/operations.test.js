const { add, multiply } = require('./operations')

describe('add', () => {
  test('it should add', () => {
    const opcode = [
      1, 9, 10, 3,
      2, 3, 11, 0,
      99,
      30, 40, 50]
    expect(add({ opcode, pointer: 0 })).toEqual([
      1, 9, 10, 70,
      2, 3, 11, 0,
      99,
      30, 40, 50
    ])
  })

  test('it should not mutate original opcode', () => {
    const opcode = [
      1, 9, 10, 3,
      2, 3, 11, 0,
      99,
      30, 40, 50]
    add({ opcode, pointer: 0 })
    expect(opcode).toEqual([
      1, 9, 10, 3,
      2, 3, 11, 0,
      99,
      30, 40, 50])
  })
})

describe('multiply', () => {
  test('it should multiply', () => {
    const opcode = [
      1, 9, 10, 70,
      2, 3, 11, 0,
      99,
      30, 40, 50]
    expect(multiply({ opcode, pointer: 4 })).toEqual([
      3500, 9, 10, 70,
      2, 3, 11, 0,
      99,
      30, 40, 50
    ])
  })
})
