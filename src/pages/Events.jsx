import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { Calendar, MapPin, Users, Download } from 'lucide-react'

const Events = () => {
  const events = [
    {
      id: 1,
      title: 'Annual Health Camp',
      date: '2025-03-15',
      location: 'College Campus',
      type: 'Health Camp',
      description:
        'Free health checkup camp organized for the local community with various health screenings and consultations.',
      attendees: '500+'
    },
    {
      id: 2,
      title: 'National Seminar on Healthcare Innovation',
      date: '2025-04-20',
      location: 'Auditorium',
      type: 'Seminar',
      description:
        'Renowned healthcare professionals and researchers discuss the latest innovations in paramedical and healthcare sciences.',
      attendees: '300+'
    },
    {
      id: 3,
      title: 'Convocation Ceremony 2025',
      date: '2025-05-10',
      location: 'Main Auditorium',
      type: 'Convocation',
      description:
        'Annual convocation ceremony celebrating the achievements of graduating students.',
      attendees: '1000+'
    },
    {
      id: 4,
      title: 'Workshop on Advanced Life Support',
      date: '2025-06-05',
      location: 'Simulation Lab',
      type: 'Workshop',
      description:
        'Hands-on training workshop on advanced life support techniques for paramedical and nursing students.',
      attendees: '50'
    },

    /* ✅ NEW LABORATORY WORKSHOP ADDED */
    {
      id: 5,
      title: 'Workshop on Laboratory Techniques',
      date: '2025-07-10',
      location: 'Biochemistry & Microbiology Labs',
      type: 'Workshop',
      description:
        'Practical workshop focusing on laboratory safety, sample handling, biochemistry tests, microbiology techniques, and diagnostic procedures.',
      attendees: '60'
    },

    {
      id: 6,
      title: 'Sports Day 2025',
      date: '2025-08-20',
      location: 'Sports Ground',
      type: 'Sports',
      description:
        'Annual sports day featuring various indoor and outdoor competitions for students and faculty.',
      attendees: '500+'
    }
  ]

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <>
      <Helmet>
        <title>Events | Uddavrao Tulshiram Foundation College of Paramedical</title>
        <meta
          name="description"
          content="Explore events, seminars, laboratory workshops, health camps, and academic activities at Uddavrao Tulshiram Foundation College of Paramedical."
        />
      </Helmet>

      <div className="pt-20">
        {/* ================= HERO SECTION ================= */}
        <section className="bg-gradient-to-r from-primary to-primary-dark text-white py-16">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-3xl mx-auto"
            >
              <Calendar className="w-16 h-16 mx-auto mb-4" />
              <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
                Events & Activities
              </h1>
              <p className="text-xl text-gray-100">
                Stay updated with seminars, workshops, laboratory training, and campus activities
              </p>
            </motion.div>
          </div>
        </section>

        {/* ================= EVENTS GRID ================= */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="card"
                >
                  <div className="flex items-start justify-between mb-4">
                    <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">
                      {event.type}
                    </span>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-primary">
                        {formatDate(event.date).split(',')[0]}
                      </div>
                      <div className="text-xs text-gray-500">
                        {formatDate(event.date).split(',')[1]}
                      </div>
                    </div>
                  </div>

                  <h3 className="text-xl font-heading font-bold text-neutral-dark mb-2">
                    {event.title}
                  </h3>

                  <p className="text-gray-600 text-sm mb-4">
                    {event.description}
                  </p>

                  <div className="space-y-2 text-sm text-gray-500 mb-4">
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4" />
                      <span>{event.attendees} expected attendees</span>
                    </div>
                  </div>

                  <button className="text-sm text-primary font-medium hover:text-primary-dark transition-colors flex items-center space-x-1">
                    <span>Learn More</span>
                    <Download className="w-4 h-4" />
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default Events
