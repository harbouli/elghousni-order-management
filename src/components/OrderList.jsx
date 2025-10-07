import OrderCard from './OrderCard'

function OrderList({ orders, onUpdateStatus, onDeleteOrder }) {
  if (orders.length === 0) {
    return (
      <div className="order-list">
        <div className="empty-state">
          <h3>Aucune commande trouvée</h3>
          <p>Les commandes apparaîtront ici une fois créées.</p>
        </div>
      </div>
    )
  }

  const sortedOrders = [...orders].sort((a, b) => b.id - a.id)

  return (
    <div className="order-list">
      <div className="orders-container">
        {sortedOrders.map(order => (
          <OrderCard
            key={order.id}
            order={order}
            onUpdateStatus={onUpdateStatus}
            onDeleteOrder={onDeleteOrder}
          />
        ))}
      </div>
    </div>
  )
}

export default OrderList