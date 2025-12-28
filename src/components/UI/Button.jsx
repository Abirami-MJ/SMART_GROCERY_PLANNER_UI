import React from 'react'

function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  disabled = false, 
  onClick, 
  type = 'button',
  className = '',
  ...props 
}) {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 transform hover:scale-105 active:scale-95 shadow-lg'
  
  const variants = {
    primary: 'bg-gradient-primary text-white hover:shadow-xl focus:ring-primary disabled:bg-gray-300 disabled:transform-none',
    secondary: 'bg-white/90 backdrop-blur-sm text-gray-700 border border-white/20 hover:bg-white hover:shadow-xl focus:ring-primary disabled:bg-gray-100',
    success: 'bg-gradient-success text-white hover:shadow-xl focus:ring-safe disabled:bg-gray-300 disabled:transform-none',
    warning: 'bg-gradient-warning text-white hover:shadow-xl focus:ring-warning disabled:bg-gray-300 disabled:transform-none',
    danger: 'bg-gradient-danger text-white hover:shadow-xl focus:ring-critical disabled:bg-gray-300 disabled:transform-none',
    ghost: 'text-white/80 hover:bg-white/10 hover:text-white focus:ring-primary disabled:text-gray-400 shadow-none',
    glass: 'glass text-white hover:bg-white/20 focus:ring-primary'
  }
  
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
    xl: 'px-10 py-5 text-xl'
  }
  
  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`
  
  return (
    <button
      type={type}
      className={classes}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button