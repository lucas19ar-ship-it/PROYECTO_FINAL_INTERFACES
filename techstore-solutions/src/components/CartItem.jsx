function CartItem({ item, onIncrease, onDecrease, onRemove }) { 
    const subtotal = item.price * item.cartQuantity

    return (
        <div className="cart-item">
            <div className="cart-item-info">
                <h4>{item.name}</h4>
                <p>Precio unitario: S/ {item.price.toFixed(2)}</p>
            </div>

            <div className="cart-item-controls">
                <button onClick={() => onDecrease(item.id)}>-</button>
                <span>{item.cartQuantity}</span>
                <button onClick={() => onIncrease(item.id)}>+</button>
            </div>

            <p className="cart-item-subtotal">S/ {subtotal.toFixed(2)}</p>

            <button className="btn-remove" onClick={() => onRemove(item.id)}>
              Eliminar
            </button>
        </div>
    )
}

export default CartItem