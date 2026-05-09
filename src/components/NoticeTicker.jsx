import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AlertCircle, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const NoticeTicker = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const notices = [
    { id: 1, text: 'Admissions Open for Academic Year 2026-27', link: '/admissions', urgent: true },
    { id: 2, text: 'Last Date for Application Submission: July 30, 2026', link: '/admissions', urgent: true },
    { id: 3, text: 'Campus Visit Available - Book Your Slot Now', link: '/contact', urgent: false },
    { id: 4, text: 'Download Prospectus 2025 - Available Now', link: '/admissions', urgent: false },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % notices.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [notices.length])

  return (
    <div className="bg-accent text-white py-2 overflow-hidden">
      <div className="container-custom">
        <div className="flex items-center space-x-4">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <div className="flex-1 relative h-6 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                className="absolute inset-0 flex items-center"
              >
                <Link
                  to={notices[currentIndex].link}
                  className="flex items-center space-x-2 hover:underline"
                >
                  <span className="text-sm font-medium">{notices[currentIndex].text}</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="flex space-x-1">
            {notices.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex ? 'bg-white' : 'bg-white/50'
                }`}
                aria-label={`Go to notice ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default NoticeTicker

