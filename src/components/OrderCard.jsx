import { useState } from 'react'
import StatusBadge from './StatusBadge'
import { orderStatuses } from '../data/products'

function OrderCard({ order, onUpdateStatus, onDeleteOrder }) {
  const [showDetails, setShowDetails] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)

  const handleStatusChange = async (newStatus) => {
    setIsUpdating(true)
    await onUpdateStatus(order.id, newStatus)
    setIsUpdating(false)
  }

  const handleDelete = () => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette commande ?')) {
      onDeleteOrder(order.id)
    }
  }

  return (
    <div className="order-card">
      <div className="order-header" onClick={() => setShowDetails(!showDetails)}>
        <div className="order-basic-info">
          <div className="order-id">Commande #{order.id}</div>
          <div className="customer-name">{order.customerName}</div>
          <div className="order-date">{order.createdAt}</div>
        </div>
        
        <div className="order-summary-info">
          <StatusBadge status={order.status} />
          <div className="order-total">{order.total} DH</div>
          <button className="toggle-details">
            {showDetails ? '▼' : '▶'}
          </button>
        </div>
      </div>

      {showDetails && (
        <div className="order-details">
          <div className="customer-details">
            <h4>Informations client</h4>
            <p><strong>Nom:</strong> {order.customerName}</p>
            <p><strong>Téléphone:</strong> {order.customerPhone}</p>
          </div>

          <div className="products-details">
            <h4>Produits commandés</h4>
            <div className="products-list">
              {order.products.map(product => (
                <div key={product.id} className="product-item">
                  <span className="product-name">{product.name}</span>
                  <span className="product-quantity">x{product.quantity}</span>
                  <span className="product-price">{product.price} DH</span>
                  <span className="product-subtotal">{product.subtotal} DH</span>
                </div>
              ))}
            </div>
            <div className="total-line">
              <strong>Total: {order.total} DH</strong>
            </div>
          </div>

          <div className="order-actions">
            <div className="status-actions">
              <label>Changer le statut:</label>
              <div className="status-buttons">
                {orderStatuses.map(status => (
                  <button
                    key={status.value}
                    onClick={() => handleStatusChange(status.value)}
                    disabled={isUpdating || order.status === status.value}
                    className={`status-btn ${order.status === status.value ? 'current' : ''}`}
                    style={{ 
                      backgroundColor: order.status === status.value ? status.color : 'transparent',
                      borderColor: status.color,
                      color: order.status === status.value ? 'white' : status.color
                    }}
                  >
                    {status.label}
                  </button>
                ))}
              </div>
            </div>
            
            <button 
              onClick={handleDelete}
              className="delete-btn"
            >
              🗑️ Supprimer
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default OrderCard