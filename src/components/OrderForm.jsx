import { useState } from 'react'
import ProductSelector from './ProductSelector'
import OrderSummary from './OrderSummary'

function OrderForm({ onAddOrder }) {
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: ''
  })
  const [selectedProducts, setSelectedProducts] = useState([])
  const [errors, setErrors] = useState({})

  const handleCustomerChange = (field, value) => {
    setCustomerInfo(prev => ({
      ...prev,
      [field]: value
    }))
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!customerInfo.name.trim()) {
      newErrors.name = 'Le nom du client est requis'
    }
    
    if (!customerInfo.phone.trim()) {
      newErrors.phone = 'Le numéro de téléphone est requis'
    }
    
    if (selectedProducts.length === 0) {
      newErrors.products = 'Veuillez sélectionner au moins un produit'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    const orderData = {
      customerName: customerInfo.name,
      customerPhone: customerInfo.phone,
      products: selectedProducts,
      total: selectedProducts.reduce((sum, product) => sum + product.subtotal, 0)
    }

    onAddOrder(orderData)
    
    setCustomerInfo({ name: '', phone: '' })
    setSelectedProducts([])
    setErrors({})
  }

  const resetForm = () => {
    setCustomerInfo({ name: '', phone: '' })
    setSelectedProducts([])
    setErrors({})
  }

  return (
    <div className="order-form">
      <div className="form-header">
        <h2>📝 Nouvelle Commande</h2>
        <button type="button" onClick={resetForm} className="reset-btn">
          Réinitialiser
        </button>
      </div>

      <form onSubmit={handleSubmit} className="form-content">
        <div className="form-section">
          <h3>Informations du client</h3>
          <div className="customer-fields">
            <div className="field-group">
              <label htmlFor="customerName">Nom du client *</label>
              <input
                id="customerName"
                type="text"
                value={customerInfo.name}
                onChange={(e) => handleCustomerChange('name', e.target.value)}
                className={errors.name ? 'error' : ''}
                placeholder="Entrez le nom du client"
              />
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>
            
            <div className="field-group">
              <label htmlFor="customerPhone">Numéro de téléphone *</label>
              <input
                id="customerPhone"
                type="tel"
                value={customerInfo.phone}
                onChange={(e) => handleCustomerChange('phone', e.target.value)}
                className={errors.phone ? 'error' : ''}
                placeholder="Ex: 06 12 34 56 78"
              />
              {errors.phone && <span className="error-message">{errors.phone}</span>}
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Sélection des produits</h3>
          {errors.products && <div className="error-message">{errors.products}</div>}
          <ProductSelector 
            selectedProducts={selectedProducts}
            onProductChange={setSelectedProducts}
          />
        </div>

        <div className="form-section">
          <OrderSummary 
            selectedProducts={selectedProducts}
            customerInfo={customerInfo}
          />
        </div>

        <div className="form-actions">
          <button 
            type="submit" 
            className="submit-btn"
            disabled={selectedProducts.length === 0}
          >
            Confirmer la commande
          </button>
        </div>
      </form>
    </div>
  )
}

export default OrderForm