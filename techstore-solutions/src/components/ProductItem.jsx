function ProductItem({ product, onAddToCart }) {
    return (
        <div className ="product-item">
            <div className="product-info">
                <h3>{product.name}</h3>
                <p>Precio: S/ {product.price.toFixed(2)}</p>
                <p>Cantidad disponible: {product.quantity}</p>
            </div>
            <button onClick={() => onAddToCart(product)}>
                Agregar al carrito
            </button>
        </div>
    )
}

export default ProductItem
//ProductItem no sabe nada de cómo funciona el carrito. Solo recibe una función onAddToCart por props y la ejecuta con el producto cuando se hace click. Esto es "comunicación hijo → padre mediante props": el hijo no maneja el estado, solo avisa. //