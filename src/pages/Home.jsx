
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import NoticeTicker from '../components/NoticeTicker'
import { Users, Hospital, Award, Briefcase, Star, Quote, Clock, UsersRound, ArrowRight, Download, X } from 'lucide-react'

const Home = () => {
  const [showPopup, setShowPopup] = useState(false)

  // Check if popup was shown in this session
  useEffect(() => {
    // Always show popup on page load/refresh
    // Small delay to ensure smooth page load
    const timer = setTimeout(() => {
      setShowPopup(true)
    }, 500)

    return () => clearTimeout(timer)
  }, []) // Empty dependency array ensures it runs on every mount (refresh)

  const closePopup = () => {
    setShowPopup(false)
  }

  const stats = [
    { icon: Users, value: '2000+', label: 'Students Trained' },
    { icon: Hospital, value: '50+', label: 'Hospital Tie-ups' },
    { icon: Award, value: '7+', label: 'Years of Excellence' },
    { icon: Briefcase, value: '100%', label: 'Placement Rate' },
  ]

  const paramedicalPrograms = [
    {
      id: 1,
      programName: "DMLT",
      fullName: "Diploma in Medical Laboratory Technician",
      duration: "2 Years",
      intake: "60 Seats",
      description: "Comprehensive training in medical laboratory techniques including pathology, microbiology, hematology.",
      features: [
        "Blood testing & laboratory diagnostics",
        "Pathology & microbiology basics",
        "Hospital & diagnostic lab training"
      ],
      color: "from-blue-500 to-blue-600"
    },
    {
      id: 2,
      programName: "DOTT",
      fullName: "Diploma in Operation Theatre Technician",
      duration: "2 Years",
      intake: "60 Seats",
      description: "Training to assist surgeons during surgical procedures in operation theatres.",
      features: [
        "Operation theatre assistance",
        "Surgical instruments handling",
        "Pre & post-operative care"
      ],
      color: "from-green-500 to-green-600"
    },
    {
      id: 3,
      programName: "X-Ray Technician",
      fullName: "Diploma in X-Ray Technician",
      duration: "2 Years",
      intake: "60 Seats",
      description: "Specialized training in radiology and imaging techniques including X-Ray positioning.",
      features: [
        "X-Ray & radiology techniques",
        "Patient positioning & safety",
        "Hospital imaging department training"
      ],
      color: "from-purple-500 to-purple-600"
    }
  ]

  const testimonials = [
    {
      id: 1,
      name: "Priya Sharma",
      role: "DMLT Graduate",
      company: "Apollo Hospitals, Pune",
      quote: "The practical training and hospital exposure at Jadhavar College prepared me perfectly for my career in medical laboratories.",
      rating: 5
    },
    {
      id: 2,
      name: "Rahul Deshmukh",
      role: "Operation Theatre Technician",
      company: "Ruby Hall Clinic",
      quote: "The hands-on training in surgical procedures and OT management gave me the confidence to excel in operation theatre environments.",
      rating: 5
    },
    {
      id: 3,
      name: "Dr. Anjali Patil",
      role: "Hospital Administrator",
      company: "Sahyadri Hospitals",
      quote: "We consistently hire graduates from Jadhavar College for their practical skills and professional attitude in healthcare settings.",
      rating: 5
    }
  ]

  return (
    <>
      <Helmet>
        <title>Aditya Educational Foundation's College of Paramedical, Pune</title>
        <meta name="description" content="Training Compassionate & Competent Healthcare Professionals through rigorous academics, hands-on clinical training, and strong hospital partnerships." />
        <meta property="og:title" content="Aditya Educational Foundation's College of Paramedical, Pune" />
        <meta property="og:description" content="Training Compassionate & Competent Healthcare Professionals" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "EducationalOrganization",
            "name": "Aditya Educational Foundation's College of Paramedical, Pune",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Pune",
              "addressRegion": "Maharashtra",
              "addressCountry": "IN"
            },
            "description": "Training Compassionate & Competent Healthcare Professionals"
          })}
        </script>
      </Helmet>

      <div className="pt-20">
        <NoticeTicker />
        
        {/* Hero Section with Left Text and Right Background Image */}
        <section className="relative min-h-[90vh] flex items-center">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ 
                backgroundImage: "url('/assets/images/hero.png')",
                backgroundPosition: 'center right'
              }}
            >
              {/* Gradient overlay for better text readability */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent"></div>
            </div>
          </div>

          {/* Content */}
          <div className="container-custom relative z-10 py-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* ================= LEFT COLUMN ================= */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="text-white"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                >
                  {/* ===== MAIN HEADING ===== */}
                  <h3 className="font-heading font-bold leading-tight mb-6">
                    <span className="block text-3xl md:text-4xl lg:text-5xl">
                      Aditya Educational Foundation's
                    </span>
                    <span className="block text-xl md:text-2xl lg:text-3xl mt-2 font-semibold text-gray-200">
                      College of Paramedical, Pune
                    </span>
                  </h3>

                  {/* ===== SUB HEADING + DESCRIPTION ===== */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="mb-8"
                  >
                    <h2 className="text-xl md:text-2xl font-semibold text-accent mb-3">
                      Training Compassionate & Competent Healthcare Professionals
                    </h2>
                    <p className="text-base text-gray-200 max-w-xl">
                      Empowering future healthcare technicians with industry-oriented
                      training, practical experience, and 100% placement assistance.
                    </p>
                  </motion.div>

                  {/* ===== CTA BUTTONS ===== */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className="flex flex-wrap gap-4 mt-6"
                  >
                    <Link
                      to="/admissions"
                      className="bg-accent text-white px-7 py-3.5 rounded-xl font-semibold text-base hover:bg-accent-dark transition-colors shadow-lg hover:shadow-xl flex items-center gap-2 min-w-[170px]"
                    >
                      Apply Now
                      <ArrowRight className="w-5 h-5" />
                    </Link>

                    <a
                      href="/assets/images/prospectus.png"
                      download="Aditya_Educational_Foundation_Prospectus.png"
                      className="bg-white text-primary px-7 py-3.5 rounded-xl font-semibold text-base hover:bg-gray-100 transition-colors shadow-lg hover:shadow-xl flex items-center gap-2 min-w-[190px]"
                    >
                      <Download className="w-5 h-5" />
                      Download Prospectus
                    </a>

                    <Link
                      to="/contact"
                      className="border-2 border-white text-white px-7 py-3.5 rounded-xl font-semibold text-base hover:bg-white hover:text-primary transition-colors shadow-lg hover:shadow-xl flex items-center gap-2 min-w-[190px]"
                    >
                      Book Campus Visit
                    </Link>
                  </motion.div>
                </motion.div>
              </motion.div>

              {/* ================= RIGHT COLUMN ================= */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8, duration: 1 }}
                className="hidden lg:block"
              >
                {/* Background image already covers this space */}
              </motion.div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
          >
            <div className="flex flex-col items-center">
              <span className="text-white text-sm mb-2">Scroll to Explore</span>
              <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
                <motion.div
                  animate={{ y: [0, 12, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="w-1 h-3 bg-white rounded-full mt-2"
                />
              </div>
            </div>
          </motion.div>
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
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                    <stat.icon className="w-8 h-8 text-primary" />
                  </div>
                  <div className="text-3xl md:text-4xl font-heading font-bold text-primary mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Paramedical Programs Section - Horizontal Cards */}
        <section className="section-padding">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-neutral-dark mb-4">
                Our Paramedical Programs
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Industry-oriented diploma courses designed to train skilled healthcare technicians 
                for modern medical facilities
              </p>
            </motion.div>

            {/* Horizontal Program Cards - Show first 2 */}
            <div className="mb-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {paramedicalPrograms.slice(0, 2).map((program, index) => (
                  <motion.div
                    key={program.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="group"
                  >
                    <div className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-200 overflow-hidden h-full hover:-translate-y-1">
                      {/* Program Header with Gradient */}
                      <div className={`bg-gradient-to-r ${program.color} text-white p-6`}>
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-2xl md:text-3xl font-heading font-bold mb-2">
                              {program.programName}
                            </h3>
                            <p className="text-white/90 text-sm">
                              {program.fullName}
                            </p>
                          </div>
                          <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                            <Hospital className="w-6 h-6" />
                          </div>
                        </div>
                      </div>

                      {/* Program Details */}
                      <div className="p-6">
                        <p className="text-gray-600 mb-6">
                          {program.description}
                        </p>

                        {/* Features List */}
                        <ul className="space-y-3 mb-6">
                          {program.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start">
                              <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                              <span className="text-gray-700">{feature}</span>
                            </li>
                          ))}
                        </ul>

                        {/* Duration and Intake */}
                        <div className="grid grid-cols-2 gap-4 mb-6">
                          <div className="bg-gray-50 rounded-xl p-4 text-center">
                            <div className="flex items-center justify-center mb-2">
                              <Clock className="w-5 h-5 text-gray-500 mr-2" />
                              <span className="font-bold text-gray-900">Duration</span>
                            </div>
                            <p className="text-lg font-bold text-primary">{program.duration}</p>
                          </div>
                          <div className="bg-gray-50 rounded-xl p-4 text-center">
                            <div className="flex items-center justify-center mb-2">
                              <UsersRound className="w-5 h-5 text-gray-500 mr-2" />
                              <span className="font-bold text-gray-900">Intake</span>
                            </div>
                            <p className="text-lg font-bold text-accent">{program.intake}</p>
                          </div>
                        </div>

                        {/* View Details Button */}
                        <Link 
                          to="/programs" 
                          className="w-full bg-gray-50 hover:bg-gray-100 text-gray-800 font-semibold py-3 px-4 rounded-xl flex items-center justify-center group-hover:text-primary transition-colors"
                        >
                          View Program Details
                          <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* View More Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <Link 
                to="/programs" 
                className="inline-flex items-center bg-primary text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-primary-dark transition-colors shadow-lg hover:shadow-xl"
              >
                View All Programs
                <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

            {/* Program Highlights */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16"
            >
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-blue-500 text-white rounded-lg mr-4">
                    <Hospital className="w-6 h-6" />
                  </div>
                  <h3 className="font-heading font-bold text-gray-900 text-lg">
                    Hospital Training
                  </h3>
                </div>
                <p className="text-gray-600">
                  Extensive hands-on training in affiliated hospitals for real-world experience.
                </p>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-xl border border-green-200">
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-green-500 text-white rounded-lg mr-4">
                    <Briefcase className="w-6 h-6" />
                  </div>
                  <h3 className="font-heading font-bold text-gray-900 text-lg">
                    100% Placement
                  </h3>
                </div>
                <p className="text-gray-600">
                  Dedicated placement cell ensuring career opportunities in top healthcare institutions.
                </p>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-6 rounded-xl border border-purple-200">
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-purple-500 text-white rounded-lg mr-4">
                    <Award className="w-6 h-6" />
                  </div>
                  <h3 className="font-heading font-bold text-gray-900 text-lg">
                    Certified Programs
                  </h3>
                </div>
                <p className="text-gray-600">
                  Recognized by Maharashtra Paramedical Council and affiliated with reputed universities.
                </p>
              </div>
            </motion.div>

            {/* Why Choose Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-16 text-center max-w-3xl mx-auto"
            >
              <h3 className="text-2xl font-semibold mb-4 text-neutral-dark">
                Why Choose Aditya Paramedical College?
              </h3>
              <p className="text-gray-600">
                Located in Narhe-Dhayari, Pune, our college is affiliated with renowned universities and 
                approved by the Maharashtra Paramedical Council. We provide modern laboratories, experienced 
                faculty, and extensive clinical exposure through hospital tie-ups, ensuring students gain 
                real-world healthcare experience.
              </p>
              <p className="text-gray-600 mt-3">
                Our diploma programs in DMLT, DOTT, and X-Ray Technology prepare students to serve in 
                hospitals, diagnostic centers, and public health sectors with compassion and professional 
                excellence.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="section-padding bg-neutral">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-neutral-dark mb-4">
                What Our Students & Partners Say
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="card"
                >
                  <div className="flex items-center space-x-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                    ))}
                  </div>
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

        {/* CTA Section */}
        <section className="section-padding bg-gradient-to-r from-primary to-primary-dark text-white">
          <div className="container-custom text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                Ready to Start Your Healthcare Career?
              </h2>
              <p className="text-xl mb-8 text-gray-100">
                Join us and become part of the next generation of healthcare professionals
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/admissions" className="btn-accent">
                  Apply Now
                </Link>
                <Link to="/contact" className="bg-white text-primary px-6 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors">
                  Book Campus Visit
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>

      {/* Popup Modal - Smaller size with margins */}
      {showPopup && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/70 backdrop-blur-sm animate-fadeIn"
          onClick={closePopup}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="relative max-w-md md:max-w-lg w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button - Positioned absolutely */}
            <button
              onClick={closePopup}
              className="absolute -top-3 -right-3 md:-top-4 md:-right-4 bg-white rounded-full p-1.5 md:p-2 shadow-lg hover:bg-gray-100 transition-colors z-10"
              aria-label="Close popup"
            >
              <X className="w-5 h-5 md:w-6 md:h-6 text-gray-800" />
            </button>

            {/* Popup Image Container */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-white">
              <img
                src="/assets/images/popup.png"
                alt="Aditya Educational Foundation's College of Paramedical"
                className="w-full h-auto object-contain max-h-[80vh]"
                loading="eager"
                onError={(e) => {
                  console.error('Popup image failed to load');
                  e.target.style.display = 'none';
                  const parent = e.target.parentElement;
                  if (parent) {
                    parent.innerHTML = `
                      <div class="bg-gradient-to-r from-primary to-primary-dark p-8 text-center">
                        <h3 class="text-2xl font-bold text-white mb-4">Aditya Educational Foundation's</h3>
                        <p class="text-gray-100 mb-6">College of Paramedical, Pune</p>
                        <button onclick="this.closest('.fixed').style.display='none'" class="bg-white text-primary px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">Close</button>
                      </div>
                    `;
                  }
                }}
              />
            </div>
          </motion.div>
        </div>
      )}

      {/* Add custom CSS for animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-in-out;
        }
      `}</style>
    </>
  )
}

export default Home