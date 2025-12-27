import React, { useState } from 'react'
import { Filter, SortAsc, SortDesc } from 'lucide-react'
import { useGrocery } from '../context/GroceryContext'
import { useSettings } from '../context/SettingsContext'
import GroceryItem from '../components/Grocery/GroceryItem'
import Button from '../components/UI/Button'
import Card from '../components/UI/Card'

function ExpiryTracker() {
  const { groceries, getExpiryStatus } = useGrocery()
  const { settings } = useSettings()
  
  const [sortBy, setSortBy] = useState('expiry') // expiry, name, category
  const [sortOrder, setSortOrder] = useState('asc') // asc, desc
  const [filterStatus, setFilterStatus] = useState('all') // all, critical, warning, safe, expired
  
  const statusCounts = {
    all: groceries.length,
    critical: groceries.filter(item => getExpiryStatus(item.expiryDays) === 'critical').length,
    warning: groceries.filter(item => getExpiryStatus(item.expiryDays) === 'warning').length,
    safe: groceries.filter(item => getExpiryStatus(item.expiryDays) === 'safe').length,
    expired: groceries.filter(item => getExpiryStatus(item.expiryDays) === 'expired').length
  }
  
  const filteredAndSortedGroceries = groceries
    .filter(item => {
      if (filterStatus === 'all') return true
      return getExpiryStatus(item.expiryDays) === filterStatus
    })
    .sort((a, b) => {
      let comparison = 0
      
      switch (sortBy) {
        case 'expiry':
          comparison = a.expiryDays - b.expiryDays
          break
        case 'name':
          comparison = a.name.localeCompare(b.name)
          break
        case 'category':
          comparison = a.category.localeCompare(b.category)
          break
        default:
          comparison = 0
      }
      
      return sortOrder === 'asc' ? comparison : -comparison
    })
  
  const toggleSort = (newSortBy) => {
    if (sortBy === newSortBy) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(newSortBy)
      setSortOrder('asc')
    }
  }
  
  const filterButtons = [
    { key: 'all', label: 'All Items', color: 'secondary' },
    { key: 'critical', label: 'Critical', color: 'danger' },
    { key: 'warning', label: 'Warning', color: 'warning' },
    { key: 'safe', label: 'Safe', color: 'success' },
    { key: 'expired', label: 'Expired', color: 'ghost' }
  ]
  
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className={`font-bold text-primary mb-2 ${settings.elderMode ? 'text-4xl' : 'text-3xl'}`}>
          Live Expiry Tracker
        </h1>
        <p className={`text-light ${settings.elderMode ? 'text-xl' : 'text-lg'}`}>
          Watch your groceries' freshness decay in real-time
        </p>
      </div>
      
      {/* Filters and Sorting */}
      <Card>
        <div className="space-y-4">
          {/* Status Filters */}
          <div>
            <h3 className={`font-semibold mb-3 flex items-center ${settings.elderMode ? 'text-xl' : 'text-lg'}`}>
              <Filter className="w-5 h-5 mr-2" />
              Filter by Status
            </h3>
            <div className="flex flex-wrap gap-2">
              {filterButtons.map(filter => (
                <Button
                  key={filter.key}
                  variant={filterStatus === filter.key ? 'primary' : filter.color}
                  size={settings.elderMode ? 'lg' : 'md'}
                  onClick={() => setFilterStatus(filter.key)}
                  className="flex items-center space-x-2"
                >
                  <span>{filter.label}</span>
                  <span className="bg-white bg-opacity-20 px-2 py-1 rounded-full text-xs">
                    {statusCounts[filter.key]}
                  </span>
                </Button>
              ))}
            </div>
          </div>
          
          {/* Sorting */}
          <div>
            <h3 className={`font-semibold mb-3 ${settings.elderMode ? 'text-xl' : 'text-lg'}`}>
              Sort by
            </h3>
            <div className="flex flex-wrap gap-2">
              {[
                { key: 'expiry', label: 'Expiry Time' },
                { key: 'name', label: 'Name' },
                { key: 'category', label: 'Category' }
              ].map(sort => (
                <Button
                  key={sort.key}
                  variant={sortBy === sort.key ? 'primary' : 'secondary'}
                  size={settings.elderMode ? 'lg' : 'md'}
                  onClick={() => toggleSort(sort.key)}
                  className="flex items-center space-x-2"
                >
                  <span>{sort.label}</span>
                  {sortBy === sort.key && (
                    sortOrder === 'asc' ? 
                    <SortAsc className="w-4 h-4" /> : 
                    <SortDesc className="w-4 h-4" />
                  )}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </Card>
      
      {/* Live Animation Notice */}
      <Card className="bg-blue-50 border-blue-200">
        <div className="flex items-center space-x-3">
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
          <div>
            <h3 className={`font-semibold text-blue-800 ${settings.elderMode ? 'text-xl' : 'text-lg'}`}>
              🕐 Live Tracking Active
            </h3>
            <p className={`text-blue-700 ${settings.elderMode ? 'text-lg' : 'text-base'}`}>
              Progress bars update in real-time. 1 day = 10 seconds for demo purposes.
            </p>
          </div>
        </div>
      </Card>
      
      {/* Grocery Items */}
      {filteredAndSortedGroceries.length > 0 ? (
        <div className="space-y-4">
          {filteredAndSortedGroceries.map(item => (
            <GroceryItem key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <Card className="text-center py-12">
          <div className="text-6xl mb-4">
            {filterStatus === 'all' ? '📦' : 
             filterStatus === 'critical' ? '🚨' :
             filterStatus === 'warning' ? '⚡' :
             filterStatus === 'safe' ? '✅' : '💀'}
          </div>
          <h3 className={`font-semibold mb-2 ${settings.elderMode ? 'text-2xl' : 'text-xl'}`}>
            {filterStatus === 'all' ? 'No groceries to track' : 
             `No ${filterStatus} items found`}
          </h3>
          <p className={`text-light ${settings.elderMode ? 'text-lg' : 'text-base'}`}>
            {filterStatus === 'all' ? 
              'Add some groceries to start tracking their freshness' :
              `Try selecting a different filter to see other items`}
          </p>
        </Card>
      )}
    </div>
  )
}

export default ExpiryTracker