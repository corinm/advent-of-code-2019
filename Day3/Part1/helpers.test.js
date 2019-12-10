const { findClosestCrossToCentre, findDistanceForClosestCrossGivenWires } = require('./helpers')

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
