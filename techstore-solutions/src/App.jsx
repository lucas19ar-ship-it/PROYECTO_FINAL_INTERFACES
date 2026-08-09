import { useState } from 'react'
import ProductForm from './components/ProductForm'
import ProductList from './components/ProductList'
import Cart from './components/Cart'


function App() {
  const [products, setProducts] = useState([])
  const [cart, setCart] = useState([]) 


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

  return (
    <div className="app">
      <h1>TechStore Solutions</h1>
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