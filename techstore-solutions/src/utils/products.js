export function updateProductInList(products, updatedProduct) {
    return products.map(p => (p.id === updateProduct.id ? updatedProduct : p))
}

export function removeProductFromList(products, productId) {
    return products.filter(p => p.id !== productId)
}