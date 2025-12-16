import React from 'react'
import { motion } from 'framer-motion'
import { Heart, Github, Mail, Phone } from 'lucide-react'
import { useAnimation } from '../../contexts/AnimationContext'

export const Footer: React.FC = () => {
  const { animationsEnabled } = useAnimation()
  
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
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
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <motion.footer
      variants={containerVariants}
      initial={animationsEnabled ? "hidden" : "visible"}
      animate="visible"
      className="glass-card border-t border-white/10 mt-auto"
    >
      <div className="container mx-auto px-6 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          
          {/* Left side - Version and branding */}
          <motion.div 
            variants={itemVariants}
            className="flex items-center space-x-4"
          >
            <div className="flex items-center space-x-2">
              <Heart className="h-5 w-5 text-rose-400 heartbeat" />
              <span className="text-white/80 text-sm font-medium">
                HPMS v1.0.0
              </span>
            </div>
            <div className="hidden md:block w-px h-6 bg-white/20" />
            <div className="hidden md:block text-white/60 text-sm">
              Built with care for healthcare professionals
            </div>
          </motion.div>

          {/* Center - Status indicators */}
          <motion.div 
            variants={itemVariants}
            className="flex items-center space-x-6"
          >
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-teal-400 rounded-full pulse-live" />
              <span className="text-white/70 text-sm">System Online</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
              <span className="text-white/70 text-sm">Real-time Updates</span>
            </div>
          </motion.div>

          {/* Right side - Contact info */}
          <motion.div 
            variants={itemVariants}
            className="flex items-center space-x-4"
          >
            <div className="text-white/60 text-sm">
              Emergency Support:
            </div>
            <div className="flex items-center space-x-3">
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                href="tel:+1-800-HPMS-911"
                className="p-2 glass-card hover:bg-white/10 rounded-lg transition-all duration-300 group"
                aria-label="Call emergency support"
              >
                <Phone className="h-4 w-4 text-white/70 group-hover:text-brand-400 transition-colors duration-300" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                href="mailto:support@hpms.healthcare"
                className="p-2 glass-card hover:bg-white/10 rounded-lg transition-all duration-300 group"
                aria-label="Email support"
              >
                <Mail className="h-4 w-4 text-white/70 group-hover:text-brand-400 transition-colors duration-300" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                href="https://github.com/hpms/patient-monitoring"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 glass-card hover:bg-white/10 rounded-lg transition-all duration-300 group"
                aria-label="View source code"
              >
                <Github className="h-4 w-4 text-white/70 group-hover:text-brand-400 transition-colors duration-300" />
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* Bottom section - Copyright and compliance */}
        <motion.div 
          variants={itemVariants}
          className="mt-6 pt-6 border-t border-white/10 text-center"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0">
            <p className="text-white/50 text-xs">
              © 2024 Human Patient Monitoring System. HIPAA Compliant • FDA Approved • ISO 27001 Certified
            </p>
            <div className="flex items-center space-x-4 text-xs text-white/50">
              <a href="/privacy" className="hover:text-brand-400 transition-colors duration-300">
                Privacy Policy
              </a>
              <span>•</span>
              <a href="/terms" className="hover:text-brand-400 transition-colors duration-300">
                Terms of Service
              </a>
              <span>•</span>
              <a href="/compliance" className="hover:text-brand-400 transition-colors duration-300">
                Compliance
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Subtle gradient line at top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-400/50 to-transparent" />
    </motion.footer>
  )
}