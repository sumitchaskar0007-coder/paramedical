import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X } from 'lucide-react'
import EnquiryModal from './EnquiryModal'

const FloatingEnquiry = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-accent text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-shadow"
        aria-label="Quick Enquiry"
      >
        <MessageCircle size={24} />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <EnquiryModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
        )}
      </AnimatePresence>
    </>
  )
}

export default FloatingEnquiry

