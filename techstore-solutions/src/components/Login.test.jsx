// src/components/Login.test.jsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import Login from './Login'

describe('Login', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('muestra errores si se envía el formulario vacío', async () => {
    const user = userEvent.setup()
    const onLogin = vi.fn()

    render(<Login onLogin={onLogin} loginError="" onGoToReset={() => {}} />)

    await user.click(screen.getByRole('button', { name: /ingresar/i }))

    expect(onLogin).not.toHaveBeenCalled()
    expect(screen.getByText(/el usuario es obligatorio/i)).toBeInTheDocument()
    expect(screen.getByText(/la contraseña es obligatoria/i)).toBeInTheDocument()
  })

  it('llama a onLogin con los datos ingresados cuando son válidos', async () => {
    const user = userEvent.setup()
    const onLogin = vi.fn()

    render(<Login onLogin={onLogin} loginError="" onGoToReset={() => {}} />)

    await user.type(screen.getByLabelText(/usuario/i), 'admin')
    await user.type(screen.getByLabelText(/contraseña/i), 'admin123')
    await user.click(screen.getByRole('button', { name: /ingresar/i }))

    expect(onLogin).toHaveBeenCalledWith('admin', 'admin123')
  })

  it('muestra el mensaje de error de login cuando loginError tiene contenido', () => {
    render(<Login onLogin={() => {}} loginError="Contraseña incorrecta. Intento 1 de 3" onGoToReset={() => {}} />)

    expect(screen.getByText(/contraseña incorrecta. intento 1 de 3/i)).toBeInTheDocument()
  })
})