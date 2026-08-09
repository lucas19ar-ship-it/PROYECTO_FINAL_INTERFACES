// src/components/ProductForm.jsx
import { useState } from 'react'
import { validateProductForm } from '../utils/validations'

function ProductForm({ onAddProduct }) {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    quantity: ''
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

    // Si hay errores, no continuamos
    if (Object.keys(validationErrors).length > 0) {
      return
    }

    // Creamos el producto con los datos ya validados
    const newProduct = {
      id: crypto.randomUUID(),
      name: formData.name.trim(),
      price: Number(formData.price),
      quantity: Number(formData.quantity)
    }

    onAddProduct(newProduct)

    // Limpiamos el formulario
    setFormData({ name: '', price: '', quantity: '' })
    setErrors({})
  }

  return (
    <form onSubmit={handleSubmit} className="product-form">
      <h2>Registrar Producto</h2>

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

      <button type="submit">Agregar Producto</button>
    </form>
  )
}

export default ProductForm