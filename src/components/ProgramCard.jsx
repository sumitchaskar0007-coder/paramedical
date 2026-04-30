import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Clock, Users, GraduationCap, ArrowRight } from 'lucide-react'

const ProgramCard = ({ program, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="card group hover:border-primary/20"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary transition-colors">
          <GraduationCap className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
        </div>
        {program.featured && (
          <span className="px-3 py-1 bg-accent/10 text-accent text-xs font-semibold rounded-full">
            Featured
          </span>
        )}
      </div>

      <h3 className="text-xl font-heading font-bold text-neutral-dark mb-2 group-hover:text-primary transition-colors">
        {program.title}
      </h3>
      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
        {program.description}
      </p>

      <div className="space-y-2 mb-4 text-sm text-gray-500">
        <div className="flex items-center space-x-2">
          <Clock className="w-4 h-4" />
          <span>{program.duration}</span>
        </div>
        {program.intake && (
          <div className="flex items-center space-x-2">
            <Users className="w-4 h-4" />
            <span>Intake: {program.intake}</span>
          </div>
        )}
      </div>

      <Link
        to={`/programs/${program.slug}`}
        className="inline-flex items-center space-x-2 text-primary font-medium hover:text-primary-dark transition-colors group-hover:translate-x-1 transition-transform"
      >
        <span>Learn More</span>
        <ArrowRight className="w-4 h-4" />
      </Link>
    </motion.div>
  )
}

export default ProgramCard

