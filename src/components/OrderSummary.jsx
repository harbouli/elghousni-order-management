function OrderSummary({ selectedProducts, customerInfo }) {
  const totalAmount = selectedProducts.reduce((sum, product) => sum + product.subtotal, 0)

  if (selectedProducts.length === 0) {
    return (
      <div className="order-summary">
        <h3>Résumé de la commande</h3>
        <p className="empty-summary">Aucun produit sélectionné</p>
      </div>
    )
  }

  return (
    <div className="order-summary">
      <h3>Résumé de la commande</h3>
      
      {customerInfo.name && (
        <div className="customer-info">
          <h4>Informations client</h4>
          <p><strong>Nom:</strong> {customerInfo.name}</p>
          {customerInfo.phone && <p><strong>Téléphone:</strong> {customerInfo.phone}</p>}
        </div>
      )}

      <div className="products-summary">
        <h4>Produits commandés</h4>
        {selectedProducts.map(product => (
          <div key={product.id} className="summary-item">
            <div className="item-details">
              <span className="item-name">{product.name}</span>
              <span className="item-quantity">x{product.quantity}</span>
            </div>
            <div className="item-pricing">
              <span className="unit-price">{product.price} DH/unité</span>
              <span className="subtotal">{product.subtotal} DH</span>
            </div>
          </div>
        ))}
      </div>

      <div className="total-section">
        <div className="total-line">
          <span className="total-label">Total général:</span>
          <span className="total-amount">{totalAmount} DH</span>
        </div>
      </div>
    </div>
  )
}

export default OrderSummary