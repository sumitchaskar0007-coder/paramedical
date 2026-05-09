import { motion } from 'framer-motion'
import { Mail, Award, BookOpen } from 'lucide-react'

const FacultyCard = ({ faculty, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="card text-center"
    >
      <div className="mb-4">
        <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-primary to-primary-light flex items-center justify-center text-white text-4xl font-heading font-bold">
          {faculty.name.split(' ').map(n => n[0]).join('')}
        </div>
      </div>

      <h3 className="text-xl font-heading font-bold text-neutral-dark mb-1">
        {faculty.name}
      </h3>
      <p className="text-primary font-medium mb-3">{faculty.designation}</p>
      <p className="text-sm text-gray-600 mb-4">{faculty.qualifications}</p>

      {faculty.specialization && (
        <div className="mb-4">
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-500 mb-2">
            <BookOpen className="w-4 h-4" />
            <span className="font-medium">Specialization</span>
          </div>
          <p className="text-sm text-gray-700">{faculty.specialization}</p>
        </div>
      )}

      {faculty.experience && (
        <div className="flex items-center justify-center space-x-2 text-sm text-gray-500 mb-4">
          <Award className="w-4 h-4" />
          <span>{faculty.experience} years of experience</span>
        </div>
      )}

      {faculty.email && (
        <a
          href={`mailto:${faculty.email}`}
          className="inline-flex items-center space-x-2 text-sm text-primary hover:text-primary-dark transition-colors"
        >
          <Mail className="w-4 h-4" />
          <span>Contact</span>
        </a>
      )}
    </motion.div>
  )
}

export default FacultyCard

