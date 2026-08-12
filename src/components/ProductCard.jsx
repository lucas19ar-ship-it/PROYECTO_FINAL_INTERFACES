// src/components/ProductCard.jsx
// Tarjeta de producto para el catálogo del cliente.
// Al hacer click (en la imagen o en el botón) se abre el modal para agregarlo al carrito.
import { CartIcon } from './icons'

function ProductCard({ product, onOpen }) {
  const outOfStock = product.quantity <= 0

  return (
    <div className={`product-card ${outOfStock ? 'product-card-disabled' : ''}`}>
      <button
        type="button"
        className="product-card-image-btn"
        onClick={() => !outOfStock && onOpen(product)}
        aria-label={`Ver ${product.name}`}
      >
        <img src={product.image} alt={product.name} loading="lazy" />
        {outOfStock && <span className="badge-outofstock">Agotado</span>}
      </button>

      <div className="product-card-body">
        <span className="product-card-category">{product.category}</span>
        <h3 className="product-card-name">{product.name}</h3>
        <p className="product-card-price">S/ {product.price.toFixed(2)}</p>
        <p className="product-card-stock">Disponible: {product.quantity} unids.</p>

        <button
          type="button"
          className="btn-add-cart"
          disabled={outOfStock}
          onClick={() => onOpen(product)}
        >
          <CartIcon size={17} />
          Añadir al Carrito
        </button>
      </div>
    </div>
  )
}

export default ProductCard
