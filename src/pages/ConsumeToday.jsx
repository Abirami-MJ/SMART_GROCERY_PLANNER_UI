import React from 'react'
import { Coffee, Clock, CheckCircle } from 'lucide-react'
import { useGrocery } from '../context/GroceryContext'
import { useSettings } from '../context/SettingsContext'
import GroceryItem from '../components/Grocery/GroceryItem'
import Card from '../components/UI/Card'
import Button from '../components/UI/Button'

function ConsumeToday() {
  const { groceries, getExpiryStatus, getItemsExpiringSoon } = useGrocery()
  const { settings, speakAlert } = useSettings()
  
  const expiringSoon = getItemsExpiringSoon()
  const criticalItems = groceries.filter(item => getExpiryStatus(item.expiryDays) === 'critical')
  const warningItems = groceries.filter(item => getExpiryStatus(item.expiryDays) === 'warning')
  
  const handleSpeakList = () => {
    if (expiringSoon.length === 0) {
      speakAlert('No items need to be consumed today. All your groceries are fresh!')
      return
    }
    
    const itemNames = expiringSoon.slice(0, 5).map(item => item.name).join(', ')
    const message = `Items to consume today: ${itemNames}. ${expiringSoon.length > 5 ? `And ${expiringSoon.length - 5} more items.` : ''}`
    speakAlert(message)
  }
  
  const getMealSuggestions = () => {
    const suggestions = []
    
    // Group items by category for meal suggestions
    const categories = expiringSoon.reduce((acc, item) => {
      if (!acc[item.category]) acc[item.category] = []
      acc[item.category].push(item.name)
      return acc
    }, {})
    
    if (categories.Fruits && categories.Dairy) {
      suggestions.push({
        meal: '🥤 Smoothie',
        items: [...categories.Fruits.slice(0, 2), ...categories.Dairy.slice(0, 1)],
        description: 'Blend fruits with yogurt or milk for a healthy smoothie'
      })
    }
    
    if (categories.Vegetables && categories.Meat) {
      suggestions.push({
        meal: '🍳 Stir Fry',
        items: [...categories.Vegetables.slice(0, 3), ...categories.Meat.slice(0, 1)],
        description: 'Quick stir fry with vegetables and protein'
      })
    }
    
    if (categories.Bread && (categories.Dairy || categories.Meat)) {
      suggestions.push({
        meal: '🥪 Sandwich',
        items: [categories.Bread[0], ...(categories.Dairy || categories.Meat).slice(0, 2)],
        description: 'Make a fresh sandwich with your ingredients'
      })
    }
    
    if (categories.Vegetables && categories.Dairy) {
      suggestions.push({
        meal: '🥗 Salad',
        items: [...categories.Vegetables.slice(0, 3), ...categories.Dairy.slice(0, 1)],
        description: 'Fresh salad with cheese or yogurt dressing'
      })
    }
    
    return suggestions.slice(0, 3) // Return max 3 suggestions
  }
  
  const mealSuggestions = getMealSuggestions()
  
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className={`font-bold text-primary mb-2 ${settings.elderMode ? 'text-4xl' : 'text-3xl'}`}>
          Consume Today
        </h1>
        <p className={`text-light ${settings.elderMode ? 'text-xl' : 'text-lg'}`}>
          Smart suggestions for items that need to be used soon
        </p>
      </div>
      
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="text-center">
          <Coffee className="w-8 h-8 text-primary mx-auto mb-2" />
          <div className={`font-bold text-primary mb-1 ${settings.elderMode ? 'text-3xl' : 'text-2xl'}`}>
            {expiringSoon.length}
          </div>
          <div className={`text-light ${settings.elderMode ? 'text-lg' : 'text-base'}`}>
            Items to Use
          </div>
        </Card>
        
        <Card className="text-center">
          <Clock className="w-8 h-8 text-critical mx-auto mb-2" />
          <div className={`font-bold text-critical mb-1 ${settings.elderMode ? 'text-3xl' : 'text-2xl'}`}>
            {criticalItems.length}
          </div>
          <div className={`text-light ${settings.elderMode ? 'text-lg' : 'text-base'}`}>
            Use Today
          </div>
        </Card>
        
        <Card className="text-center">
          <CheckCircle className="w-8 h-8 text-warning mx-auto mb-2" />
          <div className={`font-bold text-warning mb-1 ${settings.elderMode ? 'text-3xl' : 'text-2xl'}`}>
            {warningItems.length}
          </div>
          <div className={`text-light ${settings.elderMode ? 'text-lg' : 'text-base'}`}>
            Use Soon
          </div>
        </Card>
      </div>
      
      {/* Voice Assistant */}
      {settings.voiceAlerts && (
        <Card className="bg-blue-50 border-blue-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
              <div>
                <h3 className={`font-semibold text-blue-800 ${settings.elderMode ? 'text-xl' : 'text-lg'}`}>
                  🎤 Voice Assistant Ready
                </h3>
                <p className={`text-blue-700 ${settings.elderMode ? 'text-lg' : 'text-base'}`}>
                  Click to hear your consume-today list read aloud
                </p>
              </div>
            </div>
            <Button
              variant="primary"
              size={settings.elderMode ? 'lg' : 'md'}
              onClick={handleSpeakList}
            >
              🔊 Read List
            </Button>
          </div>
        </Card>
      )}
      
      {/* Meal Suggestions */}
      {mealSuggestions.length > 0 && (
        <div>
          <h2 className={`font-semibold mb-4 ${settings.elderMode ? 'text-2xl' : 'text-xl'}`}>
            🍽️ Smart Meal Suggestions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {mealSuggestions.map((suggestion, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <div className="text-center mb-3">
                  <div className={`font-semibold mb-2 ${settings.elderMode ? 'text-xl' : 'text-lg'}`}>
                    {suggestion.meal}
                  </div>
                  <p className={`text-light mb-3 ${settings.elderMode ? 'text-base' : 'text-sm'}`}>
                    {suggestion.description}
                  </p>
                </div>
                <div className="space-y-1">
                  <div className={`font-medium text-primary ${settings.elderMode ? 'text-base' : 'text-sm'}`}>
                    Ingredients:
                  </div>
                  {suggestion.items.map((item, itemIndex) => (
                    <div key={itemIndex} className={`text-light ${settings.elderMode ? 'text-base' : 'text-sm'}`}>
                      • {item}
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
      
      {/* Priority Items */}
      {criticalItems.length > 0 && (
        <div>
          <h2 className={`font-semibold mb-4 text-critical ${settings.elderMode ? 'text-2xl' : 'text-xl'}`}>
            🚨 Critical - Use Today!
          </h2>
          <div className="space-y-4">
            {criticalItems.map(item => (
              <GroceryItem key={item.id} item={item} />
            ))}
          </div>
        </div>
      )}
      
      {/* Warning Items */}
      {warningItems.length > 0 && (
        <div>
          <h2 className={`font-semibold mb-4 text-warning ${settings.elderMode ? 'text-2xl' : 'text-xl'}`}>
            ⚡ Use Soon
          </h2>
          <div className="space-y-4">
            {warningItems.map(item => (
              <GroceryItem key={item.id} item={item} />
            ))}
          </div>
        </div>
      )}
      
      {/* Empty State */}
      {expiringSoon.length === 0 && (
        <Card className="text-center py-12">
          <div className="text-6xl mb-4">🎉</div>
          <h3 className={`font-semibold mb-2 ${settings.elderMode ? 'text-2xl' : 'text-xl'}`}>
            All Fresh!
          </h3>
          <p className={`text-light mb-4 ${settings.elderMode ? 'text-lg' : 'text-base'}`}>
            No items need immediate attention. Your groceries are well-managed!
          </p>
          <div className={`text-safe font-medium ${settings.elderMode ? 'text-lg' : 'text-base'}`}>
            ✨ Keep up the great work preventing food waste!
          </div>
        </Card>
      )}
      
      {/* Tips */}
      <Card className="bg-green-50 border-green-200">
        <h3 className={`font-semibold text-green-800 mb-3 ${settings.elderMode ? 'text-xl' : 'text-lg'}`}>
          💡 Consumption Tips
        </h3>
        <ul className={`text-green-700 space-y-2 ${settings.elderMode ? 'text-lg' : 'text-base'}`}>
          <li>• Use critical items first - they expire today</li>
          <li>• Combine ingredients for complete meals</li>
          <li>• Freeze items if you can't use them immediately</li>
          <li>• Share with neighbors or friends if you have too much</li>
          <li>• Cook larger portions and save leftovers</li>
        </ul>
      </Card>
    </div>
  )
}

export default ConsumeToday