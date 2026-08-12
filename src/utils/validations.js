export const DEFAULT_PRODUCT_IMAGE =
  'https://images.unsplash.com/photo-1526738549149-8e07eca6c147?w=500&h=500&fit=crop&auto=format'

export function validateProductForm({ name, price, quantity }) {
    const errors = {}

    if (!name || name.trim() === '') {
        errors.name = 'El nombre del producto es obligatorio'
    }

    if (price === '' || isNaN(price) || Number(price) <= 0) {
        errors.price = 'El precio debe ser mayor a 0'
    }
 
    if (quantity === '' || isNaN(quantity) || Number(quantity) <= 0) {
        errors.quantity = 'La cantidad debe ser mayor a 0'
    }

    return errors
}
// es una funcion pura: recibe datos, devuelve errores. Facil de probar //


// Validacion de restablecimiento//
export function validateResetPassword({ username, newPassword, confirmPassword }) {
  const errors = {}

  if (!username || username.trim() === '') {
    errors.username = 'El usuario es obligatorio'
  }

  if (!newPassword || newPassword.length < 8) {
    errors.newPassword = 'La contraseña debe tener al menos 8 caracteres'
  }

  if (newPassword !== confirmPassword) { 
    errors.confirmPassword = 'Las contraseñas no coinciden'
  }

  return errors
}