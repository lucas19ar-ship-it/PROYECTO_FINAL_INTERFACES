// src/components/ProductGrid.jsx
// Catálogo del cliente: filtro por categoría + buscador + grilla de tarjetas.
import { useMemo, useState } from 'react'
import ProductCard from './ProductCard'
import { SearchIcon } from './icons'
import { CATEGORIES } from '../utils/categories'
import { BoxOpenIcon } from './icons'

function ProductGrid({ products, onOpenProduct }) {
  const [activeCategory, setActiveCategory] = useState('Todos')
  const [search, setSearch] = useState('')

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesCategory =
        activeCategory === 'Todos' || product.category === activeCategory
      const matchesSearch = product.name
        .toLowerCase()
        .includes(search.trim().toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [products, activeCategory, search])

  return (
    <div className="catalog">
      <div className="catalog-toolbar">
        <div className="category-pills">
          {['Todos', ...CATEGORIES].map(cat => (
            <button
              key={cat}
              type="button"
              className={`pill ${activeCategory === cat ? 'pill-active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="search-box">
          <SearchIcon size={17} className="search-icon" />
          <input
            type="text"
            placeholder="Buscar en TechStore..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="catalog-empty">
          <BoxOpenIcon size={40} />
          <p>No se encontraron productos con esos filtros.</p>
        </div>
      ) : (
        <div className="product-grid">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} onOpen={onOpenProduct} />
          ))}
        </div>
      )}
    </div>
  )
}

export default ProductGrid
