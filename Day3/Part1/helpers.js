const { findWhereWiresCross } = require('../common')

const positive = num => Math.abs(num)

const sum = (num1, num2) => positive(num1) + positive(num2)

exports.findClosestCrossToCentre = (crosses) => {
  let closestCross

  crosses
    .map(([x, y]) => ({ x, y }))
    .filter(cross => cross.x !== 0 || cross.y !== 0)
    .map(({ x, y }) => ({ x, y, distance: sum(x, y) }))
    .forEach((cross, i) => {
      if (i === 0) {
        closestCross = { ...cross }
      } else if (cross.distance < closestCross.distance) {
        closestCross = { ...cross }
      }
    })

  return [closestCross.x, closestCross.y]
}

exports.findDistanceForClosestCrossGivenWires = (wire1, wire2) => {
  const crosses = findWhereWiresCross(wire1, wire2)
  const closestCross = this.findClosestCrossToCentre(crosses)
  return closestCross[0] + closestCross[1]
}
