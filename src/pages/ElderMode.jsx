import React from 'react'
import { Users, Volume2, Eye, Type, Palette } from 'lucide-react'
import { useSettings } from '../context/SettingsContext'
import { useGrocery } from '../context/GroceryContext'
import Card from '../components/UI/Card'
import Button from '../components/UI/Button'
import GroceryItem from '../components/Grocery/GroceryItem'

function ElderMode() {
  const { settings, updateSetting, speakAlert } = useSettings()
  const { getItemsExpiringSoon } = useGrocery()
  
  const expiringSoon = getItemsExpiringSoon()
  
  const handleToggleElderMode = () => {
    const newValue = !settings.elderMode
    updateSetting('elderMode', newValue)
    
    const message = newValue 
      ? 'Elder mode activated. Interface is now optimized for accessibility with larger text and high contrast.'
      : 'Elder mode deactivated. Interface returned to normal size.'
    
    speakAlert(message)
  }
  
  const testVoiceFeature = () => {
    speakAlert('Voice features are working perfectly. This interface is designed to be elder-friendly with clear audio feedback.')
  }
  
  const elderFeatures = [
    {
      icon: Type,
      title: 'Large Text',
      description: 'All text is displayed in larger, easy-to-read fonts',
      active: settings.elderMode
    },
    {
      icon: Palette,
      title: 'High Contrast',
      description: 'Enhanced color contrast for better visibility',
      active: settings.elderMode
    },
    {
      icon: Volume2,
      title: 'Voice Alerts',
      description: 'Spoken notifications for all important information',
      active: settings.voiceAlerts
    },
    {
      icon: Eye,
      title: 'Visual Cues',
      description: 'Clear icons and animations to convey information',
      active: true
    }
  ]
  
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className={`font-bold text-primary mb-2 ${settings.elderMode ? 'text-4xl' : 'text-3xl'}`}>
          Elder Mode
        </h1>
        <p className={`text-light ${settings.elderMode ? 'text-xl' : 'text-lg'}`}>
          Accessibility-first design for comfortable grocery management
        </p>
      </div>
      
      {/* Elder Mode Toggle */}
      <Card className={`text-center ${settings.elderMode ? 'bg-blue-50 border-blue-200' : ''}`}>
        <Users className={`w-16 h-16 mx-auto mb-4 ${settings.elderMode ? 'text-primary' : 'text-light'}`} />
        <h2 className={`font-bold mb-4 ${settings.elderMode ? 'text-3xl text-primary' : 'text-2xl'}`}>
          {settings.elderMode ? 'Elder Mode Active' : 'Elder Mode Inactive'}
        </h2>
        <p className={`text-light mb-6 ${settings.elderMode ? 'text-xl' : 'text-lg'}`}>
          {settings.elderMode 
            ? 'Interface optimized for accessibility and ease of use'
            : 'Activate elder mode for larger text and enhanced accessibility'
          }
        </p>
        <Button
          variant={settings.elderMode ? 'danger' : 'primary'}
          size="xl"
          onClick={handleToggleElderMode}
          className="mb-4"
        >
          {settings.elderMode ? 'Deactivate Elder Mode' : 'Activate Elder Mode'}
        </Button>
        
        {settings.elderMode && (
          <div className="mt-4">
            <Button
              variant="secondary"
              size="lg"
              onClick={testVoiceFeature}
              className="mr-4"
            >
              🔊 Test Voice
            </Button>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => updateSetting('voiceAlerts', !settings.voiceAlerts)}
            >
              {settings.voiceAlerts ? 'Disable Voice' : 'Enable Voice'}
            </Button>
          </div>
        )}
      </Card>
      
      {/* Elder Features */}
      <div>
        <h2 className={`font-semibold mb-4 ${settings.elderMode ? 'text-2xl' : 'text-xl'}`}>
          🌟 Elder-Friendly Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {elderFeatures.map((feature, index) => (
            <Card key={index} className={`${feature.active ? 'bg-green-50 border-green-200' : 'bg-gray-50'}`}>
              <div className="flex items-center space-x-4">
                <feature.icon className={`w-8 h-8 ${feature.active ? 'text-safe' : 'text-light'}`} />
                <div className="flex-1">
                  <h3 className={`font-semibold mb-1 ${settings.elderMode ? 'text-xl' : 'text-lg'} ${feature.active ? 'text-safe' : 'text-text'}`}>
                    {feature.title}
                  </h3>
                  <p className={`${settings.elderMode ? 'text-lg' : 'text-base'} ${feature.active ? 'text-green-700' : 'text-light'}`}>
                    {feature.description}
                  </p>
                </div>
                <div className={`w-4 h-4 rounded-full ${feature.active ? 'bg-safe' : 'bg-gray-300'}`}></div>
              </div>
            </Card>
          ))}
        </div>
      </div>
      
      {/* Quick Actions for Elders */}
      <Card>
        <h2 className={`font-semibold mb-4 ${settings.elderMode ? 'text-2xl' : 'text-xl'}`}>
          🚀 Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button
            variant="primary"
            size="xl"
            onClick={() => speakAlert(`You have ${expiringSoon.length} items that need attention today.`)}
            className="h-20 flex flex-col items-center justify-center"
          >
            <Volume2 className="w-6 h-6 mb-2" />
            <span>Hear My Alerts</span>
          </Button>
          
          <Button
            variant="warning"
            size="xl"
            onClick={() => window.location.href = '/consume-today'}
            className="h-20 flex flex-col items-center justify-center"
          >
            <Users className="w-6 h-6 mb-2" />
            <span>What to Use Today</span>
          </Button>
        </div>
      </Card>
      
      {/* Accessibility Tips */}
      <Card className="bg-blue-50 border-blue-200">
        <h2 className={`font-semibold mb-4 text-blue-800 ${settings.elderMode ? 'text-2xl' : 'text-xl'}`}>
          💡 Accessibility Tips
        </h2>
        <ul className={`text-blue-700 space-y-3 ${settings.elderMode ? 'text-lg' : 'text-base'}`}>
          <li className="flex items-start space-x-2">
            <span className="text-blue-500 font-bold">•</span>
            <span>Use voice alerts to hear important information read aloud</span>
          </li>
          <li className="flex items-start space-x-2">
            <span className="text-blue-500 font-bold">•</span>
            <span>All buttons are large and clearly labeled for easy clicking</span>
          </li>
          <li className="flex items-start space-x-2">
            <span className="text-blue-500 font-bold">•</span>
            <span>Colors and animations help show which items need attention</span>
          </li>
          <li className="flex items-start space-x-2">
            <span className="text-blue-500 font-bold">•</span>
            <span>Use keyboard Tab key to navigate between buttons</span>
          </li>
          <li className="flex items-start space-x-2">
            <span className="text-blue-500 font-bold">•</span>
            <span>Critical items flash red to grab your attention</span>
          </li>
        </ul>
      </Card>
      
      {/* Sample Items in Elder Mode */}
      {settings.elderMode && expiringSoon.length > 0 && (
        <div>
          <h2 className={`font-semibold mb-4 ${settings.elderMode ? 'text-2xl' : 'text-xl'}`}>
            📋 Items Needing Attention (Elder View)
          </h2>
          <div className="space-y-4">
            {expiringSoon.slice(0, 2).map(item => (
              <GroceryItem key={item.id} item={item} />
            ))}
          </div>
        </div>
      )}
      
      {/* Contact Support */}
      <Card className="bg-yellow-50 border-yellow-200">
        <h2 className={`font-semibold mb-4 text-yellow-800 ${settings.elderMode ? 'text-2xl' : 'text-xl'}`}>
          🤝 Need Help?
        </h2>
        <p className={`text-yellow-700 mb-4 ${settings.elderMode ? 'text-lg' : 'text-base'}`}>
          If you need assistance using this application, don't hesitate to ask for help from family members or caregivers.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button
            variant="secondary"
            size={settings.elderMode ? 'xl' : 'lg'}
            onClick={() => speakAlert('This is the Smart Grocery Planner help section. You can ask family members to help you navigate the application.')}
          >
            🔊 Hear Help Message
          </Button>
          <Button
            variant="secondary"
            size={settings.elderMode ? 'xl' : 'lg'}
            onClick={() => window.location.href = '/settings'}
          >
            ⚙️ Adjust Settings
          </Button>
        </div>
      </Card>
    </div>
  )
}

export default ElderMode