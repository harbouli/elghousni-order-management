import { useState } from 'react'
import './App.css'
import OrderForm from './components/OrderForm'
import OrderList from './components/OrderList'
import FilterBar from './components/FilterBar'

function App() {
  const [orders, setOrders] = useState([])
  const [currentView, setCurrentView] = useState('form')
  const [statusFilter, setStatusFilter] = useState('all')
  // const [sidebarOpen, setSidebarOpen] = useState(false)

  const addOrder = (orderData) => {
    const newOrder = {
      id: Date.now(),
      ...orderData,
      status: 'pending',
      createdAt: new Date().toLocaleDateString('fr-FR')
    }
    setOrders([...orders, newOrder])
    setCurrentView('list')
    // setSidebarOpen(false) // Close sidebar on mobile after navigation
  }

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ))
  }

  const deleteOrder = (orderId) => {
    setOrders(orders.filter(order => order.id !== orderId))
  }

  const filteredOrders = statusFilter === 'all' 
    ? orders 
    : orders.filter(order => order.status === statusFilter)

  const handleNavigation = (view) => {
    setCurrentView(view)
    setSidebarOpen(false) // Close sidebar on mobile after navigation
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <button 
            className="mobile-menu-btn"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            ☰
          </button>
          <div className="header-text">
            <h1>🫒 Coopérative El harbouli</h1>
            <p>Système de</p>
          </div>
        </div>
      </header>

      <div className="app-layout">
        <aside className={`sidebar ${sidebarOpen ? 'sidebar-open' : ''}`}>
          <nav className="sidebar-nav">
            <button 
              className={`sidebar-btn ${currentView === 'form' ? 'active' : ''}`}
              onClick={() => handleNavigation('form')}
            >
              <span className="sidebar-icon">📝</span>
              <span className="sidebar-text">Nouvelle Commande</span>
            </button>
            <button 
              className={`sidebar-btn ${currentView === 'list' ? 'active' : ''}`}
              onClick={() => handleNavigation('list')}
            >
              <span className="sidebar-icon">📋</span>
              <span className="sidebar-text">Liste des Commandes</span>
              <span className="sidebar-badge">{orders.length}</span>
            </button>
          </nav>
        </aside>

        <main className="main-content">
          {currentView === 'form' ? (
            <OrderForm onAddOrder={addOrder} />
          ) : (
            <div className="orders-section">
              <FilterBar 
                statusFilter={statusFilter}
                onFilterChange={setStatusFilter}
                totalOrders={orders.length}
                filteredCount={filteredOrders.length}
              />
              <OrderList 
                orders={filteredOrders}
                onUpdateStatus={updateOrderStatus}
                onDeleteOrder={deleteOrder}
              />
            </div>
          )}
        </main>
      </div>

      {sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)}></div>}
    </div>
  )
}

export default App