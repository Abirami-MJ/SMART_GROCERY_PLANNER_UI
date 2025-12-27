import React, { useState } from 'react'
import { Plus } from 'lucide-react'
import { useGrocery } from '../../context/GroceryContext'
import { useSettings } from '../../context/SettingsContext'
import Button from '../UI/Button'
import Card from '../UI/Card'

function GroceryForm({ onSuccess }) {
  const { addGrocery } = useGrocery()
  const { speakAlert, playSound, settings } = useSettings()
  
  const [formData, setFormData] = useState({
    name: '',
    category: 'Other',
    expiryDays: 7,
    quantity: 1
  })
  
  const categories = [
    'Fruits',
    'Vegetables', 
    'Dairy',
    'Meat',
    'Bread',
    'Snacks',
    'Beverages',
    'Other'
  ]
  
  const commonItems = {
    'Fruits': [
      { name: 'Apples', days: 14 },
      { name: 'Bananas', days: 7 },
      { name: 'Oranges', days: 10 },
      { name: 'Berries', days: 5 }
    ],
    'Vegetables': [
      { name: 'Lettuce', days: 7 },
      { name: 'Carrots', days: 21 },
      { name: 'Tomatoes', days: 7 },
      { name: 'Broccoli', days: 5 }
    ],
    'Dairy': [
      { name: 'Milk', days: 7 },
      { name: 'Yogurt', days: 14 },
      { name: 'Cheese', days: 21 },
      { name: 'Eggs', days: 28 }
    ],
    'Meat': [
      { name: 'Chicken', days: 3 },
      { name: 'Ground Beef', days: 2 },
      { name: 'Fish', days: 2 },
      { name: 'Deli Meat', days: 5 }
    ],
    'Bread': [
      { name: 'White Bread', days: 7 },
      { name: 'Whole Wheat', days: 7 },
      { name: 'Bagels', days: 5 },
      { name: 'Tortillas', days: 14 }
    ]
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!formData.name.trim()) {
      if (settings.voiceAlerts) {
        speakAlert('Please enter a grocery item name')
      }
      return
    }
    
    addGrocery({
      ...formData,
      name: formData.name.trim()
    })
    
    playSound('success')
    if (settings.voiceAlerts) {
      speakAlert(`${formData.name} added successfully`)
    }
    
    // Reset form
    setFormData({
      name: '',
      category: 'Other',
      expiryDays: 7,
      quantity: 1
    })
    
    if (onSuccess) {
      onSuccess()
    }
  }
  
  const handleQuickAdd = (item) => {
    setFormData(prev => ({
      ...prev,
      name: item.name,
      expiryDays: item.days
    }))
  }
  
  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }
  
  return (
    <div className="space-y-6">
      <Card>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className={`block font-medium mb-2 ${settings.elderMode ? 'text-lg' : 'text-sm'}`}>
              Grocery Item Name *
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className={`w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${settings.elderMode ? 'text-lg py-4' : ''}`}
              placeholder="e.g., Milk, Apples, Chicken"
              required
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="category" className={`block font-medium mb-2 ${settings.elderMode ? 'text-lg' : 'text-sm'}`}>
                Category
              </label>
              <select
                id="category"
                value={formData.category}
                onChange={(e) => handleChange('category', e.target.value)}
                className={`w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${settings.elderMode ? 'text-lg py-4' : ''}`}
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="expiryDays" className={`block font-medium mb-2 ${settings.elderMode ? 'text-lg' : 'text-sm'}`}>
                Expires in (days)
              </label>
              <input
                type="number"
                id="expiryDays"
                min="1"
                max="365"
                value={formData.expiryDays}
                onChange={(e) => handleChange('expiryDays', parseInt(e.target.value))}
                className={`w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${settings.elderMode ? 'text-lg py-4' : ''}`}
              />
            </div>
            
            <div>
              <label htmlFor="quantity" className={`block font-medium mb-2 ${settings.elderMode ? 'text-lg' : 'text-sm'}`}>
                Quantity
              </label>
              <input
                type="number"
                id="quantity"
                min="1"
                max="99"
                value={formData.quantity}
                onChange={(e) => handleChange('quantity', parseInt(e.target.value))}
                className={`w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${settings.elderMode ? 'text-lg py-4' : ''}`}
              />
            </div>
          </div>
          
          <Button
            type="submit"
            size={settings.elderMode ? 'xl' : 'lg'}
            className="w-full flex items-center justify-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Add Grocery Item</span>
          </Button>
        </form>
      </Card>
      
      {/* Quick Add Suggestions */}
      {commonItems[formData.category] && (
        <Card>
          <h3 className={`font-semibold mb-4 ${settings.elderMode ? 'text-xl' : 'text-lg'}`}>
            Quick Add - {formData.category}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {commonItems[formData.category].map((item, index) => (
              <Button
                key={index}
                variant="secondary"
                size={settings.elderMode ? 'lg' : 'sm'}
                onClick={() => handleQuickAdd(item)}
                className="text-left justify-start"
              >
                <div>
                  <div className="font-medium">{item.name}</div>
                  <div className="text-xs text-light">{item.days} days</div>
                </div>
              </Button>
            ))}
          </div>
        </Card>
      )}
    </div>
  )
}

export default GroceryForm