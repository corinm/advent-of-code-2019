const { twoAdjacentDigitsNotPartOfLargerGroupOfMatchingDigits, isValid } = require('./helpers')

describe('twoAdjacentDigitsNotPartOfLargerGroupOfMatchingDigits', () => {
  test('112233 returns true', () => {
    const result = twoAdjacentDigitsNotPartOfLargerGroupOfMatchingDigits('112233')
    expect(result).toBe(true)
  })

  test('111122 returns true', () => {
    const result = twoAdjacentDigitsNotPartOfLargerGroupOfMatchingDigits('111122')
    expect(result).toBe(true)
  })

  test('123444 returns false', () => {
    const result = twoAdjacentDigitsNotPartOfLargerGroupOfMatchingDigits('123444')
    expect(result).toBe(false)
  })

  test('111144 returns true', () => {
    const result = twoAdjacentDigitsNotPartOfLargerGroupOfMatchingDigits('111144')
    expect(result).toBe(true)
  })

  test('114444 returns true', () => {
    const result = twoAdjacentDigitsNotPartOfLargerGroupOfMatchingDigits('114444')
    expect(result).toBe(true)
  })
})

describe('isValid', () => {
  test('111111 now returns false', () => {
    expect(isValid('111111')).toBe(false)
  })

  test('223450 still returns false', () => {
    expect(isValid('223450')).toBe(false)
  })

  test('123789 still returns false', () => {
    expect(isValid('123789')).toBe(false)
  })

  test('114444 returns true', () => {
    expect(isValid('114444')).toBe(true)
  })
})
