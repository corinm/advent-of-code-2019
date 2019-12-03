// Specifically, to find the fuel required for a module, take its mass, divide by three, round down, and subtract 2
exports.calculateFuelPerModule = mass => Math.floor(mass / 3) - 2

exports.calculateTotalFuel = modules => modules.map(this.calculateFuelPerModule).reduce((acc, curr) => acc + curr)
