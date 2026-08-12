// src/components/Cart.jsx
import CartItem from './CartItem'
import { calculateSubtotal, calculateTotal, IGV_RATE } from '../utils/cartCalculations'
import { CartIcon } from './icons'

function Cart({ cart, onIncrease, onDecrease, onRemove, onConfirmOrder }) {
  const subtotal = calculateSubtotal(cart)
  const igv = subtotal * IGV_RATE
  const total = calculateTotal(cart)

  if (cart.length === 0) {
    return (
      <div className="cart-empty-state">
        <CartIcon size={40} />
        <p className="empty-message">Tu carrito está vacío.</p>
        <p className="cart-empty-hint">Explora el catálogo y agrega productos.</p>
      </div>
    )
  }

  return (
    <div className="cart">
      {cart.map(item => (
        <CartItem
          key={item.id}
          item={item}
          onIncrease={onIncrease}
          onDecrease={onDecrease}
          onRemove={onRemove}
        />
      ))}

      <div className="cart-summary">
        <p>Subtotal: <span>S/ {subtotal.toFixed(2)}</span></p>
        <p>IGV (18%): <span>S/ {igv.toFixed(2)}</span></p>
        <p className="cart-total">Total: <span>S/ {total.toFixed(2)}</span></p>
        <button className="btn-confirm-order" onClick={onConfirmOrder}>
          Confirmar Pedido
        </button>
      </div>
    </div>
  )
}

export default Cart
