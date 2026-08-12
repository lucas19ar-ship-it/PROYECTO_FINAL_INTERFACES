// src/components/CartDrawer.jsx
// Panel lateral que muestra el carrito completo (Cart.jsx) al hacer click en "Mi Carrito" del header.
import Cart from './Cart'
import { CloseIcon } from './icons'

function CartDrawer({ isOpen, onClose, ...cartProps }) {
  if (!isOpen) return null

  function handleOverlayClick(e) {
    if (e.target === e.currentTarget) onClose()
  }

  return (
    <div className="drawer-overlay" onClick={handleOverlayClick}>
      <div className="drawer-panel" role="dialog" aria-modal="true">
        <div className="drawer-header">
          <h2>Mi Carrito</h2>
          <button className="modal-close" onClick={onClose} aria-label="Cerrar carrito">
            <CloseIcon size={18} />
          </button>
        </div>
        <div className="drawer-content">
          <Cart {...cartProps} />
        </div>
      </div>
    </div>
  )
}

export default CartDrawer
