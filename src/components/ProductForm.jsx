// src/components/ProductForm.jsx
import { useState } from 'react'
import { validateProductForm, DEFAULT_PRODUCT_IMAGE } from '../utils/validations'
import { CATEGORIES, DEFAULT_CATEGORY } from '../utils/categories'

function ProductForm({ onAddProduct }) {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    quantity: '',
    image: '',
    category: DEFAULT_CATEGORY,
  })

  const [errors, setErrors] = useState({})

  function handleChange(e) {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()

    const validationErrors = validateProductForm(formData)
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length > 0) {
      return
    }

    const newProduct = {
      id: crypto.randomUUID(),
      name: formData.name.trim(),
      price: Number(formData.price),
      quantity: Number(formData.quantity),
      image: formData.image.trim() || DEFAULT_PRODUCT_IMAGE,
      category: formData.category || DEFAULT_CATEGORY,
    }

    onAddProduct(newProduct)

    setFormData({ name: '', price: '', quantity: '', image: '', category: DEFAULT_CATEGORY })
    setErrors({})
  }

  return (
    <form onSubmit={handleSubmit} className="product-form">
      <h2>Registrar Producto</h2>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="name">Nombre del producto</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <span className="error-message">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="category">Categoría</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            {CATEGORIES.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="price">Precio (S/)</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            step="0.01"
          />
          {errors.price && <span className="error-message">{errors.price}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="quantity">Cantidad</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
          />
          {errors.quantity && <span className="error-message">{errors.quantity}</span>}
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="image">URL de imagen (opcional)</label>
        <input
          type="text"
          id="image"
          name="image"
          placeholder="https://..."
          value={formData.image}
          onChange={handleChange}
        />
        <span className="field-hint">Si lo dejas vacío, se usará una imagen por defecto</span>
      </div>

      <button type="submit">Agregar Producto</button>
    </form>
  )
}

export default ProductForm
