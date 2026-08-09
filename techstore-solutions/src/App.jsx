import { useState } from 'react'
import ProductForm from './components/ProductForm'
import ProductList from './components/ProductList'

function App() {
  const [products, setProducts] = useState([])

  function handleAddProduct(newProduct) {
    setProducts(prev => [...prev, newProduct])
  }

  function handleAddToCart(product) { 
    //Por ahora solo lo mostramos en consola.
    //En la fase 4 vamos a conectar esto de verdad con el carrito 
    console.log('Producto agregado al carrito:', product)
  }
  

  return (
    <div className='app'>
      <h1>TechStore Solutions</h1>
      <ProductForm onAddProduct={handleAddProduct} />
      <ProductList products={products} onAddToCart={handleAddToCart} />
      
    </div>
  )
}
export default App