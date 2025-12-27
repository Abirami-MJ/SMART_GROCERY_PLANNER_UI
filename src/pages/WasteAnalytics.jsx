import React from 'react'
import { BarChart3, TrendingDown, TrendingUp, DollarSign, Leaf } from 'lucide-react'
import { useGrocery } from '../context/GroceryContext'
import { useSettings } from '../context/SettingsContext'
import Card from '../components/UI/Card'
import ProgressBar from '../components/UI/ProgressBar'

function WasteAnalytics() {
  const { wasteHistory, consumedItems, getWeeklyWasteStats } = useGrocery()
  const { settings } = useSettings()
  
  const weeklyStats = getWeeklyWasteStats()
  
  // Calculate monthly stats
  const oneMonthAgo = Date.now() - (30 * 24 * 60 * 60 * 1000)
  const monthlyWaste = wasteHistory.filter(item => item.wastedAt > oneMonthAgo)
  const monthlyConsumed = consumedItems.filter(item => item.consumedAt > oneMonthAgo)
  const monthlyTotal = monthlyWaste.length + monthlyConsumed.length
  const monthlyWastePercentage = monthlyTotal > 0 ? Math.round((monthlyWaste.length / monthlyTotal) * 100) : 0
  
  // Calculate savings (assuming average grocery item costs $3)
  const avgItemCost = 3
  const moneySaved = consumedItems.length * avgItemCost
  const moneyWasted = wasteHistory.length * avgItemCost
  
  // Environmental impact (rough estimates)
  const co2SavedPerItem = 0.5 // kg CO2 per item saved
  const co2Saved = consumedItems.length * co2SavedPerItem
  const co2Wasted = wasteHistory.length * co2SavedPerItem
  
  // Category breakdown
  const wasteByCategory = wasteHistory.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + 1
    return acc
  }, {})
  
  const consumedByCategory = consumedItems.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + 1
    return acc
  }, {})
  
  const allCategories = [...new Set([...Object.keys(wasteByCategory), ...Object.keys(consumedByCategory)])]
  
  const getWasteLevel = (percentage) => {
    if (percentage <= 10) return { level: 'Excellent', color: 'text-safe', icon: '🌟' }
    if (percentage <= 25) return { level: 'Good', color: 'text-safe', icon: '👍' }
    if (percentage <= 40) return { level: 'Fair', color: 'text-warning', icon: '⚠️' }
    return { level: 'Needs Improvement', color: 'text-critical', icon: '🚨' }
  }
  
  const wasteLevel = getWasteLevel(weeklyStats.wastePercentage)
  
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }
  
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className={`font-bold text-primary mb-2 ${settings.elderMode ? 'text-4xl' : 'text-3xl'}`}>
          Waste Analytics
        </h1>
        <p className={`text-light ${settings.elderMode ? 'text-xl' : 'text-lg'}`}>
          Track your progress in reducing food waste and saving money
        </p>
      </div>
      
      {/* Overall Performance */}
      <Card>
        <div className="text-center mb-6">
          <div className={`text-6xl mb-4`}>{wasteLevel.icon}</div>
          <h2 className={`font-bold mb-2 ${wasteLevel.color} ${settings.elderMode ? 'text-3xl' : 'text-2xl'}`}>
            {wasteLevel.level}
          </h2>
          <p className={`text-light ${settings.elderMode ? 'text-lg' : 'text-base'}`}>
            Your weekly waste performance
          </p>
        </div>
        
        <div className="mb-4">
          <ProgressBar 
            percentage={100 - weeklyStats.wastePercentage}
            status={weeklyStats.wastePercentage <= 10 ? 'safe' : weeklyStats.wastePercentage <= 25 ? 'warning' : 'critical'}
            size={settings.elderMode ? 'xl' : 'lg'}
          />
        </div>
        
        <div className="text-center">
          <div className={`font-bold mb-1 ${settings.elderMode ? 'text-2xl' : 'text-xl'}`}>
            {100 - weeklyStats.wastePercentage}% Success Rate
          </div>
          <p className={`text-light ${settings.elderMode ? 'text-lg' : 'text-base'}`}>
            {weeklyStats.consumedItems} items consumed, {weeklyStats.wastedItems} items wasted this week
          </p>
        </div>
      </Card>
      
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="text-center">
          <BarChart3 className="w-8 h-8 text-primary mx-auto mb-2" />
          <div className={`font-bold text-primary mb-1 ${settings.elderMode ? 'text-2xl' : 'text-xl'}`}>
            {weeklyStats.wastePercentage}%
          </div>
          <div className={`text-light ${settings.elderMode ? 'text-base' : 'text-sm'}`}>
            Weekly Waste
          </div>
        </Card>
        
        <Card className="text-center">
          <DollarSign className="w-8 h-8 text-safe mx-auto mb-2" />
          <div className={`font-bold text-safe mb-1 ${settings.elderMode ? 'text-2xl' : 'text-xl'}`}>
            {formatCurrency(moneySaved)}
          </div>
          <div className={`text-light ${settings.elderMode ? 'text-base' : 'text-sm'}`}>
            Money Saved
          </div>
        </Card>
        
        <Card className="text-center">
          <DollarSign className="w-8 h-8 text-critical mx-auto mb-2" />
          <div className={`font-bold text-critical mb-1 ${settings.elderMode ? 'text-2xl' : 'text-xl'}`}>
            {formatCurrency(moneyWasted)}
          </div>
          <div className={`text-light ${settings.elderMode ? 'text-base' : 'text-sm'}`}>
            Money Wasted
          </div>
        </Card>
        
        <Card className="text-center">
          <Leaf className="w-8 h-8 text-safe mx-auto mb-2" />
          <div className={`font-bold text-safe mb-1 ${settings.elderMode ? 'text-2xl' : 'text-xl'}`}>
            {co2Saved.toFixed(1)}kg
          </div>
          <div className={`text-light ${settings.elderMode ? 'text-base' : 'text-sm'}`}>
            CO₂ Saved
          </div>
        </Card>
      </div>
      
      {/* Trends */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <h3 className={`font-semibold mb-4 ${settings.elderMode ? 'text-xl' : 'text-lg'}`}>
            📊 Weekly vs Monthly
          </h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className={settings.elderMode ? 'text-lg' : 'text-base'}>Weekly Waste</span>
                <span className={`font-semibold ${weeklyStats.wastePercentage <= 25 ? 'text-safe' : 'text-critical'} ${settings.elderMode ? 'text-lg' : 'text-base'}`}>
                  {weeklyStats.wastePercentage}%
                </span>
              </div>
              <ProgressBar 
                percentage={weeklyStats.wastePercentage}
                status={weeklyStats.wastePercentage <= 10 ? 'safe' : weeklyStats.wastePercentage <= 25 ? 'warning' : 'critical'}
                showPercentage={false}
              />
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className={settings.elderMode ? 'text-lg' : 'text-base'}>Monthly Waste</span>
                <span className={`font-semibold ${monthlyWastePercentage <= 25 ? 'text-safe' : 'text-critical'} ${settings.elderMode ? 'text-lg' : 'text-base'}`}>
                  {monthlyWastePercentage}%
                </span>
              </div>
              <ProgressBar 
                percentage={monthlyWastePercentage}
                status={monthlyWastePercentage <= 10 ? 'safe' : monthlyWastePercentage <= 25 ? 'warning' : 'critical'}
                showPercentage={false}
              />
            </div>
          </div>
        </Card>
        
        <Card>
          <h3 className={`font-semibold mb-4 ${settings.elderMode ? 'text-xl' : 'text-lg'}`}>
            🌱 Environmental Impact
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className={settings.elderMode ? 'text-lg' : 'text-base'}>CO₂ Saved</span>
              <span className={`font-semibold text-safe ${settings.elderMode ? 'text-lg' : 'text-base'}`}>
                {co2Saved.toFixed(1)}kg
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className={settings.elderMode ? 'text-lg' : 'text-base'}>CO₂ Wasted</span>
              <span className={`font-semibold text-critical ${settings.elderMode ? 'text-lg' : 'text-base'}`}>
                {co2Wasted.toFixed(1)}kg
              </span>
            </div>
            <div className="pt-2 border-t border-border">
              <div className="flex items-center justify-between">
                <span className={`font-medium ${settings.elderMode ? 'text-lg' : 'text-base'}`}>Net Impact</span>
                <span className={`font-bold ${co2Saved > co2Wasted ? 'text-safe' : 'text-critical'} ${settings.elderMode ? 'text-lg' : 'text-base'}`}>
                  {co2Saved > co2Wasted ? '+' : ''}{(co2Saved - co2Wasted).toFixed(1)}kg
                </span>
              </div>
            </div>
          </div>
        </Card>
      </div>
      
      {/* Category Breakdown */}
      {allCategories.length > 0 && (
        <Card>
          <h3 className={`font-semibold mb-4 ${settings.elderMode ? 'text-xl' : 'text-lg'}`}>
            📋 Waste by Category
          </h3>
          <div className="space-y-4">
            {allCategories.map(category => {
              const wasted = wasteByCategory[category] || 0
              const consumed = consumedByCategory[category] || 0
              const total = wasted + consumed
              const wastePercentage = total > 0 ? Math.round((wasted / total) * 100) : 0
              
              return (
                <div key={category}>
                  <div className="flex justify-between items-center mb-2">
                    <span className={`font-medium ${settings.elderMode ? 'text-lg' : 'text-base'}`}>
                      {category}
                    </span>
                    <div className="text-right">
                      <div className={`font-semibold ${wastePercentage <= 25 ? 'text-safe' : 'text-critical'} ${settings.elderMode ? 'text-base' : 'text-sm'}`}>
                        {wastePercentage}% waste
                      </div>
                      <div className={`text-light ${settings.elderMode ? 'text-base' : 'text-sm'}`}>
                        {consumed} used, {wasted} wasted
                      </div>
                    </div>
                  </div>
                  <ProgressBar 
                    percentage={wastePercentage}
                    status={wastePercentage <= 10 ? 'safe' : wastePercentage <= 25 ? 'warning' : 'critical'}
                    showPercentage={false}
                  />
                </div>
              )
            })}
          </div>
        </Card>
      )}
      
      {/* Achievements */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <h3 className={`font-semibold mb-4 ${settings.elderMode ? 'text-xl' : 'text-lg'}`}>
          🏆 Your Achievements
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {consumedItems.length >= 10 && (
            <div className="text-center">
              <div className="text-3xl mb-2">🌟</div>
              <div className={`font-semibold ${settings.elderMode ? 'text-lg' : 'text-base'}`}>
                Food Saver
              </div>
              <div className={`text-light ${settings.elderMode ? 'text-base' : 'text-sm'}`}>
                Consumed 10+ items
              </div>
            </div>
          )}
          
          {weeklyStats.wastePercentage <= 10 && (
            <div className="text-center">
              <div className="text-3xl mb-2">🎯</div>
              <div className={`font-semibold ${settings.elderMode ? 'text-lg' : 'text-base'}`}>
                Waste Warrior
              </div>
              <div className={`text-light ${settings.elderMode ? 'text-base' : 'text-sm'}`}>
                ≤10% weekly waste
              </div>
            </div>
          )}
          
          {moneySaved >= 50 && (
            <div className="text-center">
              <div className="text-3xl mb-2">💰</div>
              <div className={`font-semibold ${settings.elderMode ? 'text-lg' : 'text-base'}`}>
                Money Saver
              </div>
              <div className={`text-light ${settings.elderMode ? 'text-base' : 'text-sm'}`}>
                Saved ${moneySaved}+
              </div>
            </div>
          )}
        </div>
      </Card>
      
      {/* Empty State */}
      {wasteHistory.length === 0 && consumedItems.length === 0 && (
        <Card className="text-center py-12">
          <div className="text-6xl mb-4">📊</div>
          <h3 className={`font-semibold mb-2 ${settings.elderMode ? 'text-2xl' : 'text-xl'}`}>
            No Data Yet
          </h3>
          <p className={`text-light ${settings.elderMode ? 'text-lg' : 'text-base'}`}>
            Start tracking groceries to see your waste analytics and savings
          </p>
        </Card>
      )}
    </div>
  )
}

export default WasteAnalytics