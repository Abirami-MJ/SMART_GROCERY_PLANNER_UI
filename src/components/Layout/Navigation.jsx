import React from 'react'
import { NavLink } from 'react-router-dom'
import { 
  Home, 
  Plus, 
  Clock, 
  Bell, 
  Coffee, 
  BarChart3, 
  Users, 
  Settings 
} from 'lucide-react'
import { useGrocery } from '../../context/GroceryContext'
import { useSettings } from '../../context/SettingsContext'

function Navigation() {
  const { getItemsExpiringSoon } = useGrocery()
  const { settings, updateSetting } = useSettings()
  const expiringSoonCount = getItemsExpiringSoon().length

  const navItems = [
    { path: '/', icon: Home, label: 'Dashboard' },
    { path: '/add-grocery', icon: Plus, label: 'Add Grocery' },
    { path: '/expiry-tracker', icon: Clock, label: 'Live Expiry Tracker' },
    { 
      path: '/smart-alerts', 
      icon: Bell, 
      label: 'Smart Alerts',
      badge: expiringSoonCount > 0 ? expiringSoonCount : null
    },
    { path: '/consume-today', icon: Coffee, label: 'Consume Today' },
    { path: '/waste-analytics', icon: BarChart3, label: 'Waste Analytics' },
    { path: '/elder-mode', icon: Users, label: 'Elder Mode' },
    { path: '/settings', icon: Settings, label: 'Settings' }
  ]

  return (
    <nav className="w-64 bg-white shadow-sm border-r border-border min-h-screen">
      <div className="p-4">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors relative ${
                    isActive
                      ? 'bg-primary text-white'
                      : 'text-text hover:bg-surface'
                  } ${settings.elderMode ? 'text-lg py-4' : ''}`
                }
              >
                <item.icon className={`w-5 h-5 ${settings.elderMode ? 'w-6 h-6' : ''}`} />
                <span className="font-medium">{item.label}</span>
                
                {/* Badge for alerts */}
                {item.badge && (
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-critical text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Elder Mode Quick Toggle */}
        <div className="mt-8 pt-4 border-t border-border">
          <button
            onClick={() => updateSetting('elderMode', !settings.elderMode)}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
              settings.elderMode
                ? 'bg-primary text-white'
                : 'text-text hover:bg-surface'
            }`}
          >
            <Users className="w-5 h-5" />
            <span className="font-medium">
              {settings.elderMode ? 'Exit Elder Mode' : 'Enable Elder Mode'}
            </span>
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navigation