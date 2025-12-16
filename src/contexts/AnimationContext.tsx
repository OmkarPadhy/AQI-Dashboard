import React, { createContext, useContext, useEffect, useState } from 'react'

interface AnimationContextType {
  animationsEnabled: boolean
  toggleAnimations: () => void
  setAnimationsEnabled: (enabled: boolean) => void
  respectsReducedMotion: boolean
}

const AnimationContext = createContext<AnimationContextType | undefined>(undefined)

export const AnimationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [animationsEnabled, setAnimationsEnabledState] = useState(() => {
    // Check user preference first
    const saved = localStorage.getItem('hpms-animations')
    if (saved !== null) {
      return saved === 'true'
    }
    
    // Check system preference for reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    return !prefersReducedMotion // Enable animations if user doesn't prefer reduced motion
  })

  const [respectsReducedMotion, setRespectsReducedMotion] = useState(() => {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  })

  const setAnimationsEnabled = (enabled: boolean) => {
    setAnimationsEnabledState(enabled)
    localStorage.setItem('hpms-animations', enabled.toString())
    
    // Update document class to control CSS animations
    const root = window.document.documentElement
    if (enabled && !respectsReducedMotion) {
      root.classList.remove('reduce-motion')
    } else {
      root.classList.add('reduce-motion')
    }
  }

  const toggleAnimations = () => {
    setAnimationsEnabled(!animationsEnabled)
  }

  useEffect(() => {
    // Apply animation preference on mount
    const root = window.document.documentElement
    const shouldDisableAnimations = !animationsEnabled || respectsReducedMotion
    
    if (shouldDisableAnimations) {
      root.classList.add('reduce-motion')
    } else {
      root.classList.remove('reduce-motion')
    }

    // Listen for system reduced motion preference changes
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handleChange = (e: MediaQueryListEvent) => {
      setRespectsReducedMotion(e.matches)
      
      // If user starts preferring reduced motion, disable animations automatically
      if (e.matches) {
        root.classList.add('reduce-motion')
      } else if (animationsEnabled) {
        root.classList.remove('reduce-motion')
      }
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [animationsEnabled, respectsReducedMotion])

  const value: AnimationContextType = {
    animationsEnabled: animationsEnabled && !respectsReducedMotion,
    toggleAnimations,
    setAnimationsEnabled,
    respectsReducedMotion,
  }

  return (
    <AnimationContext.Provider value={value}>
      {children}
    </AnimationContext.Provider>
  )
}

export const useAnimation = () => {
  const context = useContext(AnimationContext)
  if (context === undefined) {
    throw new Error('useAnimation must be used within an AnimationProvider')
  }
  return context
}