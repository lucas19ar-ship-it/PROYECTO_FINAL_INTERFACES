// src/utils/users.test.js
import { describe, it, expect, beforeEach } from 'vitest'
import { findUser, updateUser, resetPassword, getUsers } from './users'

describe('users - bloqueo de cuenta', () => {
  beforeEach(() => {
    // Limpiamos localStorage antes de cada test para partir de cero
    localStorage.clear()
  })

  it('crea los usuarios por defecto la primera vez', () => {
    const users = getUsers()
    expect(users).toHaveLength(2)
    expect(users.some(u => u.username === 'admin')).toBe(true)
    expect(users.some(u => u.username === 'cliente')).toBe(true)
  })

  it('bloquea la cuenta al llegar a 3 intentos fallidos', () => {
    // Simulamos 3 intentos fallidos manualmente
    updateUser('admin', { failedAttempts: 1 })
    updateUser('admin', { failedAttempts: 2 })
    updateUser('admin', { failedAttempts: 3, blocked: true })

    const admin = findUser('admin')
    expect(admin.failedAttempts).toBe(3)
    expect(admin.blocked).toBe(true)
  })

  it('el bloqueo es independiente por usuario', () => {
    updateUser('admin', { failedAttempts: 3, blocked: true })

    const admin = findUser('admin')
    const cliente = findUser('cliente')

    expect(admin.blocked).toBe(true)
    expect(cliente.blocked).toBe(false)
  })
})

describe('users - restablecimiento de contraseña', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('restablece la contraseña y desbloquea la cuenta', () => {
    // Primero bloqueamos la cuenta
    updateUser('admin', { failedAttempts: 3, blocked: true })
    expect(findUser('admin').blocked).toBe(true)

    // Restablecemos
    resetPassword('admin', 'nuevaClave123')

    const admin = findUser('admin')
    expect(admin.password).toBe('nuevaClave123')
    expect(admin.blocked).toBe(false)
    expect(admin.failedAttempts).toBe(0)
  })

  it('devuelve null si el usuario no existe', () => {
    const result = resetPassword('usuarioInexistente', 'clave12345')
    expect(result).toBeNull()
  })
})