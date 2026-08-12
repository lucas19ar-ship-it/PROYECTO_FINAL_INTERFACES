// src/components/AdminOrders.jsx
import { ReceiptIcon } from './icons'

function AdminOrders({ orders }) {
  return (
    <div className="admin-panel">
      <h2><ReceiptIcon size={18} /> Pedidos de Clientes</h2>

      {orders.length === 0 ? (
        <p className="empty-message">Aún no hay pedidos confirmados.</p>
      ) : (
        orders.map(order => (
          <div key={order.id} className="order-card">
            <div className="order-header">
              <strong>{order.username}</strong>
              <span>{new Date(order.date).toLocaleString()}</span>
            </div>
            <ul className="order-items">
              {order.items.map(item => (
                <li key={item.id}>
                  {item.name} x{item.cartQuantity} — S/ {(item.price * item.cartQuantity).toFixed(2)}
                </li>
              ))}
            </ul>
            <p className="order-total">Total: S/ {order.total.toFixed(2)}</p>
          </div>
        ))
      )}
    </div>
  )
}

export default AdminOrders
