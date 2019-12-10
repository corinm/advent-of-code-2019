const { generateWire, findWhereWiresCross } = require('../common')

exports.solve = (wire1, wire2) => {
  const segments1 = generateWire(wire1)
  const segments2 = generateWire(wire2)
  const crosses = findWhereWiresCross(wire1, wire2)
  // console.log(segments1, segments2, crosses)
}
