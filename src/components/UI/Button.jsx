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
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-2'
  
  const variants = {
    primary: 'bg-primary text-white hover:bg-blue-600 focus:ring-primary disabled:bg-gray-300',
    secondary: 'bg-surface text-text border border-border hover:bg-gray-50 focus:ring-primary disabled:bg-gray-100',
    success: 'bg-safe text-white hover:bg-green-600 focus:ring-safe disabled:bg-gray-300',
    warning: 'bg-warning text-white hover:bg-yellow-600 focus:ring-warning disabled:bg-gray-300',
    danger: 'bg-critical text-white hover:bg-red-600 focus:ring-critical disabled:bg-gray-300',
    ghost: 'text-text hover:bg-surface focus:ring-primary disabled:text-gray-400'
  }
  
  const sizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
    xl: 'px-8 py-4 text-xl'
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