import React, { createContext, useContext, useState, useEffect } from 'react'

const SettingsContext = createContext()

const defaultSettings = {
  elderMode: false,
  voiceAlerts: false,
  soundEnabled: true,
  highContrast: false,
  reducedMotion: false,
  fontSize: 'normal', // normal, large, extra-large
  theme: 'light' // light, dark
}

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(defaultSettings)

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('smartGrocerySettings')
    if (savedSettings) {
      try {
        const parsedSettings = JSON.parse(savedSettings)
        setSettings({ ...defaultSettings, ...parsedSettings })
      } catch (error) {
        console.error('Error loading settings:', error)
      }
    }
  }, [])

  // Save settings to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('smartGrocerySettings', JSON.stringify(settings))
  }, [settings])

  // Apply elder mode class to body
  useEffect(() => {
    if (settings.elderMode) {
      document.body.classList.add('elder-mode')
    } else {
      document.body.classList.remove('elder-mode')
    }
  }, [settings.elderMode])

  // Apply high contrast class
  useEffect(() => {
    if (settings.highContrast) {
      document.body.classList.add('high-contrast')
    } else {
      document.body.classList.remove('high-contrast')
    }
  }, [settings.highContrast])

  // Apply reduced motion preference
  useEffect(() => {
    if (settings.reducedMotion) {
      document.body.classList.add('reduced-motion')
    } else {
      document.body.classList.remove('reduced-motion')
    }
  }, [settings.reducedMotion])

  const updateSetting = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const resetSettings = () => {
    setSettings(defaultSettings)
  }

  // Voice alert function
  const speakAlert = (message) => {
    if (settings.voiceAlerts && 'speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(message)
      utterance.rate = 0.8
      utterance.pitch = 1
      utterance.volume = 0.8
      speechSynthesis.speak(utterance)
    }
  }

  // Sound alert function
  const playSound = (type = 'default') => {
    if (!settings.soundEnabled) return

    // Create audio context for sound generation
    const audioContext = new (window.AudioContext || window.webkitAudioContext)()
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)

    // Different sounds for different alert types
    switch (type) {
      case 'warning':
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime)
        break
      case 'critical':
        oscillator.frequency.setValueAtTime(1000, audioContext.currentTime)
        break
      case 'success':
        oscillator.frequency.setValueAtTime(600, audioContext.currentTime)
        break
      default:
        oscillator.frequency.setValueAtTime(440, audioContext.currentTime)
    }

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5)

    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + 0.5)
  }

  const value = {
    settings,
    updateSetting,
    resetSettings,
    speakAlert,
    playSound
  }

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  )
}

export function useSettings() {
  const context = useContext(SettingsContext)
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider')
  }
  return context
}