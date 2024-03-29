const { solve, findDistanceToCross } = require('./helpers')
const { generateWire, serialise } = require('../common')

describe('solve', () => {
  it('should correctly answer example 1', () => {
    const wire1 = 'R8,U5,L5,D3'
    const wire2 = 'U7,R6,D4,L4'
    expect(solve(wire1, wire2)).toEqual(30)
  })

  it('should correctly answer example 2', () => {
    const wire1 = 'R75,D30,R83,U83,L12,D49,R71,U7,L72'
    const wire2 = 'U62,R66,U55,R34,D71,R55,D58,R83'
    expect(solve(wire1, wire2)).toEqual(610)
  })

  it('should correctly answer example 3', () => {
    const wire1 = 'R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51'
    const wire2 = 'U98,R91,D20,R16,D67,R40,U7,R15,U6,R7'
    expect(solve(wire1, wire2)).toEqual(410)
  })
})

describe('findDistanceToCross', () => {
  it('should return 20 for example 1 wire 1', () => {
    const cross = '3,3'
    const wire = generateWire('R8,U5,L5,D3').map(serialise)
    expect(findDistanceToCross(cross, wire)).toEqual(20)
  })

  it('should return 20 for example 1 wire 2', () => {
    const cross = '3,3'
    const wire = generateWire('U7,R6,D4,L4').map(serialise)
    expect(findDistanceToCross(cross, wire)).toEqual(20)
  })
})
