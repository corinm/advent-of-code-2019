const { add, multiply } = require('./operations')

describe('add', () => {
  describe('position mode', () => {
    test('it should add', () => {
      const opcode = [
        1, 9, 10, 3,
        2, 3, 11, 0,
        99,
        30, 40, 50]
      expect(add({ opcode, pointer: 0, modeParam1: 0, modeParam2: 0 })).toEqual([
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
      add({ opcode, pointer: 0, modeParam1: 0, modeParam2: 0 })
      expect(opcode).toEqual([
        1, 9, 10, 3,
        2, 3, 11, 0,
        99,
        30, 40, 50])
    })
  })

  xdescribe('immediate mode', () => {
    test('correctly adds', () => {
    })
  })
})

describe('multiply', () => {
  describe('position mode', () => {
    test('correctly multiplies (70 in pos 3 * 50 in pos 11 = 3500 in pos 0)', () => {
      const opcode = [
        1, 9, 10, 70,
        2, 3, 11, 0,
        99,
        30, 40, 50]
      expect(multiply({ opcode, pointer: 4, modeParam1: 0, modeParam2: 0 })).toEqual([
        3500, 9, 10, 70,
        2, 3, 11, 0,
        99,
        30, 40, 50
      ])
    })
  })

  describe('immediate mode', () => {
    test('correctly multiplies (4 * 3 = 12 in pos 4)', () => {
      const opcode = [1102,4,3,4,33]
      expect(multiply({ opcode, pointer: 0, modeParam1: 1, modeParam2: 1 })).toEqual([1102,4,3,4,12])
    })

    test('correctly multiplies (4 * 3 = 12 in pos 4)', () => {
      const opcode = [1002,4,3,4,33]
      expect(multiply({ opcode, pointer: 0, modeParam1: 0, modeParam2: 1 })).toEqual([1002,4,3,4,99])
    })
  })
})
