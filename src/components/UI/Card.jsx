import React from 'react'

function Card({ children, className = '', padding = 'md', ...props }) {
  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  }
  
  return (
    <div 
      className={`bg-white rounded-xl shadow-md border border-border ${paddingClasses[padding]} ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}

export default Card