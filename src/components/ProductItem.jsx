// src/components/ProductItem.jsx
import { useState } from 'react'
import { EditIcon, TrashIcon, CheckCircleIcon, CloseIcon } from './icons'
import { CATEGORIES } from '../utils/categories'

function ProductItem({ product, isAdmin, onEdit, onDelete }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState({
    name: product.name,
    price: product.price,
    quantity: product.quantity,
    image: product.image,
    category: product.category,
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
      image: editData.image?.trim() || product.image,
      category: editData.category || product.category,
    })
    setIsEditing(false)
  }

  function handleCancelEdit() {
    setEditData({
      name: product.name,
      price: product.price,
      quantity: product.quantity,
      image: product.image,
      category: product.category,
    })
    setIsEditing(false)
  }

  if (isEditing) {
    return (
      <div className="product-item product-item-editing">
        <input type="text" name="name" value={editData.name} onChange={handleEditChange} />
        <input type="number" name="price" value={editData.price} onChange={handleEditChange} step="0.01" />
        <input type="number" name="quantity" value={editData.quantity} onChange={handleEditChange} />
        <input type="text" name="image" value={editData.image} onChange={handleEditChange} placeholder="URL de imagen" />
        <select name="category" value={editData.category} onChange={handleEditChange}>
          {CATEGORIES.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <div className="product-item-actions">
          <button onClick={handleSaveEdit} className="btn-save">
            <CheckCircleIcon size={16} /> Guardar
          </button>
          <button onClick={handleCancelEdit} className="btn-cancel">
            <CloseIcon size={16} /> Cancelar
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="product-item">
      <img className="product-item-thumb" src={product.image} alt={product.name} />

      <div className="product-info">
        <span className="product-card-category">{product.category}</span>
        <h3>{product.name}</h3>
        <p>Precio: S/ {product.price.toFixed(2)}</p>
        <p>Cantidad disponible: {product.quantity}</p>
      </div>

      {isAdmin && (
        <div className="product-item-actions">
          <button onClick={() => setIsEditing(true)} className="btn-edit">
            <EditIcon size={16} /> Editar
          </button>
          <button onClick={() => onDelete(product.id)} className="btn-delete">
            <TrashIcon size={16} /> Eliminar
          </button>
        </div>
      )}
    </div>
  )
}

export default ProductItem
