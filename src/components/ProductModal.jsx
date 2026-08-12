// src/components/ProductModal.jsx
// Modal centrado que aparece al hacer click en un producto del catálogo.
// Permite elegir cantidad y agregarlo al carrito, sin salir de la página.
import { useState } from 'react'
import { CloseIcon, PlusIcon, MinusIcon, CartIcon } from './icons'

function ProductModal({ product, onClose, onAddToCart }) {
  const [quantity, setQuantity] = useState(1)

  if (!product) return null

  const maxQuantity = product.quantity
  const subtotal = product.price * quantity

  function increase() {
    setQuantity(q => Math.min(q + 1, maxQuantity))
  }

  function decrease() {
    setQuantity(q => Math.max(q - 1, 1))
  }

  function handleAdd() {
    onAddToCart(product, quantity)
    onClose()
  }

  function handleOverlayClick(e) {
    if (e.target === e.currentTarget) onClose()
  }

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-card" role="dialog" aria-modal="true">
        <button className="modal-close" onClick={onClose} aria-label="Cerrar">
          <CloseIcon size={18} />
        </button>

        <div className="modal-image">
          <img src={product.image} alt={product.name} />
        </div>

        <div className="modal-body">
          <span className="product-card-category">{product.category}</span>
          <h2 className="modal-title">{product.name}</h2>
          <p className="modal-price">S/ {product.price.toFixed(2)}</p>
          <p className="modal-stock">Disponible: {maxQuantity} unids.</p>

          <div className="modal-quantity">
            <span>Cantidad</span>
            <div className="quantity-stepper">
              <button type="button" onClick={decrease} disabled={quantity <= 1}>
                <MinusIcon size={16} />
              </button>
              <span>{quantity}</span>
              <button type="button" onClick={increase} disabled={quantity >= maxQuantity}>
                <PlusIcon size={16} />
              </button>
            </div>
          </div>

          <div className="modal-subtotal">
            <span>Subtotal</span>
            <strong>S/ {subtotal.toFixed(2)}</strong>
          </div>

          <button type="button" className="btn-add-cart btn-add-cart-modal" onClick={handleAdd}>
            <CartIcon size={18} />
            Agregar al Carrito
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductModal
