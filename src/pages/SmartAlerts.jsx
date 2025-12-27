import React, { useEffect } from 'react'
import { Bell, Volume2, AlertTriangle, Clock } from 'lucide-react'
import { useGrocery } from '../context/GroceryContext'
import { useSettings } from '../context/SettingsContext'
import GroceryItem from '../components/Grocery/GroceryItem'
import Card from '../components/UI/Card'
import Alert from '../components/UI/Alert'
import Button from '../components/UI/Button'

function SmartAlerts() {
  const { groceries, getExpiryStatus, getItemsExpiringSoon } = useGrocery()
  const { settings, updateSetting, speakAlert } = useSettings()
  
  const expiringSoon = getItemsExpiringSoon()
  const criticalItems = groceries.filter(item => getExpiryStatus(item.expiryDays) === 'critical')
  const warningItems = groceries.filter(item => getExpiryStatus(item.expiryDays) === 'warning')
  
  // Announce alerts when page loads
  useEffect(() => {
    if (settings.voiceAlerts && expiringSoon.length > 0) {
      const message = `You have ${expiringSoon.length} items that need attention. ${criticalItems.length} critical and ${warningItems.length} warning items.`
      setTimeout(() => speakAlert(message), 1000)
    }
  }, [expiringSoon.length, criticalItems.length, warningItems.length, settings.voiceAlerts, speakAlert])
  
  const testVoiceAlert = () => {
    speakAlert('This is a test voice alert. Voice alerts are working properly.')
  }
  
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className={`font-bold text-primary mb-2 ${settings.elderMode ? 'text-4xl' : 'text-3xl'}`}>
          Smart Alerts
        </h1>
        <p className={`text-light ${settings.elderMode ? 'text-xl' : 'text-lg'}`}>
          Get notified about items that need your attention
        </p>
      </div>
      
      {/* Alert Settings */}
      <Card>
        <h2 className={`font-semibold mb-4 ${settings.elderMode ? 'text-2xl' : 'text-xl'}`}>
          Alert Settings
        </h2>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Volume2 className="w-5 h-5 text-primary" />
              <div>
                <h3 className={`font-medium ${settings.elderMode ? 'text-lg' : 'text-base'}`}>
                  Voice Alerts
                </h3>
                <p className={`text-light ${settings.elderMode ? 'text-base' : 'text-sm'}`}>
                  Spoken notifications for elder-friendly accessibility
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="secondary"
                size={settings.elderMode ? 'lg' : 'sm'}
                onClick={testVoiceAlert}
                disabled={!settings.voiceAlerts}
              >
                Test
              </Button>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.voiceAlerts}
                  onChange={(e) => updateSetting('voiceAlerts', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/25 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Bell className="w-5 h-5 text-primary" />
              <div>
                <h3 className={`font-medium ${settings.elderMode ? 'text-lg' : 'text-base'}`}>
                  Sound Alerts
                </h3>
                <p className={`text-light ${settings.elderMode ? 'text-base' : 'text-sm'}`}>
                  Audio notifications for critical items
                </p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.soundEnabled}
                onChange={(e) => updateSetting('soundEnabled', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/25 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
        </div>
      </Card>
      
      {/* Alert Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="text-center">
          <AlertTriangle className="w-8 h-8 text-critical mx-auto mb-2" />
          <div className={`font-bold text-critical mb-1 ${settings.elderMode ? 'text-3xl' : 'text-2xl'}`}>
            {criticalItems.length}
          </div>
          <div className={`text-light ${settings.elderMode ? 'text-lg' : 'text-base'}`}>
            Critical Items
          </div>
          <div className={`text-critical font-medium ${settings.elderMode ? 'text-base' : 'text-sm'}`}>
            Use today!
          </div>
        </Card>
        
        <Card className="text-center">
          <Clock className="w-8 h-8 text-warning mx-auto mb-2" />
          <div className={`font-bold text-warning mb-1 ${settings.elderMode ? 'text-3xl' : 'text-2xl'}`}>
            {warningItems.length}
          </div>
          <div className={`text-light ${settings.elderMode ? 'text-lg' : 'text-base'}`}>
            Warning Items
          </div>
          <div className={`text-warning font-medium ${settings.elderMode ? 'text-base' : 'text-sm'}`}>
            Use soon
          </div>
        </Card>
        
        <Card className="text-center">
          <Bell className="w-8 h-8 text-primary mx-auto mb-2" />
          <div className={`font-bold text-primary mb-1 ${settings.elderMode ? 'text-3xl' : 'text-2xl'}`}>
            {expiringSoon.length}
          </div>
          <div className={`text-light ${settings.elderMode ? 'text-lg' : 'text-base'}`}>
            Total Alerts
          </div>
          <div className={`text-primary font-medium ${settings.elderMode ? 'text-base' : 'text-sm'}`}>
            Need attention
          </div>
        </Card>
      </div>
      
      {/* Alert Rules */}
      <Card>
        <h2 className={`font-semibold mb-4 ${settings.elderMode ? 'text-2xl' : 'text-xl'}`}>
          Alert Rules
        </h2>
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <div className="w-4 h-4 bg-warning rounded-full"></div>
            <span className={settings.elderMode ? 'text-lg' : 'text-base'}>
              <strong>Warning Alert:</strong> Triggered when items reach 50% of their expiry time
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-4 h-4 bg-critical rounded-full flash-critical"></div>
            <span className={settings.elderMode ? 'text-lg' : 'text-base'}>
              <strong>Critical Alert:</strong> Triggered when items reach 20% of their expiry time (flashing)
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-4 h-4 bg-expired rounded-full"></div>
            <span className={settings.elderMode ? 'text-lg' : 'text-base'}>
              <strong>Expired:</strong> Items past their expiry date (auto-removed after 2 seconds)
            </span>
          </div>
        </div>
      </Card>
      
      {/* Active Alerts */}
      {expiringSoon.length > 0 ? (
        <div>
          <h2 className={`font-semibold mb-4 ${settings.elderMode ? 'text-2xl' : 'text-xl'}`}>
            🚨 Active Alerts ({expiringSoon.length})
          </h2>
          
          {criticalItems.length > 0 && (
            <div className="mb-6">
              <Alert
                type="error"
                title="Critical Items - Use Today!"
                message={`${criticalItems.length} items are in critical condition and should be consumed immediately.`}
              />
            </div>
          )}
          
          {warningItems.length > 0 && (
            <div className="mb-6">
              <Alert
                type="warning"
                title="Warning Items - Use Soon"
                message={`${warningItems.length} items are approaching their expiry date and should be used within the next day or two.`}
              />
            </div>
          )}
          
          <div className="space-y-4">
            {expiringSoon.map(item => (
              <GroceryItem key={item.id} item={item} />
            ))}
          </div>
        </div>
      ) : (
        <Card className="text-center py-12">
          <div className="text-6xl mb-4">✅</div>
          <h3 className={`font-semibold mb-2 ${settings.elderMode ? 'text-2xl' : 'text-xl'}`}>
            No Active Alerts
          </h3>
          <p className={`text-light ${settings.elderMode ? 'text-lg' : 'text-base'}`}>
            All your groceries are fresh and safe! Great job managing your food.
          </p>
        </Card>
      )}
    </div>
  )
}

export default SmartAlerts