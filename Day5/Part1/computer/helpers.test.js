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
      modeP1: 0,
      modeP2: 1,
      modeP3: 0
    })
  })
})
