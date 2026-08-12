import './App.css'
import { useState } from 'react'
import ProductForm from './components/ProductForm'
import ProductList from './components/ProductList'
import ProductGrid from './components/ProductGrid'
import ProductModal from './components/ProductModal'
import Header from './components/Header'
import HeroBanner from './components/HeroBanner'
import CartDrawer from './components/CartDrawer'
import Login from './components/Login'
import ResetPassword from './components/ResetPassword'
import AdminOrders from './components/AdminOrders'
import AdminUsers from './components/AdminUsers'
import useLocalStorage from './hooks/useLocalStorage'
import useAuth from './hooks/useAuth'
import { getOrders, saveOrder } from './utils/orders'
import { getUsers, updateUser } from './utils/users'
import { updateProductInList, removeProductFromList } from './utils/products'
import { buildOrder } from './utils/cartCalculations'
import { canSeeCart, canManageProducts } from './utils/permissions'

function App() {
  const [products, setProducts] = useLocalStorage('techstore-products', [])
  const [cart, setCart] = useLocalStorage('techstore-cart', [])
  const { session, isAuthenticated, loginError, login, logout } = useAuth()
  const [authView, setAuthView] = useState('login') // 'login' | 'reset'
  const [orders, setOrders] = useState(getOrders())
  const [users, setUsers] = useState(getUsers())

  // Estado propio del rediseño: producto seleccionado para el modal, y si el panel del carrito está abierto
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [isCartOpen, setIsCartOpen] = useState(false)

  const isAdmin = session?.role === 'admin'
  const showCart = canSeeCart(isAuthenticated, session?.role)
  const showAdminPanel = canManageProducts(isAuthenticated, session?.role)

  const cartCount = cart.reduce((acc, item) => acc + item.cartQuantity, 0)

  function handleAddProduct(newProduct) {
    setProducts(prev => [...prev, newProduct])
  }

  function handleEditProduct(updatedProduct) {
    setProducts(prev => updateProductInList(prev, updatedProduct))
  }

  function handleDeleteProduct(productId) {
    if (confirm('¿Seguro que deseas eliminar este producto?')) {
      setProducts(prev => removeProductFromList(prev, productId))
    }
  }

  // Ahora acepta una cantidad (viene del modal de producto), con 1 como valor por defecto
  function handleAddToCart(product, quantity = 1) {
    setCart(prevCart => {
      const existing = prevCart.find(item => item.id === product.id)
      if (existing) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, cartQuantity: item.cartQuantity + quantity }
            : item
        )
      }
      return [...prevCart, { ...product, cartQuantity: quantity }]
    })
  }

  function handleIncrease(id) {
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === id ? { ...item, cartQuantity: item.cartQuantity + 1 } : item
      )
    )
  }

  function handleDecrease(id) {
    setCart(prevCart =>
      prevCart
        .map(item =>
          item.id === id ? { ...item, cartQuantity: item.cartQuantity - 1 } : item
        )
        .filter(item => item.cartQuantity > 0) // si llega a 0, se elimina
    )
  }

  function handleRemove(id) {
    setCart(prevCart => prevCart.filter(item => item.id !== id))
  }

  function handleConfirmOrder() {
    if (cart.length === 0) return
    const order = buildOrder(cart, session.username)
    const updatedOrders = saveOrder(order)
    setOrders(updatedOrders)
    setCart([])
    setIsCartOpen(false)
    alert('¡Pedido confirmado con éxito!')
  }

  function handleUnlockUser(username) {
    updateUser(username, { blocked: false, failedAttempts: 0 })
    setUsers(getUsers())
  }

  function handleLogoutClick() {
    if (confirm('¿Seguro que deseas cerrar sesión?')) {
      logout()
    }
  }

  // Sin sesión: mostramos Login o ResetPassword según la vista activa.
  // Esto se mantiene intacto respecto al Parcial Final: el login sigue siendo obligatorio.
  if (!isAuthenticated) {
    if (authView === 'reset') {
      return <ResetPassword onBackToLogin={() => setAuthView('login')} />
    }
    return (
      <Login
        onLogin={login}
        loginError={loginError}
        onGoToReset={() => setAuthView('reset')}
      />
    )
  }

  return (
    <div className="app">
      <Header
        session={session}
        isAdmin={isAdmin}
        cartCount={cartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onLogoutClick={handleLogoutClick}
      />

      <main className="app-main">
        {showAdminPanel && (
          <>
            <ProductForm onAddProduct={handleAddProduct} />
            <ProductList
              products={products}
              isAdmin={true}
              onEditProduct={handleEditProduct}
              onDeleteProduct={handleDeleteProduct}
            />
            <AdminOrders orders={orders} />
            <AdminUsers users={users} onUnlock={handleUnlockUser} />
          </>
        )}

        {/*
          Restricción de acceso al carrito: el carrito (grilla de compra + drawer) solo se
          renderiza si showCart=true (isAuthenticated=true Y role='cliente'). No se usa CSS
          para ocultar - los componentes no se montan en el DOM en ningún otro caso, evitando
          la manipulación desde las DevTools del navegador.
        */}
        {showCart && (
          <>
            <HeroBanner />
            <ProductGrid products={products} onOpenProduct={setSelectedProduct} />
          </>
        )}
      </main>

      {showCart && (
        <>
          <ProductModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
            onAddToCart={handleAddToCart}
          />

          <CartDrawer
            isOpen={isCartOpen}
            onClose={() => setIsCartOpen(false)}
            cart={cart}
            onIncrease={handleIncrease}
            onDecrease={handleDecrease}
            onRemove={handleRemove}
            onConfirmOrder={handleConfirmOrder}
          />
        </>
      )}

      <footer className="site-footer">
        © 2026 TechStore Solutions — Sistema Integral de Gestión de Pedidos
      </footer>
    </div>
  )
}

export default App

// Nota importante: usamos cartQuantity (no quantity) dentro del carrito, para no confundir
// "cantidad disponible del producto" con "cantidad que el cliente quiere comprar".
