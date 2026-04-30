import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import {
  Building2,
  BookOpen,
  Computer,
  FlaskConical,
  Microscope,
  TestTube
} from 'lucide-react'

const Facilities = () => {
  const facilities = [
    {
      id: 1,
      name: 'Anatomy Lab',
      icon: FlaskConical,
      description:
        'Well-equipped anatomy laboratory with models, charts, and specimens for in-depth study of human anatomy.',
      capacity: '50 students per session',
      features: [
        'Anatomical models',
        'Preserved specimens',
        'Charts and diagrams',
        'Digital anatomy tools'
      ]
    },
    {
      id: 2,
      name: 'Microbiology Lab',
      icon: Microscope,
      description:
        'Advanced microbiology laboratory for studying bacteria, viruses, and microorganisms using modern techniques.',
      capacity: '40 students per session',
      features: [
        'Microscopes',
        'Incubators',
        'Culture facilities',
        'Laminar airflow system'
      ]
    },

    /* ================= ADDED BIOCHEMISTRY ================= */
    {
      id: 3,
      name: 'Biochemistry Lab',
      icon: TestTube,
      description:
        'Modern biochemistry laboratory designed for clinical and diagnostic training in biochemical analysis.',
      capacity: '40 students per session',
      features: [
        'Semi-auto analyzers',
        'Clinical chemistry experiments',
        'Blood & urine analysis',
        'Quality control procedures'
      ]
    },

    {
      id: 4,
      name: 'Library',
      icon: BookOpen,
      description:
        'Well-stocked library with a vast collection of medical books, journals, and digital resources.',
      capacity: '100+ seating capacity',
      features: [
        'Medical textbooks',
        'E-journals',
        'Digital learning resources',
        'Quiet reading spaces'
      ]
    },
    {
      id: 5,
      name: 'Computer Lab',
      icon: Computer,
      description:
        'Modern computer laboratory with high-speed internet and educational software.',
      capacity: '50 computers',
      features: [
        'High-speed internet',
        'Medical software',
        'Online research tools',
        'Project-based learning'
      ]
    },
    {
      id: 6,
      name: 'Auditorium',
      icon: Building2,
      description:
        'Spacious auditorium for seminars, workshops, academic events, and cultural programs.',
      capacity: '500+ seating',
      features: [
        'Audio-visual systems',
        'Air-conditioned hall',
        'Stage & presentation setup',
        'Parking facility'
      ]
    }
  ]

  return (
    <>
      <Helmet>
        <title>Facilities | Uddavrao Tulshiram Foundation College of Paramedical</title>
        <meta
          name="description"
          content="Explore our advanced facilities including Anatomy Lab, Microbiology Lab, Biochemistry Lab, library, computer lab, and auditorium."
        />
      </Helmet>

      <div className="pt-20">
        {/* ================= HERO SECTION ================= */}
        <section className="bg-gradient-to-r from-primary to-primary-dark text-white py-16">
          <div className="container-custom text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
                Our Facilities
              </h1>
              <p className="text-xl text-gray-100">
                Advanced infrastructure for quality paramedical education
              </p>
            </motion.div>
          </div>
        </section>

        {/* ================= FACILITIES GRID ================= */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {facilities.map((facility, index) => (
                <motion.div
                  key={facility.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="card"
                >
                  <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <facility.icon className="w-8 h-8 text-primary" />
                  </div>

                  <h3 className="text-xl font-heading font-bold text-neutral-dark mb-2">
                    {facility.name}
                  </h3>

                  <p className="text-gray-600 text-sm mb-4">
                    {facility.description}
                  </p>

                  <div className="mb-4">
                    <p className="text-sm font-semibold text-neutral-dark mb-1">
                      Capacity:
                    </p>
                    <p className="text-sm text-gray-600">
                      {facility.capacity}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-neutral-dark mb-2">
                      Key Features:
                    </p>
                    <ul className="space-y-1">
                      {facility.features.map((feature, i) => (
                        <li
                          key={i}
                          className="flex items-center space-x-2 text-sm text-gray-600"
                        >
                          <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default Facilities
