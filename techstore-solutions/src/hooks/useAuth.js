// src/hooks/useAuth.js
import { useState } from 'react'
import { findUser, updateUser } from '../utils/users'
import useLocalStorage from './useLocalStorage'

const MAX_ATTEMPTS = 3

function useAuth() {
  // La sesión activa también persiste, así el usuario no pierde la sesión al recargar
  const [session, setSession] = useLocalStorage('techstore-session', null)
  const [loginError, setLoginError] = useState('')

  function login(username, password) {
    setLoginError('')

    const user = findUser(username)

    if (!user) {
      setLoginError('Usuario no encontrado')
      return false
    }

    if (user.blocked) {
      setLoginError('Cuenta bloqueada por seguridad')
      return false
    }

    if (user.password !== password) {
      const newAttempts = user.failedAttempts + 1
      const shouldBlock = newAttempts >= MAX_ATTEMPTS

      updateUser(username, {
        failedAttempts: newAttempts,
        blocked: shouldBlock,
      })

      setLoginError(
        shouldBlock
          ? 'Cuenta bloqueada por seguridad'
          : `Contraseña incorrecta. Intento ${newAttempts} de ${MAX_ATTEMPTS}`
      )
      return false
    }

    // Login correcto: reiniciamos intentos fallidos
    updateUser(username, { failedAttempts: 0 })
    setSession({ username: user.username, role: user.role })
    return true
  }

  function logout() {
    setSession(null)
  }

  return {
    session,
    isAuthenticated: !!session,
    loginError,
    login,
    logout,
  }
}

export default useAuth