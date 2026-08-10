// src/utils/orders.js

const ORDERS_KEY = 'techstore-orders'

export function getOrders() {
  try {
    const stored = localStorage.getItem(ORDERS_KEY)
    return stored ? JSON.parse(stored) : []
  } catch (error) {
    console.error('Error leyendo pedidos:', error)
    return []
  }
}

export function saveOrder(order) {
  try {
    const orders = getOrders()
    const updated = [...orders, order]
    localStorage.setItem(ORDERS_KEY, JSON.stringify(updated))
    return updated
  } catch (error) {
    console.error('Error guardando pedido:', error)
    return getOrders()
  }
}