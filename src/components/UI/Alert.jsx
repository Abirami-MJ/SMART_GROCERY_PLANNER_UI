import React from 'react'
import { AlertTriangle, CheckCircle, Info, X, AlertCircle } from 'lucide-react'

function Alert({ 
  type = 'info', 
  title, 
  message, 
  onClose, 
  className = '',
  children 
}) {
  const types = {
    success: {
      icon: CheckCircle,
      classes: 'bg-green-50 border-green-200 text-green-800',
      iconClasses: 'text-green-400'
    },
    warning: {
      icon: AlertTriangle,
      classes: 'bg-yellow-50 border-yellow-200 text-yellow-800',
      iconClasses: 'text-warning'
    },
    error: {
      icon: AlertCircle,
      classes: 'bg-red-50 border-red-200 text-red-800',
      iconClasses: 'text-critical'
    },
    info: {
      icon: Info,
      classes: 'bg-blue-50 border-blue-200 text-blue-800',
      iconClasses: 'text-primary'
    }
  }
  
  const config = types[type]
  const Icon = config.icon
  
  return (
    <div className={`border rounded-lg p-4 ${config.classes} ${className}`} role="alert">
      <div className="flex items-start">
        <Icon className={`w-5 h-5 mt-0.5 mr-3 flex-shrink-0 ${config.iconClasses}`} />
        
        <div className="flex-1">
          {title && (
            <h3 className="font-medium mb-1">{title}</h3>
          )}
          
          {message && (
            <p className="text-sm">{message}</p>
          )}
          
          {children}
        </div>
        
        {onClose && (
          <button
            onClick={onClose}
            className="ml-3 flex-shrink-0 p-1 rounded-md hover:bg-black hover:bg-opacity-10 transition-colors"
            aria-label="Close alert"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  )
}

export default Alert