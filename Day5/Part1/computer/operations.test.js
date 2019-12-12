const { add, multiply, saveToPosition, outputParameter } = require('./operations')

describe('add', () => {
  describe('position mode', () => {
    test('it should add', () => {
      const opcode = [
        1, 9, 10, 3,
        2, 3, 11, 0,
        99,
        30, 40, 50]
      expect(add(opcode, 0)).toEqual([
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
      add(opcode, 0)
      expect(opcode).toEqual([
        1, 9, 10, 3,
        2, 3, 11, 0,
        99,
        30, 40, 50])
    })
  })

  describe('immediate mode', () => {
    test('correctly adds (4 in pos 1 + 3 in pos 2 = 7 in pos 4)', () => {
      const opcode = [1101, 4, 3, 4, 33]
      expect(add(opcode, 0)).toEqual([1101, 4, 3, 4, 7])
    })

    test('correctly adds (33 in pos 4 + 3 in pos 2 = 36 in pos 4)', () => {
      const opcode = [1001, 4, 3, 4, 33]
      expect(add(opcode, 0)).toEqual([1001, 4, 3, 4, 36])
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
      expect(multiply(opcode, 4)).toEqual([
        3500, 9, 10, 70,
        2, 3, 11, 0,
        99,
        30, 40, 50
      ])
    })
  })

  describe('immediate mode', () => {
    test('correctly multiplies (4 in pos 1 * 3 in pos 2 = 12 in pos 4)', () => {
      const opcode = [1102, 4, 3, 4, 1]
      expect(multiply(opcode, 0)).toEqual([1102, 4, 3, 4, 12])
    })

    test('correctly multiplies (2 in pos 4 * 4 in pos 3 = 16 in pos 4)', () => {
      const opcode = [102, 4, 3, 4, 2]
      expect(multiply(opcode, 0)).toEqual([102, 4, 3, 4, 16])
    })
  })

  describe('saveToPosition', () => {
    describe('position mode', () => {
      test('saves a value to position given by parameter 1', () => {
        const opcode = [3, 2]
        const input = 4
        expect(saveToPosition(opcode, 0, input)).toEqual([3, 2, 4])
      })
    })
  })

  describe('outputParameter', () => {
    describe('position mode', () => {
      test('returns the value at position 2', () => {
        const opcode = [4, 2, 1]
        expect(outputParameter(opcode, 0)).toEqual(1)
      })
    })

    describe('immediate mode', () => {
      test('returns the value at parameter 1', () => {
        const opcode = [4, 1, 2]
        expect(outputParameter(opcode, 0)).toEqual(1)
      })
    })
  })
})
