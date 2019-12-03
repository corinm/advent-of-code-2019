const { calculateTotalFuelRecursive } = require('./helpers')

const modules = require('../Day1-Part1/spacecraft-modules')

const fuelNeeded = calculateTotalFuelRecursive(modules)

console.log(fuelNeeded)
