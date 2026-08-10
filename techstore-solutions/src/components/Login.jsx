// src/components/Login.jsx
import { useState } from 'react'

function Login({ onLogin, loginError }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [fieldErrors, setFieldErrors] = useState({})

  function handleSubmit(e) {
    e.preventDefault()

    const errors = {}
    if (!username.trim()) errors.username = 'El usuario es obligatorio'
    if (!password.trim()) errors.password = 'La contraseña es obligatoria'

    setFieldErrors(errors)
    if (Object.keys(errors).length > 0) return

    onLogin(username.trim(), password)
  }

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Iniciar Sesión</h2>

        <div className="form-group">
          <label htmlFor="username">Usuario</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {fieldErrors.username && (
            <span className="error-message">{fieldErrors.username}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {fieldErrors.password && (
            <span className="error-message">{fieldErrors.password}</span>
          )}
        </div>

        {loginError && <p className="error-message login-error">{loginError}</p>}

        <button type="submit">Ingresar</button>

        <p className="login-hint">
          Admin: admin / admin123 &nbsp;|&nbsp; Cliente: cliente / cliente123
        </p>
      </form>
    </div>
  )
}

export default Login