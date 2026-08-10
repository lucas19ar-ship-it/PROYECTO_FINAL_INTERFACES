import ProductItem from "./ProductItem"

function ProductList({ products, onAddToCart, isAdmin, onEditProduct, onDeleteProduct }) {
    if (products.length === 0) {
        return <p className="empty-message">Aún no hay productos registrados.</p>

    }

    return (
        <div className="product-list">
            <h2>Productos Registrados</h2>
            {products.map(product => (
                <ProductItem
                  key={product.id}
                  product={product}
                  onAddToCart={onAddToCart}
                  isAdmin={isAdmin}
                  onEdit={onEditProduct}
                />
            ))}
        </div>
    )
}

export default ProductList