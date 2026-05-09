import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Download, Calendar, ArrowRight } from 'lucide-react'

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary-dark via-primary to-primary-light">
      {/* Background Image/Video Overlay */}
      <div className="absolute inset-0 bg-black/40 z-10" />
      
      {/* Content */}
      <div className="relative z-20 container-custom text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-4"
          >
            Late Udhavrao Tulshiram Jadhavar Foundation's 
          </motion.h1>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-2xl md:text-3xl lg:text-4xl font-heading font-semibold mb-6"
          >
            College of Paramedical, Pune
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-lg md:text-xl mb-8 text-gray-100"
          >
            Training Compassionate & Competent Healthcare Professionals
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link to="/admissions" className="btn-accent flex items-center space-x-2">
              <span>Apply Now</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/admissions" className="bg-white text-primary px-6 py-3 rounded-full font-medium transition-all duration-300 hover:bg-gray-100 hover:shadow-lg flex items-center space-x-2">
              <Download className="w-5 h-5" />
              <span>Download Prospectus</span>
            </Link>
            <Link to="/contact" className="border-2 border-white text-white px-6 py-3 rounded-full font-medium transition-all duration-300 hover:bg-white hover:text-primary flex items-center space-x-2">
              <Calendar className="w-5 h-5" />
              <span>Book Campus Visit</span>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-6 h-10 border-2 border-white rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-1 h-3 bg-white rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Hero

