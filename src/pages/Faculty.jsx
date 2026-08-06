import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import FacultyCard from '../components/FacultyCard'
import { faculty } from '../data/faculty'
import { Users } from 'lucide-react'

const Faculty = () => {
  return (
    <>
      <Helmet>
        <title>Faculty | Uddavrao Tulshiram Foundation College of Paramedical</title>
        <meta name="description" content="Meet our experienced faculty members and clinical instructors dedicated to your success in paramedical education." />
      </Helmet>

      <div className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary to-primary-dark text-white py-16">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-3xl mx-auto"
            >
              <Users className="w-16 h-16 mx-auto mb-4" />
              <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
                Our Faculty
              </h1>
              <p className="text-xl text-gray-100">
                Experienced educators and clinical experts dedicated to your success
              </p>
            </motion.div>
          </div>
        </section>

        {/* Faculty Grid */}
        <section className="section-padding">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Our faculty members bring years of clinical and academic experience, ensuring you receive the best education and training in paramedical sciences.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {faculty.map((member, index) => (
                <FacultyCard key={member.id} faculty={member} index={index} />
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default Faculty

