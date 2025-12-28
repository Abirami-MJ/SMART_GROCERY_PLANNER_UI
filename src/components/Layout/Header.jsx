import React from 'react'
import { useGrocery } from '../../context/GroceryContext'
import { useSettings } from '../../context/SettingsContext'
import { Heart, Volume2, VolumeX, User, Bell } from 'lucide-react'

function Header({ title }) {
  const { getFoodHealthScore, getItemsExpiringSoon } = useGrocery()
  const { settings, updateSetting } = useSettings()
  
  const healthScore = getFoodHealthScore()
  const expiringSoonCount = getItemsExpiringSoon().length
  
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
    <header className="glass sticky top-0 z-50 border-b border-white/20">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-4">
            <div className="bg-gradient-primary p-3 rounded-xl shadow-lg">
              <div className="text-white text-xl font-bold">🛒</div>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Smart Grocery Planner
              </h1>
              <p className="text-sm text-white/80">
                Visualize freshness. Reduce waste. Eat smarter.
              </p>
            </div>
          </div>

          {/* Center - Current Page */}
          <div className="hidden md:block">
            <div className="bg-white/10 backdrop-blur-sm px-6 py-2 rounded-full border border-white/20">
              <h2 className="text-lg font-semibold text-white">{title}</h2>
            </div>
          </div>

          {/* Right Side - Stats and Controls */}
          <div className="flex items-center space-x-6">
            {/* Notifications */}
            {expiringSoonCount > 0 && (
              <div className="relative">
                <Bell className="w-6 h-6 text-white/80" />
                <span className="absolute -top-2 -right-2 bg-critical text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                  {expiringSoonCount}
                </span>
              </div>
            )}

            {/* Food Health Score */}
            <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
              <Heart className={`w-5 h-5 ${getHealthColor(healthScore)}`} />
              <div className="text-right">
                <div className={`text-lg font-semibold ${getHealthColor(healthScore)}`}>
                  {healthScore}%
                </div>
                <div className="text-xs text-white/70">
                  Health Score
                </div>
              </div>
            </div>

            {/* Sound Toggle */}
            <button
              onClick={() => updateSetting('soundEnabled', !settings.soundEnabled)}
              className="p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300"
              aria-label={settings.soundEnabled ? 'Disable sounds' : 'Enable sounds'}
            >
              {settings.soundEnabled ? (
                <Volume2 className="w-5 h-5 text-white" />
              ) : (
                <VolumeX className="w-5 h-5 text-white/60" />
              )}
            </button>

            {/* User Profile */}
            <div className="p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
              <User className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>

        {/* Mobile Page Title */}
        <div className="md:hidden mt-4">
          <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20">
            <h2 className="text-lg font-semibold text-white">{title}</h2>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header