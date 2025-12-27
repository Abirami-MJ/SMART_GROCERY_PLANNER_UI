import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CheckCircle } from 'lucide-react'
import { useSettings } from '../context/SettingsContext'
import GroceryForm from '../components/Grocery/GroceryForm'
import Alert from '../components/UI/Alert'

function AddGrocery() {
  const navigate = useNavigate()
  const { settings } = useSettings()
  const [showSuccess, setShowSuccess] = useState(false)
  
  const handleSuccess = () => {
    setShowSuccess(true)
    setTimeout(() => {
      setShowSuccess(false)
    }, 3000)
  }
  
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="text-center mb-8">
        <h1 className={`font-bold text-primary mb-2 ${settings.elderMode ? 'text-4xl' : 'text-3xl'}`}>
          Add Grocery Item
        </h1>
        <p className={`text-light ${settings.elderMode ? 'text-xl' : 'text-lg'}`}>
          Track freshness and reduce waste by adding your groceries
        </p>
      </div>
      
      {showSuccess && (
        <Alert
          type="success"
          title="Success!"
          message="Grocery item added successfully. It's now being tracked for freshness."
          onClose={() => setShowSuccess(false)}
        />
      )}
      
      <GroceryForm onSuccess={handleSuccess} />
      
      {/* Tips */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className={`font-semibold text-blue-800 mb-3 ${settings.elderMode ? 'text-xl' : 'text-lg'}`}>
          💡 Pro Tips
        </h3>
        <ul className={`text-blue-700 space-y-2 ${settings.elderMode ? 'text-lg' : 'text-base'}`}>
          <li>• Check expiry dates on packaging for accurate tracking</li>
          <li>• Use the quick-add suggestions for common items</li>
          <li>• Add items as soon as you bring them home</li>
          <li>• Enable voice alerts in settings for elder-friendly notifications</li>
        </ul>
      </div>
    </div>
  )
}

export default AddGrocery