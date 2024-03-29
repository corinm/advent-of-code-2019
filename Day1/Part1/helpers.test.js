const { calculateFuelPerModule, calculateTotalFuel } = require('./helpers')

describe('calculateFuelPerModule', () => {
  test('given 12, return 2', () => {
    expect(calculateFuelPerModule(12)).toEqual(2)
  })

  test('given 14, return 2', () => {
    expect(calculateFuelPerModule(14)).toEqual(2)
  })

  test('given 1969, return 654', () => {
    expect(calculateFuelPerModule(1969)).toEqual(654)
  })

  test('given 100756, return 33583', () => {
    expect(calculateFuelPerModule(100756)).toEqual(33583)
  })
})

describe('calculateTotalFuel', () => {
  test('given 1 module with a mass of 12, return 2', () => {
    const modules = [12]
    expect(calculateTotalFuel(modules)).toEqual(2)
  })

  test('given 2 modules with a masses of 12 and 14, return 4', () => {
    const modules = [12, 14]
    expect(calculateTotalFuel(modules)).toEqual(4)
  })

  test('given 3 modules with a masses of 12, 14 and 1969, return 658', () => {
    const modules = [12, 14, 1969]
    expect(calculateTotalFuel(modules)).toEqual(658)
  })
})
