const modules = require('./spacecraft-modules')
const { calculateTotalFuel } = require('./helpers')

const fuelNeeded = calculateTotalFuel(modules)

console.log(fuelNeeded)
