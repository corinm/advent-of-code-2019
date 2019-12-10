const { generateWire, findWhereWiresCross, findClosestCrossToCentre, findDistanceForClosestCrossGivenWires } = require('./helpers')

describe('generateWire', () => {
  it('should return wire example 1', () => {
    const wire = 'R8,U5,L5,D3'
    const result = generateWire(wire)

    // ...........
    // ...........
    // ...........
    // ....+----+.
    // ....|....|.
    // ....|....|.
    // ....|....|.
    // .........|.
    // .o-------+.
    // ...........

    expect(result).toEqual([
      [0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0], [8, 0],
      [8, 1], [8, 2], [8, 3], [8, 4], [8, 5],
      [7, 5], [6, 5], [5, 5], [4, 5], [3, 5],
      [3, 4], [3, 3], [3, 2]
    ])
  })

  it('should return wire example 2', () => {
    const wire = 'U7,R6,D4,L4'
    const result = generateWire(wire)

    // ...........
    // .+-----+...
    // .|.....|...
    // .|.....|...
    // .|.....|...
    // .|.----+...
    // .|.........
    // .|.........
    // .o.........
    // ...........

    expect(result).toEqual([
      [0, 0], [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [0, 7],
      [1, 7], [2, 7], [3, 7], [4, 7], [5, 7], [6, 7],
      [6, 6], [6, 5], [6, 4], [6, 3],
      [5, 3], [4, 3], [3, 3], [2, 3]
    ])
  })
})

describe('findWhereWiresCross', () => {
  it('should return 3,3 and 6,5 for wires 1 and 2', () => {
    const wire1 = 'R8,U5,L5,D3'
    const wire2 = 'U7,R6,D4,L4'
    const whereWiresCross = findWhereWiresCross(wire1, wire2)
    expect(whereWiresCross).toEqual([[0, 0], [6, 5], [3, 3]])
  })
})

describe('findClosestCrossToCentre', () => {
  it('should return 3,3 given 0,0, 3,3 and 6,5', () => {
    const whereWiresCross = [[0, 0], [6, 5], [3, 3]]
    expect(findClosestCrossToCentre(whereWiresCross)).toEqual([3, 3])
  })

  it('should return -1,-1 given 2,2 and -1,-1', () => {
    const whereWiresCross = [[2, 2], [-1, -1]]
    expect(findClosestCrossToCentre(whereWiresCross)).toEqual([-1, -1])
  })
})

describe('findDistanceForClosestCrossGivenWires', () => {
  it('should correctly answer example 1', () => {
    const wire1 = 'R8,U5,L5,D3'
    const wire2 = 'U7,R6,D4,L4'
    expect(findDistanceForClosestCrossGivenWires(wire1, wire2)).toEqual(6)
  })

  it('should correctly answer example 2', () => {
    const wire1 = 'R75,D30,R83,U83,L12,D49,R71,U7,L72'
    const wire2 = 'U62,R66,U55,R34,D71,R55,D58,R83'
    expect(findDistanceForClosestCrossGivenWires(wire1, wire2)).toEqual(159)
  })

  it('should correctly answer example 3', () => {
    const wire1 = 'R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51'
    const wire2 = 'U98,R91,D20,R16,D67,R40,U7,R15,U6,R7'
    expect(findDistanceForClosestCrossGivenWires(wire1, wire2)).toEqual(135)
  })
})
