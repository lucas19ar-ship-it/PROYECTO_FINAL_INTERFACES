
// src/utils/validations.test.js
import { describe, it, expect } from 'vitest'
import { validateResetPassword } from './validations'

describe('validateResetPassword', () => {
  it('marca error si la contraseña tiene menos de 8 caracteres', () => {
    const errors = validateResetPassword({
      username: 'admin',
      newPassword: '123',
      confirmPassword: '123',
    })
    expect(errors.newPassword).toBeDefined()
  })

  it('marca error si las contraseñas no coinciden', () => {
    const errors = validateResetPassword({
      username: 'admin',
      newPassword: 'clave1234',
      confirmPassword: 'clave5678',
    })
    expect(errors.confirmPassword).toBeDefined()
  })

  it('no marca errores cuando todo es válido', () => {
    const errors = validateResetPassword({
      username: 'admin',
      newPassword: 'clave1234',
      confirmPassword: 'clave1234',
    })
    expect(Object.keys(errors)).toHaveLength(0)
  })

  it('marca error si el usuario está vacío', () => {
    const errors = validateResetPassword({
      username: '',
      newPassword: 'clave1234',
      confirmPassword: 'clave1234',
    })
    expect(errors.username).toBeDefined()
  })
})