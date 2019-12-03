const { add, multiply, run } = require('./helpers')

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

describe('run', () => {
  test('it runs the opcode as described in example', () => {
    const opcode = [
      1, 9, 10, 3,
      2, 3, 11, 0,
      99,
      30, 40, 50]
    const result = run(opcode)
    expect(result).toEqual([
      3500, 9, 10, 70,
      2, 3, 11, 0,
      99,
      30, 40, 50
    ])
  })

  test('example 1', () => {
    const opcode = [1, 0, 0, 0, 99]
    const result = run(opcode)
    expect(result).toEqual([2, 0, 0, 0, 99])
  })

  test('example 2', () => {
    const opcode = [1, 0, 0, 0, 99]
    const result = run(opcode)
    expect(result).toEqual([2, 0, 0, 0, 99])
  })

  test('example 3', () => {
    const opcode = [2, 4, 4, 5, 99, 0]
    const result = run(opcode)
    expect(result).toEqual([2, 4, 4, 5, 99, 9801])
  })

  test('example 4', () => {
    const opcode = [1, 1, 1, 4, 99, 5, 6, 0, 99]
    const result = run(opcode)
    expect(result).toEqual([30, 1, 1, 4, 2, 5, 6, 0, 99])
  })
})
