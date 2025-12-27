import React from 'react'
import { Link } from 'react-router-dom'
import { Plus, Clock, Bell, Coffee, TrendingUp, Heart } from 'lucide-react'
import { useGrocery } from '../context/GroceryContext'
import { useSettings } from '../context/SettingsContext'
import Card from '../components/UI/Card'
import Button from '../components/UI/Button'
import ProgressBar from '../components/UI/ProgressBar'
import GroceryItem from '../components/Grocery/GroceryItem'

function Dashboard() {
  const { 
    groceries, 
    getFoodHealthScore, 
    getItemsExpiringSoon, 
    getWeeklyWasteStats,
    getExpiryStatus 
  } = useGrocery()
  const { settings } = useSettings()
  
  const healthScore = getFoodHealthScore()
  const expiringSoon = getItemsExpiringSoon()
  const wasteStats = getWeeklyWasteStats()
  
  const getHealthMessage = (score) => {
    if (score >= 90) return { message: 'Excellent! Your food is fresh and well-managed! 🌟', emoji: '🌟' }
    if (score >= 80) return { message: 'Great job! Keep up the good food management! 👍', emoji: '👍' }
    if (score >= 60) return { message: 'Good work, but check items expiring soon. 📋', emoji: '📋' }
    if (score >= 40) return { message: 'Time to use some items before they expire! ⏰', emoji: '⏰' }
    return { message: 'Urgent! Several items need immediate attention! 🚨', emoji: '🚨' }
  }
  
  const healthInfo = getHealthMessage(healthScore)
  
  const quickActions = [
    { 
      to: '/add-grocery', 
      icon: Plus, 
      label: 'Add Grocery', 
      color: 'bg-primary',
      description: 'Add new items to track'
    },
    { 
      to: '/expiry-tracker', 
      icon: Clock, 
      label: 'Live Tracker', 
      color: 'bg-warning',
      description: 'Watch expiry progress'
    },
    { 
      to: '/smart-alerts', 
      icon: Bell, 
      label: 'Alerts', 
      color: 'bg-critical',
      description: `${expiringSoon.length} items need attention`,
      badge: expiringSoon.length
    },
    { 
      to: '/consume-today', 
      icon: Coffee, 
      label: 'Consume Today', 
      color: 'bg-safe',
      description: 'Items to use now'
    }
  ]
  
  return (
    <div className="space-y-8">
      {/* Welcome Message */}
      <div className="text-center">
        <h1 className={`font-bold text-primary mb-2 ${settings.elderMode ? 'text-4xl' : 'text-3xl'}`}>
          Welcome to Smart Grocery Planner
        </h1>
        <p className={`text-light ${settings.elderMode ? 'text-xl' : 'text-lg'}`}>
          Visualize freshness. Reduce waste. Eat smarter.
        </p>
      </div>
      
      {/* Food Health Score */}
      <Card className="text-center">
        <div className="flex items-center justify-center space-x-4 mb-4">
          <Heart className={`w-12 h-12 ${
            healthScore >= 80 ? 'text-safe' : 
            healthScore >= 60 ? 'text-warning' : 'text-critical'
          }`} />
          <div>
            <div className={`font-bold ${
              healthScore >= 80 ? 'text-safe' : 
              healthScore >= 60 ? 'text-warning' : 'text-critical'
            } ${settings.elderMode ? 'text-5xl' : 'text-4xl'}`}>
              {healthScore}%
            </div>
            <div className={`text-light ${settings.elderMode ? 'text-lg' : 'text-base'}`}>
              Food Health Score
            </div>
          </div>
        </div>
        
        <div className="mb-4">
          <ProgressBar 
            percentage={healthScore}
            status={healthScore >= 80 ? 'safe' : healthScore >= 60 ? 'warning' : 'critical'}
            size={settings.elderMode ? 'xl' : 'lg'}
            showPercentage={false}
          />
        </div>
        
        <p className={`font-medium ${settings.elderMode ? 'text-xl' : 'text-lg'}`}>
          {healthInfo.emoji} {healthInfo.message}
        </p>
      </Card>
      
      {/* Quick Actions */}
      <div>
        <h2 className={`font-semibold mb-4 ${settings.elderMode ? 'text-2xl' : 'text-xl'}`}>
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action) => (
            <Link key={action.to} to={action.to}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                <div className="flex items-center space-x-3 mb-3">
                  <div className={`p-3 rounded-lg ${action.color} text-white relative`}>
                    <action.icon className={`${settings.elderMode ? 'w-8 h-8' : 'w-6 h-6'}`} />
                    {action.badge && action.badge > 0 && (
                      <span className="absolute -top-2 -right-2 bg-critical text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                        {action.badge}
                      </span>
                    )}
                  </div>
                  <div>
                    <h3 className={`font-semibold ${settings.elderMode ? 'text-xl' : 'text-lg'}`}>
                      {action.label}
                    </h3>
                    <p className={`text-light ${settings.elderMode ? 'text-base' : 'text-sm'}`}>
                      {action.description}
                    </p>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
      
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="text-center">
          <div className={`font-bold text-primary mb-2 ${settings.elderMode ? 'text-3xl' : 'text-2xl'}`}>
            {groceries.length}
          </div>
          <div className={`text-light ${settings.elderMode ? 'text-lg' : 'text-base'}`}>
            Items Tracked
          </div>
        </Card>
        
        <Card className="text-center">
          <div className={`font-bold text-warning mb-2 ${settings.elderMode ? 'text-3xl' : 'text-2xl'}`}>
            {expiringSoon.length}
          </div>
          <div className={`text-light ${settings.elderMode ? 'text-lg' : 'text-base'}`}>
            Expiring Soon
          </div>
        </Card>
        
        <Card className="text-center">
          <div className={`font-bold mb-2 ${settings.elderMode ? 'text-3xl' : 'text-2xl'} ${
            wasteStats.wastePercentage <= 10 ? 'text-safe' : 
            wasteStats.wastePercentage <= 25 ? 'text-warning' : 'text-critical'
          }`}>
            {wasteStats.wastePercentage}%
          </div>
          <div className={`text-light ${settings.elderMode ? 'text-lg' : 'text-base'}`}>
            Weekly Waste
          </div>
        </Card>
      </div>
      
      {/* Items Expiring Soon */}
      {expiringSoon.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className={`font-semibold ${settings.elderMode ? 'text-2xl' : 'text-xl'}`}>
              ⚡ Items Expiring Soon
            </h2>
            <Link to="/consume-today">
              <Button variant="warning" size={settings.elderMode ? 'lg' : 'md'}>
                View All
              </Button>
            </Link>
          </div>
          <div className="space-y-4">
            {expiringSoon.slice(0, 3).map(item => (
              <GroceryItem key={item.id} item={item} />
            ))}
          </div>
        </div>
      )}
      
      {/* Empty State */}
      {groceries.length === 0 && (
        <Card className="text-center py-12">
          <div className="text-6xl mb-4">🛒</div>
          <h3 className={`font-semibold mb-2 ${settings.elderMode ? 'text-2xl' : 'text-xl'}`}>
            No groceries tracked yet
          </h3>
          <p className={`text-light mb-6 ${settings.elderMode ? 'text-lg' : 'text-base'}`}>
            Start by adding your first grocery item to track its freshness
          </p>
          <Link to="/add-grocery">
            <Button size={settings.elderMode ? 'xl' : 'lg'}>
              <Plus className="w-5 h-5 mr-2" />
              Add Your First Item
            </Button>
          </Link>
        </Card>
      )}
    </div>
  )
}

export default Dashboard