const { generateWire, findWhereWiresCross, serialise } = require('../common')

const remove00 = item => item !== '0,0'

exports.findDistanceToCross = (cross, wireAsSerialisedSegments) => {
  return wireAsSerialisedSegments.indexOf(cross)
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
  const segments1 = generateWire(wire1).map(serialise)
  const segments2 = generateWire(wire2).map(serialise)
  const crosses = findWhereWiresCross(wire1, wire2).filter(remove00).map(serialise)

  return crosses
    .map(cross => sumDistances(cross, segments1, segments2))
    .reduce(findSmallest)
}
