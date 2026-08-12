export const IGV_RATE = 0.18

export function calculateSubtotal(cart) {
    return cart.reduce((acc, item) => acc + item.price * item.cartQuantity, 0)
}

export function calculateTotal(cart) {
    const subtotal = calculateSubtotal(cart)
    const igv = subtotal * IGV_RATE
    return subtotal + igv
}

// funcion agregar pedido //
export function buildOrder(cart, username) {
    const subtotal = calculateSubtotal(cart)
    const igv = subtotal * IGV_RATE
    const total = subtotal + igv

    return {
        id: crypto.randomUUID(),
        username, 
        items: cart,
        subtotal,
        igv,
        total,
        date: new Date().toISOString(),
    }
}