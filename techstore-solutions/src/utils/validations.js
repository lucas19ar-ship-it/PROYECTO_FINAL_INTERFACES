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
