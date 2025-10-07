import { orderStatuses } from '../data/products'

function StatusBadge({ status }) {
  const statusConfig = orderStatuses.find(s => s.value === status)
  
  if (!statusConfig) {
    return <span className="status-badge">Inconnu</span>
  }

  return (
    <span 
      className="status-badge"
      style={{ 
        backgroundColor: statusConfig.color,
        color: 'white'
      }}
    >
      {statusConfig.label}
    </span>
  )
}

export default StatusBadge