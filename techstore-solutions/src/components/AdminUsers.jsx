// src/components/AdminUsers.jsx

function AdminUsers({ users, onUnlock }) {
  return (
    <div className="admin-panel">
      <h2>Gestión de Cuentas</h2>
      {users.map(user => (
        <div key={user.username} className="user-row">
          <span>
            {user.username} ({user.role}) —{' '}
            {user.blocked ? (
              <span className="status-blocked">Bloqueada</span>
            ) : (
              <span className="status-active">Activa</span>
            )}
          </span>
          {user.blocked && (
            <button onClick={() => onUnlock(user.username)} className="btn-unlock">
              Desbloquear
            </button>
          )}
        </div>
      ))}
    </div>
  )
}

export default AdminUsers