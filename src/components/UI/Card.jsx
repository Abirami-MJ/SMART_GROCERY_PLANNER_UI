import React from 'react'

function Card({ children, className = '', padding = 'md', variant = 'default', ...props }) {
  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-10'
  }

  const variantClasses = {
    default: 'card-enhanced',
    glass: 'glass',
    gradient: 'bg-gradient-primary text-white',
    success: 'bg-gradient-success text-white',
    warning: 'bg-gradient-warning text-white',
    danger: 'bg-gradient-danger text-white'
  }
  
  return (
    <div 
      className={`${variantClasses[variant]} ${paddingClasses[padding]} hover-lift transition-all duration-300 ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}

export default Card