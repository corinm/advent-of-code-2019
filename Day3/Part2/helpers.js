const { generateWire, findWhereWiresCross, serialise } = require('../common')

const remove00 = item => item !== '0,0'

exports.findDistanceToCross = (cross, wire) => {
  const segments = generateWire(wire).map(serialise)
  return segments.indexOf(cross)
}

const sumDistances = (cross, wire1, wire2) => this.findDistanceToCross(cross, wire1) + this.findDistanceToCross(cross, wire2)

const findSmallest = (acc, distance) => {
  if (!acc) {
    return distance
  } else if (distance < acc) {
    return distance
  } else {
    return acc
  }
}

exports.solve = (wire1, wire2) => {
  const crosses = findWhereWiresCross(wire1, wire2).map(serialise).filter(remove00)

  return crosses
    .map(cross => sumDistances(cross, wire1, wire2))
    .reduce(findSmallest)
}
