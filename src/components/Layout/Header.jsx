import React from 'react'
import { useGrocery } from '../../context/GroceryContext'
import { useSettings } from '../../context/SettingsContext'
import { Heart, Volume2, VolumeX } from 'lucide-react'

function Header({ title }) {
  const { getFoodHealthScore } = useGrocery()
  const { settings, updateSetting } = useSettings()
  
  const healthScore = getFoodHealthScore()
  
  const getHealthColor = (score) => {
    if (score >= 80) return 'text-safe'
    if (score >= 60) return 'text-warning'
    return 'text-critical'
  }

  const getHealthMessage = (score) => {
    if (score >= 90) return 'Excellent food health!'
    if (score >= 80) return 'Good food management'
    if (score >= 60) return 'Room for improvement'
    if (score >= 40) return 'Check expiring items'
    return 'Urgent attention needed'
  }

  return (
    <header className="bg-white shadow-sm border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div>
              <h1 className="text-2xl font-bold text-primary">
                Smart Grocery Planner
              </h1>
              <p className="text-sm text-light">
                Visualize freshness. Reduce waste. Eat smarter.
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            {/* Food Health Score */}
            <div className="flex items-center space-x-2">
              <Heart className={`w-5 h-5 ${getHealthColor(healthScore)}`} />
              <div className="text-right">
                <div className={`text-lg font-semibold ${getHealthColor(healthScore)}`}>
                  {healthScore}%
                </div>
                <div className="text-xs text-light">
                  {getHealthMessage(healthScore)}
                </div>
              </div>
            </div>

            {/* Sound Toggle */}
            <button
              onClick={() => updateSetting('soundEnabled', !settings.soundEnabled)}
              className="p-2 rounded-lg hover:bg-surface transition-colors"
              aria-label={settings.soundEnabled ? 'Disable sounds' : 'Enable sounds'}
            >
              {settings.soundEnabled ? (
                <Volume2 className="w-5 h-5 text-primary" />
              ) : (
                <VolumeX className="w-5 h-5 text-light" />
              )}
            </button>

            {/* Current Page Title */}
            <div className="text-right">
              <h2 className="text-lg font-semibold">{title}</h2>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header