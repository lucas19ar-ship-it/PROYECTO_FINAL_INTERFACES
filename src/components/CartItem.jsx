// src/components/CartItem.jsx
import { PlusIcon, MinusIcon, TrashIcon } from './icons'

function CartItem({ item, onIncrease, onDecrease, onRemove }) {
  const subtotal = item.price * item.cartQuantity

  return (
    <div className="cart-item">
      {item.image && (
        <img className="cart-item-thumb" src={item.image} alt={item.name} />
      )}

      <div className="cart-item-info">
        <h4>{item.name}</h4>
        <p>S/ {item.price.toFixed(2)} c/u</p>

        <div className="cart-item-controls">
          <button onClick={() => onDecrease(item.id)} aria-label="Disminuir cantidad">
            <MinusIcon size={14} />
          </button>
          <span>{item.cartQuantity}</span>
          <button onClick={() => onIncrease(item.id)} aria-label="Aumentar cantidad">
            <PlusIcon size={14} />
          </button>
        </div>
      </div>

      <div className="cart-item-right">
        <p className="cart-item-subtotal">S/ {subtotal.toFixed(2)}</p>
        <button className="btn-remove" onClick={() => onRemove(item.id)} aria-label="Eliminar">
          <TrashIcon size={15} />
        </button>
      </div>
    </div>
  )
}

export default CartItem
