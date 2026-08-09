import { describe, it, expect } from 'vitest'
import { calculateSubtotal, calculateTotal } from './cartCalculations'

describe('cartCalculations', () => {
  const mockCart = [
    { id: '1', name: 'Mouse', price: 25.5, cartQuantity: 2 }, // 51.00
    { id: '2', name: 'Teclado', price: 60, cartQuantity: 1 }, // 60.00
  ]

  it('calcula correctamente el subtotal', () => { 
    const subtotal = calculateSubtotal(mockCart)
    expect(subtotal).toBe(111) // 51+ 60
  })

  it('calcula correctamente el total incluyendo IGV', () => {
    const total = calculateTotal(mockCart)
    // 111 + 18% de 111 = 111 + 19.98 = 130.98
    expect(total).toBeCloseTo(130.98, 2)
  })


  it('el subtotal de un carrito vacío es 0', () => {
    expect(calculateSubtotal([])).toBe(0)
  })
})

// toBeCloseTo se usa en vez de toBe para números decimales, porque las operaciones con float en JavaScript a veces tienen pequeñísimos errores de redondeo (ej: 0.1 + 0.2 no da exactamente 0.3//
