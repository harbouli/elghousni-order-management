import { orderStatuses } from '../data/products'

function FilterBar({ statusFilter, onFilterChange, totalOrders, filteredCount }) {
  return (
    <div className="filter-bar">
      <div className="filter-section">
        <h3>Filtrer par statut:</h3>
        <div className="filter-buttons">
          <button
            className={`filter-btn ${statusFilter === 'all' ? 'active' : ''}`}
            onClick={() => onFilterChange('all')}
          >
            Toutes ({totalOrders})
          </button>
          {orderStatuses.map(status => (
            <button
              key={status.value}
              className={`filter-btn ${statusFilter === status.value ? 'active' : ''}`}
              onClick={() => onFilterChange(status.value)}
              style={{ 
                backgroundColor: statusFilter === status.value ? status.color : 'transparent',
                borderColor: status.color,
                color: statusFilter === status.value ? 'white' : status.color
              }}
            >
              {status.label}
            </button>
          ))}
        </div>
      </div>
      
      <div className="results-count">
        {filteredCount} commande{filteredCount !== 1 ? 's' : ''} affichée{filteredCount !== 1 ? 's' : ''}
      </div>
    </div>
  )
}

export default FilterBar