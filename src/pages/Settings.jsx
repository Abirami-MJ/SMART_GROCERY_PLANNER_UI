import React from 'react'
import { Settings as SettingsIcon, Volume2, Eye, Type, RotateCcw, Save } from 'lucide-react'
import { useSettings } from '../context/SettingsContext'
import Card from '../components/UI/Card'
import Button from '../components/UI/Button'
import Alert from '../components/UI/Alert'

function Settings() {
  const { settings, updateSetting, resetSettings, speakAlert } = useSettings()
  
  const handleReset = () => {
    resetSettings()
    speakAlert('Settings have been reset to default values.')
  }
  
  const handleSave = () => {
    speakAlert('Settings have been saved successfully.')
  }
  
  const settingsSections = [
    {
      title: 'Accessibility',
      icon: Eye,
      settings: [
        {
          key: 'elderMode',
          label: 'Elder Mode',
          description: 'Large text, high contrast, and simplified interface',
          type: 'toggle'
        },
        {
          key: 'voiceAlerts',
          label: 'Voice Alerts',
          description: 'Spoken notifications for important information',
          type: 'toggle'
        },
        {
          key: 'highContrast',
          label: 'High Contrast',
          description: 'Enhanced color contrast for better visibility',
          type: 'toggle'
        },
        {
          key: 'reducedMotion',
          label: 'Reduced Motion',
          description: 'Minimize animations and transitions',
          type: 'toggle'
        }
      ]
    },
    {
      title: 'Audio',
      icon: Volume2,
      settings: [
        {
          key: 'soundEnabled',
          label: 'Sound Effects',
          description: 'Audio feedback for actions and alerts',
          type: 'toggle'
        }
      ]
    },
    {
      title: 'Display',
      icon: Type,
      settings: [
        {
          key: 'fontSize',
          label: 'Font Size',
          description: 'Adjust text size for better readability',
          type: 'select',
          options: [
            { value: 'normal', label: 'Normal' },
            { value: 'large', label: 'Large' },
            { value: 'extra-large', label: 'Extra Large' }
          ]
        },
        {
          key: 'theme',
          label: 'Theme',
          description: 'Choose your preferred color scheme',
          type: 'select',
          options: [
            { value: 'light', label: 'Light' },
            { value: 'dark', label: 'Dark' }
          ]
        }
      ]
    }
  ]
  
  const renderToggle = (settingKey, setting) => (
    <div className="flex items-center justify-between">
      <div className="flex-1">
        <h3 className={`font-medium ${settings.elderMode ? 'text-xl' : 'text-lg'}`}>
          {setting.label}
        </h3>
        <p className={`text-light ${settings.elderMode ? 'text-lg' : 'text-base'}`}>
          {setting.description}
        </p>
      </div>
      <label className="relative inline-flex items-center cursor-pointer ml-4">
        <input
          type="checkbox"
          checked={settings[settingKey]}
          onChange={(e) => updateSetting(settingKey, e.target.checked)}
          className="sr-only peer"
        />
        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/25 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
      </label>
    </div>
  )
  
  const renderSelect = (settingKey, setting) => (
    <div>
      <h3 className={`font-medium mb-2 ${settings.elderMode ? 'text-xl' : 'text-lg'}`}>
        {setting.label}
      </h3>
      <p className={`text-light mb-3 ${settings.elderMode ? 'text-lg' : 'text-base'}`}>
        {setting.description}
      </p>
      <select
        value={settings[settingKey]}
        onChange={(e) => updateSetting(settingKey, e.target.value)}
        className={`w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${settings.elderMode ? 'text-lg py-4' : ''}`}
      >
        {setting.options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
  
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center mb-8">
        <h1 className={`font-bold text-primary mb-2 ${settings.elderMode ? 'text-4xl' : 'text-3xl'}`}>
          Settings
        </h1>
        <p className={`text-light ${settings.elderMode ? 'text-xl' : 'text-lg'}`}>
          Customize your Smart Grocery Planner experience
        </p>
      </div>
      
      {/* Current Mode Indicator */}
      {settings.elderMode && (
        <Alert
          type="info"
          title="Elder Mode Active"
          message="Interface is optimized for accessibility with larger text and enhanced features."
        />
      )}
      
      {/* Settings Sections */}
      {settingsSections.map((section, sectionIndex) => (
        <Card key={sectionIndex}>
          <div className="flex items-center space-x-3 mb-6">
            <section.icon className="w-6 h-6 text-primary" />
            <h2 className={`font-semibold ${settings.elderMode ? 'text-2xl' : 'text-xl'}`}>
              {section.title}
            </h2>
          </div>
          
          <div className="space-y-6">
            {section.settings.map((setting, settingIndex) => (
              <div key={settingIndex}>
                {setting.type === 'toggle' && renderToggle(setting.key, setting)}
                {setting.type === 'select' && renderSelect(setting.key, setting)}
              </div>
            ))}
          </div>
        </Card>
      ))}
      
      {/* Quick Actions */}
      <Card>
        <h2 className={`font-semibold mb-4 ${settings.elderMode ? 'text-2xl' : 'text-xl'}`}>
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button
            variant="primary"
            size={settings.elderMode ? 'xl' : 'lg'}
            onClick={() => updateSetting('elderMode', !settings.elderMode)}
            className="flex items-center justify-center space-x-2"
          >
            <Eye className="w-5 h-5" />
            <span>{settings.elderMode ? 'Disable' : 'Enable'} Elder Mode</span>
          </Button>
          
          <Button
            variant="secondary"
            size={settings.elderMode ? 'xl' : 'lg'}
            onClick={() => speakAlert('This is a test of the voice alert system. Voice alerts are working properly.')}
            disabled={!settings.voiceAlerts}
            className="flex items-center justify-center space-x-2"
          >
            <Volume2 className="w-5 h-5" />
            <span>Test Voice</span>
          </Button>
          
          <Button
            variant="ghost"
            size={settings.elderMode ? 'xl' : 'lg'}
            onClick={handleReset}
            className="flex items-center justify-center space-x-2"
          >
            <RotateCcw className="w-5 h-5" />
            <span>Reset All</span>
          </Button>
        </div>
      </Card>
      
      {/* Settings Info */}
      <Card className="bg-blue-50 border-blue-200">
        <h2 className={`font-semibold mb-4 text-blue-800 ${settings.elderMode ? 'text-2xl' : 'text-xl'}`}>
          💡 Settings Information
        </h2>
        <div className="space-y-3">
          <div className="flex items-start space-x-2">
            <span className="text-blue-500 font-bold">•</span>
            <span className={`text-blue-700 ${settings.elderMode ? 'text-lg' : 'text-base'}`}>
              <strong>Elder Mode:</strong> Activates larger text, high contrast colors, and voice alerts for better accessibility
            </span>
          </div>
          <div className="flex items-start space-x-2">
            <span className="text-blue-500 font-bold">•</span>
            <span className={`text-blue-700 ${settings.elderMode ? 'text-lg' : 'text-base'}`}>
              <strong>Voice Alerts:</strong> Provides spoken feedback for important notifications and actions
            </span>
          </div>
          <div className="flex items-start space-x-2">
            <span className="text-blue-500 font-bold">•</span>
            <span className={`text-blue-700 ${settings.elderMode ? 'text-lg' : 'text-base'}`}>
              <strong>Sound Effects:</strong> Audio cues for different types of alerts (warning, critical, success)
            </span>
          </div>
          <div className="flex items-start space-x-2">
            <span className="text-blue-500 font-bold">•</span>
            <span className={`text-blue-700 ${settings.elderMode ? 'text-lg' : 'text-base'}`}>
              <strong>Reduced Motion:</strong> Minimizes animations for users sensitive to motion
            </span>
          </div>
        </div>
      </Card>
      
      {/* Current Settings Summary */}
      <Card className="bg-gray-50">
        <h2 className={`font-semibold mb-4 ${settings.elderMode ? 'text-2xl' : 'text-xl'}`}>
          📋 Current Settings
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(settings).map(([key, value]) => (
            <div key={key} className="flex justify-between items-center">
              <span className={`capitalize ${settings.elderMode ? 'text-lg' : 'text-base'}`}>
                {key.replace(/([A-Z])/g, ' $1').trim()}:
              </span>
              <span className={`font-medium ${settings.elderMode ? 'text-lg' : 'text-base'} ${
                typeof value === 'boolean' 
                  ? value ? 'text-safe' : 'text-light'
                  : 'text-primary'
              }`}>
                {typeof value === 'boolean' ? (value ? 'Enabled' : 'Disabled') : value}
              </span>
            </div>
          ))}
        </div>
      </Card>
      
      {/* Save Button */}
      <div className="text-center">
        <Button
          variant="primary"
          size={settings.elderMode ? 'xl' : 'lg'}
          onClick={handleSave}
          className="flex items-center justify-center space-x-2"
        >
          <Save className="w-5 h-5" />
          <span>Settings Saved Automatically</span>
        </Button>
      </div>
    </div>
  )
}

export default Settings