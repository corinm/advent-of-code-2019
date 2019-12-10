const { generateWire, findWhereWiresCross } = require('.')

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
