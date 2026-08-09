// src/components/Cart.jsx
import CartItem from './CartItem'

const IGV_RATE = 0.18 // 18%

function Cart({ cart, onIncrease, onDecrease, onRemove }) {
  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.cartQuantity,
    0
  )

  const igv = subtotal * IGV_RATE
  const total = subtotal + igv

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
      </div>
    </div>
  )
}

export default Cart