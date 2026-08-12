// src/components/ProductForm.test.jsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import ProductForm from './ProductForm'

describe('ProductForm', () => {
  it('no permite enviar el formulario vacío y muestra errores', async () => {
    const user = userEvent.setup()
    const onAddProduct = vi.fn() // función "espía" para verificar si fue llamada

    render(<ProductForm onAddProduct={onAddProduct} />)

    const submitButton = screen.getByRole('button', { name: /agregar producto/i })
    await user.click(submitButton)

    // No debería haberse llamado a onAddProduct porque el form está vacío
    expect(onAddProduct).not.toHaveBeenCalled()

    // Deben aparecer los mensajes de error
    expect(screen.getByText(/el nombre del producto es obligatorio/i)).toBeInTheDocument()
    expect(screen.getByText(/el precio debe ser mayor a 0/i)).toBeInTheDocument()
    expect(screen.getByText(/la cantidad debe ser mayor a 0/i)).toBeInTheDocument()
  })

  it('permite enviar el formulario cuando los datos son válidos', async () => {
    const user = userEvent.setup()
    const onAddProduct = vi.fn()

    render(<ProductForm onAddProduct={onAddProduct} />)

    await user.type(screen.getByLabelText(/nombre del producto/i), 'Mouse')
    await user.type(screen.getByLabelText(/precio/i), '25.5')
    await user.type(screen.getByLabelText(/cantidad/i), '3')

    await user.click(screen.getByRole('button', { name: /agregar producto/i }))

    expect(onAddProduct).toHaveBeenCalledTimes(1)
    expect(onAddProduct).toHaveBeenCalledWith(
      expect.objectContaining({ name: 'Mouse', price: 25.5, quantity: 3 })
    )
  })
})