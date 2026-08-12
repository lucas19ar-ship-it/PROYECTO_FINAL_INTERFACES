// src/components/ProductList.jsx
// Listado de productos en formato tabla/lista para el panel de administración.
import ProductItem from './ProductItem'

function ProductList({ products, isAdmin, onEditProduct, onDeleteProduct }) {
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
          isAdmin={isAdmin}
          onEdit={onEditProduct}
          onDelete={onDeleteProduct}
        />
      ))}
    </div>
  )
}

export default ProductList
