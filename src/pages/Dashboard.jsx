import React from 'react'
import { Link } from 'react-router-dom'
import { Plus, Clock, Bell, Coffee, TrendingUp, Heart, Sparkles } from 'lucide-react'
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
    if (score >= 90) return { message: 'Excellent! Your food is fresh and well-managed!', emoji: '🌟' }
    if (score >= 80) return { message: 'Great job! Keep up the good food management!', emoji: '👍' }
    if (score >= 60) return { message: 'Good work, but check items expiring soon.', emoji: '📋' }
    if (score >= 40) return { message: 'Time to use some items before they expire!', emoji: '⏰' }
    return { message: 'Urgent! Several items need immediate attention!', emoji: '🚨' }
  }
  
  const healthInfo = getHealthMessage(healthScore)
  
  const quickActions = [
    { 
      to: '/add-grocery', 
      icon: Plus, 
      label: 'Add Grocery', 
      color: 'from-emerald-500 to-teal-600',
      description: 'Add new items to track',
      variant: 'success'
    },
    { 
      to: '/expiry-tracker', 
      icon: Clock, 
      label: 'Live Tracker', 
      color: 'from-orange-500 to-red-600',
      description: 'Watch expiry progress',
      variant: 'warning'
    },
    { 
      to: '/smart-alerts', 
      icon: Bell, 
      label: 'Alerts', 
      color: 'from-red-500 to-pink-600',
      description: `${expiringSoon.length} items need attention`,
      badge: expiringSoon.length,
      variant: 'danger'
    },
    { 
      to: '/consume-today', 
      icon: Coffee, 
      label: 'Consume Today', 
      color: 'from-blue-500 to-purple-600',
      description: 'Items to use now',
      variant: 'default'
    }
  ]
  
  return (
    <div className="space-y-12">
      {/* Welcome Hero Section */}
      <div className="text-center py-8">
        <div className="flex items-center justify-center mb-6">
          <div className="bg-gradient-primary p-4 rounded-2xl shadow-2xl">
            <Sparkles className="w-12 h-12 text-white" />
          </div>
        </div>
        <h1 className={`font-bold bg-gradient-primary bg-clip-text text-transparent mb-4 ${settings.elderMode ? 'text-5xl' : 'text-4xl'}`}>
          Welcome to Smart Grocery Planner
        </h1>
        <p className={`text-white/80 max-w-2xl mx-auto ${settings.elderMode ? 'text-2xl' : 'text-xl'}`}>
          Visualize freshness. Reduce waste. Eat smarter.
        </p>
      </div>
      
      {/* Food Health Score - Hero Card */}
      <Card variant="glass" padding="lg" className="text-center">
        <div className="flex items-center justify-center space-x-6 mb-6">
          <Heart className={`w-16 h-16 ${
            healthScore >= 80 ? 'text-safe' : 
            healthScore >= 60 ? 'text-warning' : 'text-critical'
          }`} />
          <div>
            <div className={`font-bold ${
              healthScore >= 80 ? 'text-safe' : 
              healthScore >= 60 ? 'text-warning' : 'text-critical'
            } ${settings.elderMode ? 'text-6xl' : 'text-5xl'} mb-2`}>
              {healthScore}%
            </div>
            <div className={`text-white/80 ${settings.elderMode ? 'text-xl' : 'text-lg'}`}>
              Food Health Score
            </div>
          </div>
        </div>
        
        <div className="mb-6">
          <ProgressBar 
            percentage={healthScore}
            status={healthScore >= 80 ? 'safe' : healthScore >= 60 ? 'warning' : 'critical'}
            size={settings.elderMode ? 'xl' : 'lg'}
            showPercentage={false}
          />
        </div>
        
        <p className={`font-medium text-white ${settings.elderMode ? 'text-2xl' : 'text-xl'}`}>
          {healthInfo.emoji} {healthInfo.message}
        </p>
      </Card>
      
      {/* Quick Actions */}
      <div>
        <h2 className={`font-semibold mb-8 text-white text-center ${settings.elderMode ? 'text-3xl' : 'text-2xl'}`}>
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickActions.map((action) => (
            <Link key={action.to} to={action.to} className="group">
              <Card variant="glass" className="h-full group-hover:scale-105 transition-all duration-300">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className={`p-4 rounded-2xl bg-gradient-to-r ${action.color} text-white relative shadow-lg`}>
                    <action.icon className={`${settings.elderMode ? 'w-10 h-10' : 'w-8 h-8'}`} />
                    {action.badge && action.badge > 0 && (
                      <span className="absolute -top-2 -right-2 bg-critical text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center shadow-lg">
                        {action.badge}
                      </span>
                    )}
                  </div>
                  <div>
                    <h3 className={`font-semibold text-white mb-2 ${settings.elderMode ? 'text-2xl' : 'text-xl'}`}>
                      {action.label}
                    </h3>
                    <p className={`text-white/70 ${settings.elderMode ? 'text-lg' : 'text-base'}`}>
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card variant="glass" className="text-center">
          <div className={`font-bold text-white mb-3 ${settings.elderMode ? 'text-4xl' : 'text-3xl'}`}>
            {groceries.length}
          </div>
          <div className={`text-white/80 ${settings.elderMode ? 'text-xl' : 'text-lg'}`}>
            Items Tracked
          </div>
        </Card>
        
        <Card variant="glass" className="text-center">
          <div className={`font-bold text-warning mb-3 ${settings.elderMode ? 'text-4xl' : 'text-3xl'}`}>
            {expiringSoon.length}
          </div>
          <div className={`text-white/80 ${settings.elderMode ? 'text-xl' : 'text-lg'}`}>
            Expiring Soon
          </div>
        </Card>
        
        <Card variant="glass" className="text-center">
          <div className={`font-bold mb-3 ${settings.elderMode ? 'text-4xl' : 'text-3xl'} ${
            wasteStats.wastePercentage <= 10 ? 'text-safe' : 
            wasteStats.wastePercentage <= 25 ? 'text-warning' : 'text-critical'
          }`}>
            {wasteStats.wastePercentage}%
          </div>
          <div className={`text-white/80 ${settings.elderMode ? 'text-xl' : 'text-lg'}`}>
            Weekly Waste
          </div>
        </Card>
      </div>
      
      {/* Items Expiring Soon */}
      {expiringSoon.length > 0 && (
        <Card variant="glass">
          <div className="flex items-center justify-between mb-6">
            <h2 className={`font-semibold text-white ${settings.elderMode ? 'text-3xl' : 'text-2xl'}`}>
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
        </Card>
      )}
      
      {/* Empty State */}
      {groceries.length === 0 && (
        <Card variant="glass" className="text-center py-16">
          <div className="text-8xl mb-6">🛒</div>
          <h3 className={`font-semibold mb-4 text-white ${settings.elderMode ? 'text-3xl' : 'text-2xl'}`}>
            No groceries tracked yet
          </h3>
          <p className={`text-white/80 mb-8 max-w-md mx-auto ${settings.elderMode ? 'text-xl' : 'text-lg'}`}>
            Start by adding your first grocery item to track its freshness
          </p>
          <Link to="/add-grocery">
            <Button variant="success" size={settings.elderMode ? 'xl' : 'lg'}>
              <Plus className="w-6 h-6 mr-3" />
              Add Your First Item
            </Button>
          </Link>
        </Card>
      )}
    </div>
  )
}

export default Dashboard