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
    <div className="bg-accent text-white py-2 sm:py-2.5 overflow-hidden shadow-sm border-t border-white/10" role="region" aria-label="Important notices">
      <div className="container-custom">
        <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
          <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-white/15 flex-shrink-0">
            <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <div className="flex-1 min-w-0 relative h-10 sm:h-6 overflow-hidden">
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
                  className="flex w-full min-w-0 items-center gap-1.5 sm:gap-2 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded"
                >
                  <span className="text-xs sm:text-sm font-medium leading-5 line-clamp-2 sm:truncate">{notices[currentIndex].text}</span>
                  <ChevronRight className="hidden sm:block w-4 h-4 flex-shrink-0" />
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="hidden sm:flex items-center gap-1.5 flex-shrink-0">
            {notices.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'w-5 bg-white' : 'w-2 bg-white/50 hover:bg-white/75'
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

