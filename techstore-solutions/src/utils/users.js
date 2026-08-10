// src/utils/users.js

const USERS_KEY = 'techstore-users'

// Usuarios predefinidos (solo se usan la primera vez, si no hay nada en localStorage)
const DEFAULT_USERS = [
  { username: 'admin', password: 'admin123', role: 'admin', failedAttempts: 0, blocked: false },
  { username: 'cliente', password: 'cliente123', role: 'cliente', failedAttempts: 0, blocked: false },
]

export function getUsers() {
  try {
    const stored = localStorage.getItem(USERS_KEY)
    if (stored) return JSON.parse(stored)
    // Primera vez: guardamos los usuarios por defecto
    localStorage.setItem(USERS_KEY, JSON.stringify(DEFAULT_USERS))
    return DEFAULT_USERS
  } catch (error) {
    console.error('Error leyendo usuarios:', error)
    return DEFAULT_USERS
  }
}

export function saveUsers(users) {
  try {
    localStorage.setItem(USERS_KEY, JSON.stringify(users))
  } catch (error) {
    console.error('Error guardando usuarios:', error)
  }
}

export function findUser(username) {
  const users = getUsers()
  return users.find(u => u.username === username)
}

export function updateUser(username, changes) {
  const users = getUsers()
  const updated = users.map(u =>
    u.username === username ? { ...u, ...changes } : u
  )
  saveUsers(updated)
  return updated.find(u => u.username === username)
}


// ¿Por qué separamos esto en utils/users.js y no lo metemos directo en el hook? Porque son funciones puras de acceso a datos (leer/escribir), fáciles de testear en la Fase 15 sin necesidad de renderizar componentes.//