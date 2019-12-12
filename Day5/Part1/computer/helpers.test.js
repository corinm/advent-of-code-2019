const { padZeroes, parseInstruction } = require('./helpers')

describe('padZeroes', () => {
  test('given number 1011 returns "01011"', () => {
    expect(padZeroes(1011)).toEqual('01011')
  })

  test('given number 1 returns "00001"', () => {
    expect(padZeroes(1)).toEqual('00001')
  })
})

describe('parseInstruction', () => {
  test('correctly parses 1011', () => {
    expect(parseInstruction(1011)).toEqual({
      operation: 11,
      modeParam1: 0,
      modeParam2: 1,
      modeParam3: 0
    })
  })

  test('correctly parses 1', () => {
    expect(parseInstruction(1)).toEqual({
      operation: 1,
      modeParam1: 0,
      modeParam2: 0,
      modeParam3: 0
    })
  })
})
