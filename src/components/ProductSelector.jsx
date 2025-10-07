import { useState } from 'react'
import { products } from '../data/products'

function ProductSelector({ selectedProducts, onProductChange }) {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleQuantityChange = (productId, quantity) => {
    const numQuantity = parseInt(quantity) || 0
    
    if (numQuantity === 0) {
      const updatedProducts = selectedProducts.filter(p => p.id !== productId)
      onProductChange(updatedProducts)
    } else {
      const product = products.find(p => p.id === productId)
      const existingProductIndex = selectedProducts.findIndex(p => p.id === productId)
      
      if (existingProductIndex >= 0) {
        const updatedProducts = [...selectedProducts]
        updatedProducts[existingProductIndex] = {
          ...product,
          quantity: numQuantity,
          subtotal: product.price * numQuantity
        }
        onProductChange(updatedProducts)
      } else {
        const newProduct = {
          ...product,
          quantity: numQuantity,
          subtotal: product.price * numQuantity
        }
        onProductChange([...selectedProducts, newProduct])
      }
    }
  }

  const getSelectedQuantity = (productId) => {
    const selectedProduct = selectedProducts.find(p => p.id === productId)
    return selectedProduct ? selectedProduct.quantity : 0
  }

  return (
    <div className="product-selector">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Rechercher un produit..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="products-grid">
        {filteredProducts.map(product => (
          <div key={product.id} className="product-card">
            <div className="product-info">
              <h4 className="product-name">{product.name}</h4>
              <p className="product-category">{product.category}</p>
              <p className="product-description">{product.description}</p>
              <p className="product-price">{product.price} DH</p>
            </div>
            
            <div className="quantity-selector">
              <label htmlFor={`quantity-${product.id}`}>Quantité:</label>
              <input
                id={`quantity-${product.id}`}
                type="number"
                min="0"
                value={getSelectedQuantity(product.id)}
                onChange={(e) => handleQuantityChange(product.id, e.target.value)}
                className="quantity-input"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProductSelector