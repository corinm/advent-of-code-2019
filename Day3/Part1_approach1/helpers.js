exports.moveRight = (grid, x, y, steps) => {
  Array(steps).fill(0).forEach((_, i) => {
    const indexOfStep = i + 1
    if (indexOfStep !== 0) {
      grid[y][x + indexOfStep] = 1
    }
  })
}

const cellAlreadyExistsLeft = (x, indexOfStep) => x + indexOfStep >= 0

exports.moveLeft = (grid, x, y, steps) => {
  Array(steps).fill(0).forEach((_, i) => {
    const indexOfStep = -1 - i

    if (cellAlreadyExistsLeft(x, indexOfStep)) {
      grid[y][x + indexOfStep] = 1
    } else {
      grid[y].unshift(1)
      grid.forEach((_, j) => {
        if (j !== y) {
          grid[j].unshift(0)
        }
      })
    }
  })
}

const cellAlreadyExistsUp = (y, indexOfStep) => {
  console.log(y, indexOfStep)
  return y + indexOfStep >= 0
}

exports.moveUp = (grid, x, y, steps) => {
  Array(steps).fill(0).forEach((_, i) => {
    const indexOfStep = y - i

    if (cellAlreadyExistsUp(y, indexOfStep)) {
      grid[y + indexOfStep] = 1
    } else {
      grid.unshift([1])
    }
  })
}

exports.createGrid = wire => {
  const grid = [[2]]
  wire.split(',').forEach(segment => {
    // move(grid, segment)
  })
  return grid
}
