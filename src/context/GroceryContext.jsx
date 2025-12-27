import React, { createContext, useContext, useReducer, useEffect } from 'react'

const GroceryContext = createContext()

// Time simulation: 1 day = 10 seconds
const TIME_MULTIPLIER = 8640 // 86400 seconds in a day / 10 seconds

const initialState = {
  groceries: [],
  consumedItems: [],
  wasteHistory: []
}

function groceryReducer(state, action) {
  switch (action.type) {
    case 'ADD_GROCERY':
      return {
        ...state,
        groceries: [...state.groceries, {
          ...action.payload,
          id: Date.now(),
          addedAt: Date.now(),
          originalExpiryDays: action.payload.expiryDays
        }]
      }
    
    case 'UPDATE_EXPIRY':
      return {
        ...state,
        groceries: state.groceries.map(item => ({
          ...item,
          expiryDays: Math.max(0, item.originalExpiryDays - 
            ((Date.now() - item.addedAt) / 1000) / TIME_MULTIPLIER)
        }))
      }
    
    case 'CONSUME_ITEM':
      const itemToConsume = state.groceries.find(item => item.id === action.payload)
      return {
        ...state,
        groceries: state.groceries.filter(item => item.id !== action.payload),
        consumedItems: [...state.consumedItems, {
          ...itemToConsume,
          consumedAt: Date.now(),
          wasWasted: false
        }]
      }
    
    case 'MARK_AS_WASTE':
      const wastedItem = state.groceries.find(item => item.id === action.payload)
      return {
        ...state,
        groceries: state.groceries.filter(item => item.id !== action.payload),
        wasteHistory: [...state.wasteHistory, {
          ...wastedItem,
          wastedAt: Date.now(),
          wasWasted: true
        }]
      }
    
    case 'REMOVE_EXPIRED':
      const expiredItems = state.groceries.filter(item => item.expiryDays <= 0)
      const remainingItems = state.groceries.filter(item => item.expiryDays > 0)
      
      return {
        ...state,
        groceries: remainingItems,
        wasteHistory: [...state.wasteHistory, ...expiredItems.map(item => ({
          ...item,
          wastedAt: Date.now(),
          wasWasted: true,
          autoRemoved: true
        }))]
      }
    
    case 'LOAD_DATA':
      return action.payload
    
    default:
      return state
  }
}

export function GroceryProvider({ children }) {
  const [state, dispatch] = useReducer(groceryReducer, initialState)

  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('smartGroceryData')
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData)
        dispatch({ type: 'LOAD_DATA', payload: parsedData })
      } catch (error) {
        console.error('Error loading saved data:', error)
      }
    }
  }, [])

  // Save data to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('smartGroceryData', JSON.stringify(state))
  }, [state])

  // Update expiry times every second
  useEffect(() => {
    const interval = setInterval(() => {
      dispatch({ type: 'UPDATE_EXPIRY' })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  // Auto-remove expired items
  useEffect(() => {
    const expiredItems = state.groceries.filter(item => item.expiryDays <= 0)
    if (expiredItems.length > 0) {
      setTimeout(() => {
        dispatch({ type: 'REMOVE_EXPIRED' })
      }, 2000) // Give 2 seconds to see the expired state
    }
  }, [state.groceries])

  const addGrocery = (grocery) => {
    dispatch({ type: 'ADD_GROCERY', payload: grocery })
  }

  const consumeItem = (id) => {
    dispatch({ type: 'CONSUME_ITEM', payload: id })
  }

  const markAsWaste = (id) => {
    dispatch({ type: 'MARK_AS_WASTE', payload: id })
  }

  // Helper functions
  const getExpiryStatus = (expiryDays) => {
    if (expiryDays <= 0) return 'expired'
    if (expiryDays <= 0.2) return 'critical' // 20% of original time
    if (expiryDays <= 0.5) return 'warning'  // 50% of original time
    return 'safe'
  }

  const getExpiryPercentage = (item) => {
    if (!item.originalExpiryDays) return 0
    return Math.max(0, Math.min(100, (item.expiryDays / item.originalExpiryDays) * 100))
  }

  const getFoodHealthScore = () => {
    if (state.groceries.length === 0) return 100
    
    const totalItems = state.groceries.length
    const safeItems = state.groceries.filter(item => getExpiryStatus(item.expiryDays) === 'safe').length
    const warningItems = state.groceries.filter(item => getExpiryStatus(item.expiryDays) === 'warning').length
    const criticalItems = state.groceries.filter(item => getExpiryStatus(item.expiryDays) === 'critical').length
    
    // Calculate weighted score
    const score = ((safeItems * 100) + (warningItems * 60) + (criticalItems * 20)) / totalItems
    return Math.round(score)
  }

  const getItemsExpiringSoon = () => {
    return state.groceries
      .filter(item => {
        const status = getExpiryStatus(item.expiryDays)
        return status === 'warning' || status === 'critical'
      })
      .sort((a, b) => a.expiryDays - b.expiryDays)
  }

  const getWeeklyWasteStats = () => {
    const oneWeekAgo = Date.now() - (7 * 24 * 60 * 60 * 1000)
    const recentWaste = state.wasteHistory.filter(item => item.wastedAt > oneWeekAgo)
    const recentConsumed = state.consumedItems.filter(item => item.consumedAt > oneWeekAgo)
    
    return {
      wastedItems: recentWaste.length,
      consumedItems: recentConsumed.length,
      wastePercentage: recentWaste.length + recentConsumed.length > 0 
        ? Math.round((recentWaste.length / (recentWaste.length + recentConsumed.length)) * 100)
        : 0
    }
  }

  const value = {
    ...state,
    addGrocery,
    consumeItem,
    markAsWaste,
    getExpiryStatus,
    getExpiryPercentage,
    getFoodHealthScore,
    getItemsExpiringSoon,
    getWeeklyWasteStats
  }

  return (
    <GroceryContext.Provider value={value}>
      {children}
    </GroceryContext.Provider>
  )
}

export function useGrocery() {
  const context = useContext(GroceryContext)
  if (!context) {
    throw new Error('useGrocery must be used within a GroceryProvider')
  }
  return context
}