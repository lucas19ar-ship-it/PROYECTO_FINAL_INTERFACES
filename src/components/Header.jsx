// src/components/Header.jsx
import { CartIcon, LogoutIcon, PackageIcon } from './icons'

function Header({ session, isAdmin, cartCount, onOpenCart, onLogoutClick }) {
  return (
    <header className="site-header">
      <div className="site-header-inner">
        <div className="brand">
          <span className="brand-mark">
            <PackageIcon size={22} />
          </span>
          <span className="brand-name">
            TechStore<span className="brand-accent">.Solutions</span>
          </span>
        </div>

        <div className="header-actions">
          {!isAdmin && (
            <button type="button" className="btn-cart" onClick={onOpenCart}>
              <CartIcon size={18} />
              Mi Carrito
              <span className="cart-badge">{cartCount}</span>
            </button>
          )}

          <div className="session-pill">
            <span className="session-user">{session.username}</span>
            <span className="session-role">{session.role}</span>
          </div>

          <button type="button" className="btn-logout" onClick={onLogoutClick}>
            <LogoutIcon size={17} />
            <span className="btn-logout-label">Cerrar sesión</span>
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
