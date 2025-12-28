import React from 'react'
import { useLocation } from 'react-router-dom'
import Navigation from './Navigation'
import Header from './Header'
import { useSettings } from '../../context/SettingsContext'

function Layout({ children }) {
  const location = useLocation()
  const { settings } = useSettings()
  
  const getPageTitle = () => {
    const path = location.pathname
    const titles = {
      '/': 'Dashboard',
      '/add-grocery': 'Add Grocery',
      '/expiry-tracker': 'Live Expiry Tracker',
      '/smart-alerts': 'Smart Alerts',
      '/consume-today': 'Consume Today',
      '/waste-analytics': 'Waste Analytics',
      '/elder-mode': 'Elder Mode',
      '/settings': 'Settings'
    }
    return titles[path] || 'Smart Grocery Planner'
  }

  return (
    <div className={`min-h-screen ${settings.elderMode ? 'elder-mode' : ''}`}>
      <Header title={getPageTitle()} />
      <div className="flex min-h-screen">
        <Navigation />
        <div className="flex-1 p-6 md:p-8 lg:p-12">
          <div className="container mx-auto max-w-7xl">
            <div className="space-y-8">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Layout