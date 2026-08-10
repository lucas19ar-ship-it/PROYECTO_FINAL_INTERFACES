import './App.css'
import ProductForm from './components/ProductForm'
import ProductList from './components/ProductList'
import Cart from './components/Cart'
import Login from './components/Login'
import useLocalStorage from './hooks/useLocalStorage'
import useAuth from './hooks/useAuth'



function App() {
  const [products, setProducts] = useLocalStorage('techstore-products', [])
  const [cart, setCart] = useLocalStorage('techstore-cart', [])
  const { session, isAuthenticated, loginError, login, logout } = useAuth()



  function handleAddProduct(newProduct) {
    setProducts(prev => [...prev, newProduct])
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
   
  if (!isAuthenticated) { 
    return <Login onLogin={login} loginError={loginError} />
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

      <ProductForm onAddProduct={handleAddProduct} />
      <ProductList products={products} onAddToCart={handleAddToCart} />
      <Cart 
        cart= {cart}
        onIncrease={handleIncrease}
        onDecrease={handleDecrease}
        onRemove={handleRemove}
      />
    </div>

      
  )
}
export default App

//Nota importante: usamos cartQuantity (no quantity) dentro del carrito, para no confundir "cantidad disponible del producto" con "cantidad que el cliente quiere comprar". Son conceptos distintos.//