const { findDistanceForClosestCrossGivenWires } = require('./helpers')
const wires = require('./wires.json')

const distance = findDistanceForClosestCrossGivenWires(wires.wire1, wires.wire2)
console.log(distance)
