// src/components/ProductItem.jsx
import { useState } from 'react'

function ProductItem({ product, onAddToCart, isAdmin, onEdit, onDelete }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState({
    name: product.name,
    price: product.price,
    quantity: product.quantity,
  })

  function handleEditChange(e) {
    const { name, value } = e.target
    setEditData(prev => ({ ...prev, [name]: value }))
  }

  function handleSaveEdit() {
    if (!editData.name.trim() || Number(editData.price) <= 0 || Number(editData.quantity) <= 0) {
      alert('Datos inválidos: verifica nombre, precio y cantidad.')
      return
    }

    onEdit({
      ...product,
      name: editData.name.trim(),
      price: Number(editData.price),
      quantity: Number(editData.quantity),
    })
    setIsEditing(false)
  }

  function handleCancelEdit() {
    setEditData({ name: product.name, price: product.price, quantity: product.quantity })
    setIsEditing(false)
  }

  if (isEditing) {
    return (
      <div className="product-item product-item-editing">
        <input
          type="text"
          name="name"
          value={editData.name}
          onChange={handleEditChange}
        />
        <input
          type="number"
          name="price"
          value={editData.price}
          onChange={handleEditChange}
          step="0.01"
        />
        <input
          type="number"
          name="quantity"
          value={editData.quantity}
          onChange={handleEditChange}
        />
        <div className="product-item-actions">
          <button onClick={handleSaveEdit} className="btn-save">Guardar</button>
          <button onClick={handleCancelEdit} className="btn-cancel">Cancelar</button>
        </div>
      </div>
    )
  }

  return (
    <div className="product-item">
      <div className="product-info">
        <h3>{product.name}</h3>
        <p>Precio: S/ {product.price.toFixed(2)}</p>
        <p>Cantidad disponible: {product.quantity}</p>
      </div>

      <div className="product-item-actions">
        {!isAdmin && (
          <button onClick={() => onAddToCart(product)}>
            Agregar al carrito
          </button>
        )}

        {isAdmin && (
          <>
            <button onClick={() => setIsEditing(true)} className="btn-edit">
              Editar
            </button>
            <button onClick={() => onDelete(product.id)} className="btn-delete">
              Eliminar
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default ProductItem


//ProductItem no sabe nada de cómo funciona el carrito. Solo recibe una función onAddToCart por props y la ejecuta con el producto cuando se hace click. Esto es "comunicación hijo → padre mediante props": el hijo no maneja el estado, solo avisa. //wad