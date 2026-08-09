export const IGV_RATE = 0.18

export function calculateSubtotal(cart) {
    return cart.reduce((acc, item) => acc + item.price * item.cartQuantity, 0)
}

export function calculateTotal(cart) {
    const subtotal = calculateSubtotal(cart)
    const igv = subtotal * IGV_RATE
    return subtotal + igv
}