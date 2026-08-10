// src/components/ResetPassword.jsx
import { useState } from 'react'
import { validateResetPassword } from '../utils/validations'
import { findUser, resetPassword } from '../utils/users'

function ResetPassword({ onBackToLogin }) {
  const [formData, setFormData] = useState({
    username: '',
    newPassword: '',
    confirmPassword: '',
  })
  const [errors, setErrors] = useState({})
  const [successMessage, setSuccessMessage] = useState('')

  function handleChange(e) {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setSuccessMessage('') // si vuelve a escribir, ocultamos el mensaje de éxito anterior
  }

  function handleSubmit(e) {
    e.preventDefault()

    const validationErrors = validateResetPassword(formData)

    // Validación extra: que el usuario exista
    const user = findUser(formData.username.trim())
    if (!user) {
      validationErrors.username = 'Usuario no encontrado'
    }

    setErrors(validationErrors)
    if (Object.keys(validationErrors).length > 0) {
      setSuccessMessage('')
      return
    }

    resetPassword(formData.username.trim(), formData.newPassword)

    setSuccessMessage('Contraseña restablecida correctamente. Ya puedes iniciar sesión.')
    setFormData({ username: '', newPassword: '', confirmPassword: '' })
    setErrors({})
  }

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Restablecer Contraseña</h2>

        <div className="form-group">
          <label htmlFor="reset-username">Usuario</label>
          <input
            type="text"
            id="reset-username"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
          {errors.username && <span className="error-message">{errors.username}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="new-password">Nueva contraseña</label>
          <input
            type="password"
            id="new-password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
          />
          {errors.newPassword && <span className="error-message">{errors.newPassword}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="confirm-password">Confirmar contraseña</label>
          <input
            type="password"
            id="confirm-password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && (
            <span className="error-message">{errors.confirmPassword}</span>
          )}
        </div>

        {successMessage && <p className="success-message">{successMessage}</p>}

        <button type="submit">Restablecer contraseña</button>

        <button
          type="button"
          className="btn-link"
          onClick={onBackToLogin}
        >
          Volver al inicio de sesión
        </button>
      </form>
    </div>
  )
}

export default ResetPassword