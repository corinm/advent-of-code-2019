const { moveRight, moveLeft, moveUp, createGrid } = require('./helpers')

describe('moveRight', () => {
  test('move 1', () => {
    const grid = [[2]]
    moveRight(grid, 0, 0, 1)
    expect(grid).toEqual([[2, 1]])
  })

  test('move 8', () => {
    const grid = [[2]]
    moveRight(grid, 0, 0, 8)
    expect(grid).toEqual([[2, 1, 1, 1, 1, 1, 1, 1, 1]])
  })
})

describe('moveLeft', () => {
  test('move 1', () => {
    const grid = [[2]]
    moveLeft(grid, 0, 0, 1)
    expect(grid).toEqual([[1, 2]])
  })

  test('move 8', () => {
    const grid = [[2]]
    moveLeft(grid, 0, 0, 8)
    expect(grid).toEqual([[1, 1, 1, 1, 1, 1, 1, 1, 2]])
  })

  test('move 1 when x not 0', () => {
    const grid = [[0, 1]]
    moveLeft(grid, 1, 0, 1)
    expect(grid).toEqual([[1, 1]])
  })

  test('move 1 when two rows present', () => {
    const grid = [[0], [2]]
    moveLeft(grid, 0, 1, 1)
    expect(grid).toEqual([[0, 0], [1, 2]])
  })
})

describe('moveUp', () => {
  test('move 1', () => {
    const grid = [[2]]
    moveUp(grid, 0, 0, 1)
    expect(grid).toHaveLength(2)
    expect(grid[0]).toEqual([1])
    expect(grid[1]).toEqual([2])
  })

  xtest('move 8', () => {
    const grid = [[2]]
    moveUp(grid, 0, 0, 8)
    expect(grid).toHaveLength(9)
    expect(grid[0]).toEqual([1])
    expect(grid[1]).toEqual([1])
    expect(grid[2]).toEqual([1])
    expect(grid[3]).toEqual([1])
    expect(grid[4]).toEqual([1])
    expect(grid[5]).toEqual([1])
    expect(grid[6]).toEqual([1])
    expect(grid[7]).toEqual([1])
    expect(grid[8]).toEqual([2])
  })

  xtest('move 1 when x not 0', () => {
    const grid = [[0], [2]]
    moveUp(grid, 0, 1, 1)
    expect(grid).toHaveLength(2)
    expect(grid[0]).toEqual([1])
    expect(grid[1]).toEqual([2])
  })
})

xdescribe('createGrid', () => {
  test('given example 1 wire 1 should return an appropriate grid', () => {
    const wire = 'R8,U5,L5,D3'
    expect(createGrid(wire)).toEqual([
      [0, 0, 0, 0, 1, 1, 1, 1, 1],
      [0, 0, 0, 0, 1, 0, 0, 0, 1],
      [0, 0, 0, 0, 1, 0, 0, 0, 1],
      [0, 0, 0, 0, 1, 0, 0, 0, 1],
      [0, 0, 0, 0, 0, 0, 0, 0, 1],
      [2, 1, 1, 1, 1, 1, 1, 1, 1]
    ])
  })
})
