const { countValidPasswordsInRange, isValid, isSixDigitNumber, containsTwoAdjacentSameDigits, digitsNeverDecrease } = require('./helpers')

describe('countValidPasswordsInRange', () => {
  test('111111 and 111116 returns 6', () => {
    expect(countValidPasswordsInRange('111111', '111116')).toEqual(6)
  })
})

describe('isValid', () => {
  test('111111 returns true', () => {
    expect(isValid('111111')).toBe(true)
  })

  test('223450 returns false', () => {
    expect(isValid('223450')).toBe(false)
  })

  test('123789 returns false', () => {
    expect(isValid('123789')).toBe(false)
  })
})

describe('isSixDigitNumber', () => {
  test('111111 returns true', () => {
    expect(isSixDigitNumber('111111')).toBe(true)
  })

  test('11111 returns false', () => {
    expect(isSixDigitNumber('11111')).toBe(false)
  })

  test('1111111 returns false', () => {
    expect(isSixDigitNumber('1111111')).toBe(false)
  })
})

describe('containsTwoAdjacentSameDigits', () => {
  test('122345 returns true', () => {
    expect(containsTwoAdjacentSameDigits('122345')).toBe(true)
  })

  test('123456 returns false', () => {
    expect(containsTwoAdjacentSameDigits('123456')).toBe(false)
  })
})

describe('digitsNeverDecrease', () => {
  test('111123 returns true', () => {
    expect(digitsNeverDecrease('111123')).toBe(true)
  })

  test('135679 returns true', () => {
    expect(digitsNeverDecrease('135679')).toBe(true)
  })

  test('111111 returns true', () => {
    expect(digitsNeverDecrease('111111')).toBe(true)
  })

  test('223450 returns false', () => {
    expect(digitsNeverDecrease('223450')).toBe(false)
  })
})
