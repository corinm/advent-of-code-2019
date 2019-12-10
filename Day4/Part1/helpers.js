exports.countValidPasswordsInRange = (str1, str2) => {
  const min = parseInt(str1)
  const max = parseInt(str2)

  let validCount = 0

  console.log(min, max)

  for (let i = min; i <= max; i++) {
    if (this.isValid(i.toString())) {
      validCount += 1
    }
  }

  return validCount
}

exports.isValid = str => {
  return this.isSixDigitNumber(str) && this.containsTwoAdjacentSameDigits(str) && this.digitsNeverDecrease(str)
}

exports.isSixDigitNumber = str => {
  const isNumber = !Number.isNaN(Number(str))
  return isNumber && str.length === 6
}

exports.containsTwoAdjacentSameDigits = str => {
  const d1 = str[0]
  const d2 = str[1]
  const d3 = str[2]
  const d4 = str[3]
  const d5 = str[4]
  const d6 = str[5]

  return d1 === d2 || d2 === d3 || d3 === d4 || d4 === d5 || d5 === d6
}

exports.digitsNeverDecrease = str => {
  const d1 = parseInt(str[0])
  const d2 = parseInt(str[1])
  const d3 = parseInt(str[2])
  const d4 = parseInt(str[3])
  const d5 = parseInt(str[4])
  const d6 = parseInt(str[5])

  return d1 <= d2 && d2 <= d3 && d3 <= d4 && d4 <= d5 && d5 <= d6
}
