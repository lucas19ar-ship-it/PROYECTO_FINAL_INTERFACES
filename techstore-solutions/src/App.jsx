import './App.css'
import { useState } from 'react'
import ProductForm from './components/ProductForm'
import ProductList from './components/ProductList'
import Cart from './components/Cart'
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



function App() {
  const [products, setProducts] = useLocalStorage('techstore-products', [])
  const [cart, setCart] = useLocalStorage('techstore-cart', [])
  const { session, isAuthenticated, loginError, login, logout } = useAuth()
  const [authView, setAuthView] = useState('login') // 'login' | 'reset'
  const [orders, setOrders] = useState(getOrders())
  const [users, setUsers] = useState(getUsers())

  const isAdmin = session?.role === 'admin'


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
  

  function handleAddToCart(product) {
    setCart(prevCart => {
      const existing = prevCart.find(item => item.id === product.id)
      if (existing) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, cartQuantity: item.cartQuantity + 1}
            : item
        )
      }
      // si es nuevo en el carrito lo agregamos con cantidad 1 //
      return [...prevCart, { ...product, cartQuantity: 1 }]
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
    alert('¡Pedido confirmado con éxito!')
  }

  function handleUnlockUser(userman) {
    updateUser(username, { blocked: false, failedAttempts: 0})
    setUsers(getUsers())
  }


  // sin sesion: mostramos login o resertpassword segun la vista activa //
  if (!isAuthenticated) { 
    if (authView == 'reset') {
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
      <div className="app-header">
        <h1>TechStore Solutions</h1>
        <div className="session-info">
          <span>
            {session.username} ({session.role})
          </span>
          <button onClick={logout} className="btn-logout">Cerrar Sesión</button>
        </div>
      </div>

      {isAdmin && (
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

      {!isAdmin && (
        <>
          <ProductList
            products={products}
            onAddToCart={handleAddToCart}
            isAdmin={false}
          />
          <Cart
            cart={cart}
            onIncrease={handleIncrease}
            onDecrease={handleDecrease}
            onRemove={handleRemove}
            onConfirmOrder={handleConfirmOrder}
          />
        </>
      )}

      
    </div> 
  )
}
export default App

//Nota importante: usamos cartQuantity (no quantity) dentro del carrito, para no confundir "cantidad disponible del producto" con "cantidad que el cliente quiere comprar". Son conceptos distintos.//