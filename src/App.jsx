import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { GroceryProvider } from './context/GroceryContext'
import { SettingsProvider } from './context/SettingsContext'
import Layout from './components/Layout/Layout'
import Dashboard from './pages/Dashboard'
import AddGrocery from './pages/AddGrocery'
import ExpiryTracker from './pages/ExpiryTracker'
import SmartAlerts from './pages/SmartAlerts'
import ConsumeToday from './pages/ConsumeToday'
import WasteAnalytics from './pages/WasteAnalytics'
import ElderMode from './pages/ElderMode'
import Settings from './pages/Settings'

function App() {
  return (
    <SettingsProvider>
      <GroceryProvider>
        <Router>
          <div className="App">
            <a href="#main-content" className="skip-link">
              Skip to main content
            </a>
            <Layout>
              <main id="main-content">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/add-grocery" element={<AddGrocery />} />
                  <Route path="/expiry-tracker" element={<ExpiryTracker />} />
                  <Route path="/smart-alerts" element={<SmartAlerts />} />
                  <Route path="/consume-today" element={<ConsumeToday />} />
                  <Route path="/waste-analytics" element={<WasteAnalytics />} />
                  <Route path="/elder-mode" element={<ElderMode />} />
                  <Route path="/settings" element={<Settings />} />
                </Routes>
              </main>
            </Layout>
          </div>
        </Router>
      </GroceryProvider>
    </SettingsProvider>
  )
}

export default App