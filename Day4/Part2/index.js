const { countValidPasswordsInRange } = require('../Part1/helpers')
const { isValid } = require('./helpers')

const numberOfValidPasswords = countValidPasswordsInRange('134792', '675810', isValid)

console.log(numberOfValidPasswords)
