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
    { path: '/', icon: Home, label: 'Dashboard', color: 'from-blue-500 to-purple-600' },
    { path: '/add-grocery', icon: Plus, label: 'Add Grocery', color: 'from-green-500 to-teal-600' },
    { path: '/expiry-tracker', icon: Clock, label: 'Live Expiry Tracker', color: 'from-orange-500 to-red-600' },
    { 
      path: '/smart-alerts', 
      icon: Bell, 
      label: 'Smart Alerts',
      badge: expiringSoonCount > 0 ? expiringSoonCount : null,
      color: 'from-red-500 to-pink-600'
    },
    { path: '/consume-today', icon: Coffee, label: 'Consume Today', color: 'from-yellow-500 to-orange-600' },
    { path: '/waste-analytics', icon: BarChart3, label: 'Waste Analytics', color: 'from-purple-500 to-indigo-600' },
    { path: '/elder-mode', icon: Users, label: 'Elder Mode', color: 'from-indigo-500 to-blue-600' },
    { path: '/settings', icon: Settings, label: 'Settings', color: 'from-gray-500 to-gray-600' }
  ]

  return (
    <nav className="w-80 glass border-r border-white/20 min-h-screen">
      <div className="p-6">
        {/* Navigation Title */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-white mb-2">Navigation</h3>
          <div className="h-1 w-12 bg-gradient-primary rounded-full"></div>
        </div>

        {/* Navigation Items */}
        <ul className="space-y-3">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `group flex items-center space-x-4 px-4 py-4 rounded-xl transition-all duration-300 relative overflow-hidden ${
                    isActive
                      ? 'bg-white/20 backdrop-blur-sm border border-white/30 shadow-lg'
                      : 'text-white/80 hover:bg-white/10 hover:text-white border border-transparent'
                  } ${settings.elderMode ? 'text-lg py-5' : ''}`
                }
              >
                {({ isActive }) => (
                  <>
                    {/* Background gradient for active item */}
                    {isActive && (
                      <div className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-20 rounded-xl`}></div>
                    )}
                    
                    {/* Icon with gradient background */}
                    <div className={`relative p-2 rounded-lg bg-gradient-to-r ${item.color} ${settings.elderMode ? 'p-3' : ''}`}>
                      <item.icon className={`w-5 h-5 text-white ${settings.elderMode ? 'w-6 h-6' : ''}`} />
                    </div>
                    
                    {/* Label */}
                    <span className={`font-medium relative z-10 ${isActive ? 'text-white' : ''}`}>
                      {item.label}
                    </span>
                    
                    {/* Badge for alerts */}
                    {item.badge && (
                      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-critical text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center shadow-lg">
                        {item.badge}
                      </span>
                    )}

                    {/* Hover effect */}
                    <div className="absolute inset-0 bg-white/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Elder Mode Quick Toggle */}
        <div className="mt-8 pt-6 border-t border-white/20">
          <button
            onClick={() => updateSetting('elderMode', !settings.elderMode)}
            className={`w-full flex items-center space-x-4 px-4 py-4 rounded-xl transition-all duration-300 group ${
              settings.elderMode
                ? 'bg-white/20 backdrop-blur-sm border border-white/30 text-white shadow-lg'
                : 'text-white/80 hover:bg-white/10 hover:text-white border border-transparent'
            }`}
          >
            <div className="p-2 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-600">
              <Users className="w-5 h-5 text-white" />
            </div>
            <span className="font-medium">
              {settings.elderMode ? 'Exit Elder Mode' : 'Enable Elder Mode'}
            </span>
            <div className="absolute inset-0 bg-white/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-white/20">
          <p className="text-xs text-white/60 text-center">
            Smart Grocery Planner v1.0
          </p>
        </div>
      </div>
    </nav>
  )
}

export default Navigation