import { useState } from 'react'
import ProductForm from './components/ProductForm'

function App() {
  const [products, setProducts] = useState([])

  function handleAddProduct(newProduct) {
    setProducts(prev => [...prev, newProduct])
  }
  
  return (
    <div className='app'>
      <h1>TechStore Solutions</h1>
      <ProductForm onAddProduct={handleAddProduct} />

      {/* temporal: solo para verificar que se esta guardando */}
      <pre>{JSON.stringify(products, null, 2)}</pre>
    </div>
  )
}
export default App