import React from 'react'
import { motion } from 'framer-motion'
import { LogOut, Settings, User, Moon, Sun, Activity } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import { useTheme } from '../../contexts/ThemeContext'
import { useAnimation } from '../../contexts/AnimationContext'
import { Link } from 'react-router-dom'

export const Header: React.FC = () => {
  const { user, signOut } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const { animationsEnabled } = useAnimation()
  
  const handleSignOut = async () => {
    await signOut()
  }

  // Animation variants for header elements
  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <motion.header
      variants={headerVariants}
      initial={animationsEnabled ? "hidden" : "visible"}
      animate="visible"
      className="glass-card border-b border-white/10 backdrop-blur-xl sticky top-0 z-50"
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <motion.div 
            variants={itemVariants}
            className="flex items-center space-x-4"
          >
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="p-2 bg-gradient-to-br from-brand-400 to-brand-600 rounded-xl shadow-lg"
            >
              <Activity className="h-8 w-8 text-white" />
            </motion.div>
            <div>
              <h1 className="text-2xl font-bold gradient-text">
                Human Patient Monitoring System
              </h1>
              <p className="text-white/60 text-sm">
                Real-time Healthcare Dashboard
              </p>
            </div>
          </motion.div>

          {/* User Actions */}
          <motion.div 
            variants={itemVariants}
            className="flex items-center space-x-4"
          >
            {/* Theme Toggle */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className="p-3 glass-card hover:bg-white/10 rounded-xl transition-all duration-300 group"
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5 text-amber-400 group-hover:rotate-180 transition-transform duration-500" />
              ) : (
                <Moon className="h-5 w-5 text-slate-400 group-hover:-rotate-12 transition-transform duration-500" />
              )}
            </motion.button>

            {/* Settings Link */}
            <Link to="/settings">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-3 glass-card hover:bg-white/10 rounded-xl transition-all duration-300 group"
                aria-label="Settings"
              >
                <Settings className="h-5 w-5 text-white/70 group-hover:text-brand-400 group-hover:rotate-90 transition-all duration-300" />
              </motion.button>
            </Link>

            {/* User Profile */}
            <motion.div 
              className="flex items-center space-x-3 glass-card px-4 py-2 rounded-xl"
              whileHover={{ scale: 1.02 }}
            >
              {/* Avatar */}
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="relative"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-brand-400 to-brand-600 rounded-full flex items-center justify-center shadow-lg">
                  <User className="h-6 w-6 text-white" />
                </div>
                {/* Online indicator */}
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-teal-400 rounded-full border-2 border-slate-900 pulse-live" />
              </motion.div>

              {/* User Info */}
              <div className="hidden sm:block">
                <p className="text-white font-medium text-sm">
                  {user?.email?.split('@')[0] || 'User'}
                </p>
                <p className="text-white/60 text-xs capitalize">
                  {user?.role || 'viewer'}
                </p>
              </div>
            </motion.div>

            {/* Sign Out */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleSignOut}
              className="p-3 glass-card hover:bg-rose-500/20 hover:border-rose-500/30 rounded-xl transition-all duration-300 group"
              aria-label="Sign out"
            >
              <LogOut className="h-5 w-5 text-white/70 group-hover:text-rose-400 transition-colors duration-300" />
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Subtle gradient line at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-400/50 to-transparent" />
    </motion.header>
  )
}