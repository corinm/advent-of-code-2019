const { padZeroes } = require('./helpers')

describe('padZeroes', () => {
  test('given number 1011 returns "01011"', () => {
    expect(padZeroes(1011)).toEqual('01011')
  })

  test('given number 1 returns "00001"', () => {
    expect(padZeroes(1)).toEqual('00001')
  })
})
