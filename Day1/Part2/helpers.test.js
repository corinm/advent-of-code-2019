const { calculateFuelPerModuleRecursive, calculateTotalFuelRecursive } = require('./helpers')

describe('calculateFuelPerModuleRecursive', () => {
  test('given 14, return 2', () => {
    expect(calculateFuelPerModuleRecursive(14)).toEqual(2)
  })

  test('given 1969, return 966', () => {
    expect(calculateFuelPerModuleRecursive(1969)).toEqual(966)
  })

  test('given 100756, return 50346', () => {
    expect(calculateFuelPerModuleRecursive(100756)).toEqual(50346)
  })
})

describe('calculateTotalFuelRecursive', () => {
  test('given 1 module with a mass of 12, return 2', () => {
    const modules = [12]
    expect(calculateTotalFuelRecursive(modules)).toEqual(2)
  })

  test('given 2 modules with a masses of 12 and 14, return 4', () => {
    const modules = [12, 14]
    expect(calculateTotalFuelRecursive(modules)).toEqual(4)
  })

  test('given 3 modules with a masses of 12, 14 and 1969, return 970', () => {
    const modules = [12, 14, 1969]
    expect(calculateTotalFuelRecursive(modules)).toEqual(970)
  })
})
