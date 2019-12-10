const createSegmentsRight = (distance, lastSegment) => {
  return Array(distance).fill(0).map((_, j) => {
    return [lastSegment[0] + j + 1, lastSegment[1]]
  })
}

const createSegmentsUp = (distance, lastSegment) => {
  return Array(distance).fill(0).map((_, j) => {
    return [lastSegment[0], lastSegment[1] + j + 1]
  })
}

const createSegmentsLeft = (distance, lastSegment) => {
  return Array(distance).fill(0).map((_, j) => {
    return [lastSegment[0] - j - 1, lastSegment[1]]
  })
}

const createSegmentsDown = (distance, lastSegment) => {
  return Array(distance).fill(0).map((_, j) => {
    return [lastSegment[0], lastSegment[1] - j - 1]
  })
}

exports.generateWire = wire => {
  let finalSegments = [[0, 0]] // Initialise with centre

  wire.split(',').forEach(section => {
    const direction = section.substring(0, 1)
    const distance = parseInt(section.substring(1, section.length))
    const lastSegment = finalSegments[finalSegments.length - 1]

    if (direction === 'R') {
      finalSegments = [...finalSegments, ...createSegmentsRight(distance, lastSegment)]
    } else if (direction === 'U') {
      finalSegments = [...finalSegments, ...createSegmentsUp(distance, lastSegment)]
    } else if (direction === 'L') {
      finalSegments = [...finalSegments, ...createSegmentsLeft(distance, lastSegment)]
    } else if (direction === 'D') {
      finalSegments = [...finalSegments, ...createSegmentsDown(distance, lastSegment)]
    } else {
      throw new Error(`Unexpected direction: ${direction}`)
    }
  })

  return finalSegments
}

const serialise = item => `${item[0]},${item[1]}`

const objectFromArray = array => {
  const obj = {}
  array.map(item => {
    obj[serialise(item)] = true
  })
  return obj
}

exports.findWhereWiresCross = (wire1, wire2) => {
  console.log('Generating wire 1')
  const segments1 = this.generateWire(wire1)
  console.log('Generating wire 2')
  const segments2 = this.generateWire(wire2)

  console.log(`Finding where wires cross: ${segments1.length}x${segments2.length}`)
  const presentInBoth = []

  const segments1Obj = objectFromArray(segments1)

  segments2.forEach(segment => {
    if (segments1Obj[serialise(segment)]) {
      presentInBoth.push(segment)
    }
  })

  // O(n^2)
  // segments1.forEach(segment1 => {
  //   segments2.forEach(segment2 => {
  //     if (segment1[0] === segment2[0] && segment1[1] === segment2[1]) {
  //       presentInBoth.push(segment1)
  //     }
  //   })
  // })

  console.log('Finished finding where wires cross')

  return presentInBoth
}

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
  const crosses = this.findWhereWiresCross(wire1, wire2)
  const closestCross = this.findClosestCrossToCentre(crosses)
  return closestCross[0] + closestCross[1]
}
