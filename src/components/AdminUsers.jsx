// src/components/AdminUsers.jsx
import { UsersIcon, UnlockIcon, LockIcon } from './icons'

function AdminUsers({ users, onUnlock }) {
  return (
    <div className="admin-panel">
      <h2><UsersIcon size={18} /> Gestión de Cuentas</h2>
      {users.map(user => (
        <div key={user.username} className="user-row">
          <span className="user-row-info">
            <strong>{user.username}</strong>
            <span className="user-row-role">({user.role})</span>
            {user.blocked ? (
              <span className="status-blocked"><LockIcon size={14} /> Bloqueada</span>
            ) : (
              <span className="status-active">Activa</span>
            )}
          </span>
          {user.blocked && (
            <button onClick={() => onUnlock(user.username)} className="btn-unlock">
              <UnlockIcon size={15} /> Desbloquear
            </button>
          )}
        </div>
      ))}
    </div>
  )
}

export default AdminUsers
