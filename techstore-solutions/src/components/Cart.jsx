// src/components/Cart.jsx
import CartItem from './CartItem'
import { calculateSubtotal, calculateTotal, IGV_RATE } from '../utils/cartCalculations'



function Cart({ cart, onIncrease, onDecrease, onRemove, onConfirmOrder }) {
  const subtotal = calculateSubtotal(cart)
  const igv = subtotal * IGV_RATE
  const total = calculateTotal(cart)

  if (cart.length === 0) {
    return (
      <div className="cart">
        <h2>Carrito de Compras</h2>
        <p className="empty-message">El carrito está vacío.</p>
      </div>
    )
  }

  return (
    <div className="cart">
      <h2>Carrito de Compras</h2>

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
        <p>Subtotal: S/ {subtotal.toFixed(2)}</p>
        <p>IGV (18%): S/ {igv.toFixed(2)}</p>
        <p className="cart-total">Total: S/ {total.toFixed(2)}</p>
        <button className="btn-confirm-order" onClick={onConfirmOrder}>
          Confirmar Pedido
        </button>
      </div>
    </div>
  )
}

export default Cart