// src/utils/permissions.test.js//
import { describe, it, expect } from 'vitest'
import { canSeeCart, canManageProducts, canManageUsers } from './permissions'

describe('permisos según rol', () => {
  it('el cliente autenticado puede ver el carrito', () => {
    expect(canSeeCart(true, 'cliente')).toBe(true)
  })

  it('el admin NO puede ver el carrito', () => {
    expect(canSeeCart(true, 'admin')).toBe(false)
  })

  it('sin autenticar, nadie puede ver el carrito', () => {
    expect(canSeeCart(false, 'cliente')).toBe(false)
    expect(canSeeCart(false, 'admin')).toBe(false)
  })

  it('solo el admin puede gestionar productos', () => {
    expect(canManageProducts(true, 'admin')).toBe(true)
    expect(canManageProducts(true, 'cliente')).toBe(false)
  })

  it('solo el admin puede gestionar usuarios', () => {
    expect(canManageUsers(true, 'admin')).toBe(true)
    expect(canManageUsers(true, 'cliente')).toBe(false)
  })

  it('sin autenticar, nadie tiene permisos de admin', () => {
    expect(canManageProducts(false, 'admin')).toBe(false)
    expect(canManageUsers(false, 'admin')).toBe(false)
  })
})