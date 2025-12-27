import React from 'react'
import { useSettings } from '../../context/SettingsContext'

function ProgressBar({ 
  percentage, 
  status, 
  animated = false, 
  showPercentage = true,
  size = 'md',
  className = '' 
}) {
  const { settings } = useSettings()
  
  const getStatusColor = (status) => {
    switch (status) {
      case 'safe': return 'bg-safe'
      case 'warning': return 'bg-warning'
      case 'critical': return 'bg-critical'
      case 'expired': return 'bg-expired'
      default: return 'bg-gray-300'
    }
  }
  
  const sizes = {
    sm: 'h-2',
    md: 'h-4',
    lg: 'h-6',
    xl: 'h-8'
  }
  
  const shouldFlash = status === 'critical' && !settings.reducedMotion
  
  return (
    <div className={`w-full ${className}`}>
      <div className={`bg-gray-200 rounded-full overflow-hidden ${sizes[size]}`}>
        <div
          className={`h-full transition-all duration-300 ${getStatusColor(status)} ${
            shouldFlash ? 'flash-critical' : ''
          } ${animated ? 'transition-slow' : ''}`}
          style={{ width: `${Math.max(0, Math.min(100, percentage))}%` }}
          role="progressbar"
          aria-valuenow={percentage}
          aria-valuemin="0"
          aria-valuemax="100"
          aria-label={`${Math.round(percentage)}% remaining`}
        />
      </div>
      
      {showPercentage && (
        <div className="flex justify-between items-center mt-1">
          <span className={`text-sm font-medium ${
            status === 'critical' ? 'text-critical' : 
            status === 'warning' ? 'text-warning' : 
            status === 'expired' ? 'text-expired' : 'text-safe'
          }`}>
            {Math.round(percentage)}% fresh
          </span>
          
          <span className="text-xs text-light capitalize">
            {status}
          </span>
        </div>
      )}
    </div>
  )
}

export default ProgressBar