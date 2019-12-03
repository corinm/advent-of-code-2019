// Specifically, to find the fuel required for a module, take its mass, divide by three, round down, and subtract 2
exports.calculateFuelPerModule = mass => Math.floor(mass / 3) - 2

const calculateExtraFuel = mass => {
  const fuel = this.calculateFuelPerModule(mass)
  if (fuel <= 0) {
    return 0
  } else {
    return fuel + calculateExtraFuel(fuel)
  }
}

exports.calculateFuelPerModuleRecursive = mass => {
  const fuelForModule = this.calculateFuelPerModule(mass)
  const extraFuel = calculateExtraFuel(fuelForModule)
  return fuelForModule + extraFuel
}

exports.calculateTotalFuelRecursive = modules => modules.map(this.calculateFuelPerModuleRecursive).reduce((acc, curr) => acc + curr)
