import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { Briefcase, Building2, TrendingUp, Users, Star, Quote, Hospital, Stethoscope } from 'lucide-react'
import { testimonials } from '../data/testimonials'

const Placements = () => {
  const hospitalTieUps = [
   
    'INAMDAR MULTISPECIALITY HOSPITAL, PUNE',
    'GALAXY MULTISPECIALITY HOSPITAL, PUNE'
  ]

  const placementStats = [
    { label: 'Placement Rate', value: '100%' },
    { label: 'Average Package', value: '₹3.5 LPA' },
    { label: 'Top Recruiters', value: '50+' },
    { label: 'Hospital Tie-ups', value: '50+' },
  ]

  const recruiterTestimonials = testimonials.filter(t => t.role.includes('HR') || t.role.includes('Manager') || t.role.includes('Chief'))

  return (
    <>
      <Helmet>
        <title>Placements | Uddavrao Tulshiram Foundation College of Paramedical</title>
        <meta name="description" content="Placement opportunities, hospital tie-ups, internship partners, and success stories at UT Foundation College." />
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
              <Briefcase className="w-16 h-16 mx-auto mb-4" />
              <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
                Placements & Career
              </h1>
              <p className="text-xl text-gray-100">
                Launching successful careers in healthcare
              </p>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="section-padding bg-neutral">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6"
            >
              {placementStats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center card"
                >
                  <div className="text-3xl md:text-4xl font-heading font-bold text-primary mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Hospital Tie-ups Section */}
        <section className="section-padding bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <div className="flex items-center justify-center mb-4">
                <Hospital className="w-10 h-10 text-primary mr-3" />
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-neutral-dark">
                  Hospital Tie-ups
                </h2>
              </div>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Our strong partnerships with leading hospitals provide students with real-world clinical exposure and placement opportunities
              </p>
            </motion.div>

            {/* Hospital Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-12">
              {hospitalTieUps.map((hospital, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group"
                >
                  <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 overflow-hidden h-full hover:-translate-y-1">
                    <div className="p-6">
                      <div className="flex items-start mb-4">
                        <div className="p-3 bg-primary/10 text-primary rounded-xl mr-4">
                          <Stethoscope className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="text-xl font-heading font-bold text-gray-900">
                            {hospital.split(',')[0]}
                          </h3>
                          <p className="text-gray-500 text-sm">
                            {hospital.split(',').slice(1).join(',').trim()}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center text-gray-600 mb-4">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                        <span className="text-sm">Active Training Partner</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-600">
                          <span className="font-semibold">Training Areas:</span>
                          <div className="mt-1 flex flex-wrap gap-1">
                            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">Clinical Rotation</span>
                            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Internship</span>
                            <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">Placement</span>
                          </div>
                        </div>
                        <div className="bg-green-50 text-green-700 px-3 py-1 rounded-lg text-sm font-semibold">
                          Partner Since 2018
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Additional Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8" />
                  </div>
                  <h4 className="font-heading font-bold text-gray-900 mb-2">Clinical Exposure</h4>
                  <p className="text-gray-600 text-sm">
                    Hands-on training in real hospital environments
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Briefcase className="w-8 h-8" />
                  </div>
                  <h4 className="font-heading font-bold text-gray-900 mb-2">Guided Internships</h4>
                  <p className="text-gray-600 text-sm">
                    Supervised internships with experienced healthcare professionals
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="w-8 h-8" />
                  </div>
                  <h4 className="font-heading font-bold text-gray-900 mb-2">Career Opportunities</h4>
                  <p className="text-gray-600 text-sm">
                    Direct placement opportunities with partner hospitals
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Placement Process */}
        <section className="section-padding bg-neutral">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-neutral-dark mb-4">
                Placement Process
              </h2>
            </motion.div>

            <div className="max-w-6xl mx-auto">
              {/* ONE LINE GRID */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { step: 1, title: 'Registration', desc: 'Students register with placement cell' },
                  { step: 2, title: 'Training', desc: 'Pre-placement training and workshops' },
                  { step: 3, title: 'Interviews', desc: 'Campus interviews with partner hospitals' },
                  { step: 4, title: 'Offer Letters', desc: 'Job offer letter after selection and acceptance' },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="card text-center"
                  >
                    <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 font-heading font-bold">
                      {item.step}
                    </div>

                    <h3 className="text-xl font-heading font-semibold text-neutral-dark mb-2">
                      {item.title}
                    </h3>

                    <p className="text-gray-600 text-sm">
                      {item.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Recruiter Testimonials */}
        {/* {recruiterTestimonials.length > 0 && (
          <section className="section-padding">
            <div className="container-custom">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-neutral-dark mb-4">
                  What Hospital Partners Say
                </h2>
              </motion.div>

              <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {recruiterTestimonials.map((testimonial, index) => (
                  <motion.div
                    key={testimonial.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="card"
                  >
                    <Quote className="w-8 h-8 text-primary/30 mb-4" />
                    <p className="text-gray-700 mb-6 italic">"{testimonial.quote}"</p>
                    <div className="border-t pt-4">
                      <p className="font-semibold text-neutral-dark">{testimonial.name}</p>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                      <p className="text-sm text-primary">{testimonial.company}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )} */}


        <section className="section-padding">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-heading font-bold">
                What Hospital Partners Say
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {/* CARD 1 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="card"
              >
                <Quote className="w-8 h-8 text-primary/40 mb-4" />
                <p className="text-gray-700 italic mb-6">
                  "Students from this college are well-trained, disciplined, and
                  ready to work in real hospital environments. Their laboratory
                  knowledge and clinical skills are impressive."
                </p>
                <div className="border-t pt-4">
                  <p className="font-semibold text-neutral-dark">
                    Dr. P. A. Inamdar
                  </p>
                  <p className="text-sm text-gray-600">
                    Medical Director
                  </p>
                  <p className="text-sm text-primary">
                    Inamdar Hospital, Pune
                  </p>
                </div>
              </motion.div>

              {/* CARD 2 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="card"
              >
                <Quote className="w-8 h-8 text-primary/40 mb-4" />
                <p className="text-gray-700 italic mb-6">
                  "We are happy to collaborate with the college. The students
                  demonstrate excellent practical exposure, professionalism, and
                  a strong understanding of hospital protocols."
                </p>
                <div className="border-t pt-4">
                  <p className="font-semibold text-neutral-dark">
                    Dr. Kiran Bhalerao
                  </p>
                  <p className="text-sm text-gray-600">
                    Senior Consultant
                  </p>
                  <p className="text-sm text-primary">
                    Galaxy Hospital, Pune
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>


        {/* CTA Section */}
        <section className="section-padding bg-gradient-to-r from-primary to-primary-dark text-white">
          <div className="container-custom text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                Partner With Us
              </h2>
              <p className="text-xl mb-8 text-gray-100">
                Are you a hospital or healthcare institution looking to collaborate for training and recruitment?
              </p>
              <a href="/contact" className="btn-accent">
                Contact Placement Cell
              </a>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  )
}

export default Placements