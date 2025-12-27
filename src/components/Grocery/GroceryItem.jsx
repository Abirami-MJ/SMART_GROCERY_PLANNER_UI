import React, { useEffect } from 'react'
import { Trash2, Check, Clock } from 'lucide-react'
import { useGrocery } from '../../context/GroceryContext'
import { useSettings } from '../../context/SettingsContext'
import Card from '../UI/Card'
import Button from '../UI/Button'
import ProgressBar from '../UI/ProgressBar'

function GroceryItem({ item, showActions = true }) {
  const { consumeItem, markAsWaste, getExpiryStatus, getExpiryPercentage } = useGrocery()
  const { speakAlert, playSound, settings } = useSettings()
  
  const status = getExpiryStatus(item.expiryDays)
  const percentage = getExpiryPercentage(item)
  
  // Voice alerts for critical items
  useEffect(() => {
    if (status === 'critical' && settings.voiceAlerts) {
      const message = `${item.name} is expiring soon. Only ${Math.ceil(item.expiryDays)} days left.`
      speakAlert(message)
    }
  }, [status, item.name, item.expiryDays, settings.voiceAlerts, speakAlert])
  
  // Sound alerts
  useEffect(() => {
    if (status === 'critical') {
      playSound('critical')
    } else if (status === 'warning') {
      playSound('warning')
    }
  }, [status, playSound])
  
  const handleConsume = () => {
    consumeItem(item.id)
    playSound('success')
    if (settings.voiceAlerts) {
      speakAlert(`${item.name} marked as consumed. Great job!`)
    }
  }
  
  const handleWaste = () => {
    markAsWaste(item.id)
    playSound('warning')
    if (settings.voiceAlerts) {
      speakAlert(`${item.name} marked as waste.`)
    }
  }
  
  const formatTimeRemaining = (days) => {
    if (days <= 0) return 'Expired'
    if (days < 1) {
      const hours = Math.ceil(days * 24)
      return `${hours}h left`
    }
    return `${Math.ceil(days)}d left`
  }
  
  const getCategoryEmoji = (category) => {
    const emojis = {
      'Fruits': '🍎',
      'Vegetables': '🥕',
      'Dairy': '🥛',
      'Meat': '🥩',
      'Bread': '🍞',
      'Snacks': '🍪',
      'Beverages': '🥤',
      'Other': '📦'
    }
    return emojis[category] || '📦'
  }
  
  return (
    <Card className={`transition-all ${status === 'critical' ? 'ring-2 ring-critical' : ''} slide-in`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 flex-1">
          <div className="text-2xl" role="img" aria-label={`${item.category} category`}>
            {getCategoryEmoji(item.category)}
          </div>
          
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <h3 className={`font-semibold ${settings.elderMode ? 'text-xl' : 'text-lg'}`}>
                {item.name}
              </h3>
              <span className="text-sm text-light bg-surface px-2 py-1 rounded-full">
                {item.category}
              </span>
              {item.quantity > 1 && (
                <span className="text-sm text-light bg-surface px-2 py-1 rounded-full">
                  Qty: {item.quantity}
                </span>
              )}
            </div>
            
            <div className="mb-3">
              <ProgressBar 
                percentage={percentage}
                status={status}
                animated={true}
                size={settings.elderMode ? 'lg' : 'md'}
              />
            </div>
            
            <div className="flex items-center space-x-4 text-sm text-light">
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{formatTimeRemaining(item.expiryDays)}</span>
              </div>
              
              {status === 'expired' && (
                <span className="text-expired font-medium">
                  ⚠️ Expired - Remove immediately
                </span>
              )}
              
              {status === 'critical' && (
                <span className="text-critical font-medium animate-pulse">
                  🚨 Use today!
                </span>
              )}
              
              {status === 'warning' && (
                <span className="text-warning font-medium">
                  ⚡ Use soon
                </span>
              )}
            </div>
          </div>
        </div>
        
        {showActions && (
          <div className="flex space-x-2 ml-4">
            <Button
              variant="success"
              size={settings.elderMode ? 'lg' : 'sm'}
              onClick={handleConsume}
              className="flex items-center space-x-1"
              aria-label={`Mark ${item.name} as consumed`}
            >
              <Check className="w-4 h-4" />
              <span>Consumed</span>
            </Button>
            
            <Button
              variant="danger"
              size={settings.elderMode ? 'lg' : 'sm'}
              onClick={handleWaste}
              className="flex items-center space-x-1"
              aria-label={`Mark ${item.name} as waste`}
            >
              <Trash2 className="w-4 h-4" />
              <span>Waste</span>
            </Button>
          </div>
        )}
      </div>
    </Card>
  )
}

export default GroceryItem