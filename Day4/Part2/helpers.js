const { isSixDigitNumber, containsTwoAdjacentSameDigits, digitsNeverDecrease } = require('../Part1/helpers')

const convertToNumber = num => parseInt(num)

exports.twoAdjacentDigitsNotPartOfLargerGroupOfMatchingDigits = str => {
  const adjacentNumbers = {}

  str.split('').map(convertToNumber).forEach((digit, i, array) => {
    if (i !== 0) {
      const digitStr = digit.toString()

      if (digit === array[i - 1]) {
        if (adjacentNumbers[digitStr] === undefined) {
          adjacentNumbers[digitStr] = 2
        } else {
          adjacentNumbers[digitStr] = adjacentNumbers[digitStr] + 1
        }
      }
    }
  })

  const pairsCount = Object.keys(adjacentNumbers).map(key => adjacentNumbers[key]).filter(count => count === 2)
  return pairsCount.length > 0
}

exports.isValid = str => {
  return isSixDigitNumber(str) && containsTwoAdjacentSameDigits(str) && digitsNeverDecrease(str) && this.twoAdjacentDigitsNotPartOfLargerGroupOfMatchingDigits(str)
}
