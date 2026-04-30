import { Helmet } from 'react-helmet-async'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { programs } from '../data/programs'
import { Clock, Users, GraduationCap, CheckCircle, Download, ArrowLeft } from 'lucide-react'

const ProgramDetail = () => {
  const { slug } = useParams()
  const program = programs.find(p => p.slug === slug)

  if (!program) {
    return (
      <div className="pt-20 section-padding">
        <div className="container-custom text-center">
          <h1 className="text-3xl font-heading font-bold mb-4">Program Not Found</h1>
          <Link to="/programs" className="btn-primary">Back to Programs</Link>
        </div>
      </div>
    )
  }

  return (
    <>
      <Helmet>
        <title>{program.title} | Uddavrao Tulshiram Foundation College of Paramedical</title>
        <meta name="description" content={program.description} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Course",
            "name": program.title,
            "description": program.description,
            "provider": {
              "@type": "EducationalOrganization",
              "name": "Uddavrao Tulshiram Foundation College of Paramedical"
            },
            "timeRequired": program.duration
          })}
        </script>
      </Helmet>

      <div className="pt-20">
        {/* Hero Section */}
<section className="bg-gradient-to-r from-primary to-primary-dark text-white py-16">
            <div className="container-custom">
            <Link to="/programs" className="inline-flex items-center space-x-2 text-white/80 hover:text-white mb-6">
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Programs</span>
            </Link>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
                {program.title}
              </h1>
              <p className="text-xl text-gray-100 max-w-3xl">
                {program.description}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Program Details */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Overview */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="card"
                >
                  <h2 className="text-2xl font-heading font-bold text-neutral-dark mb-4">
                    Program Overview
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    {program.description}
                  </p>
                </motion.div>

                {/* Highlights */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="card"
                >
                  <h2 className="text-2xl font-heading font-bold text-neutral-dark mb-4">
                    Program Highlights
                  </h2>
                  <ul className="space-y-3">
                    {program.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                {/* Syllabus */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="card"
                >
                  <h2 className="text-2xl font-heading font-bold text-neutral-dark mb-4">
                    Curriculum
                  </h2>
                  <div className="grid md:grid-cols-2 gap-3">
                    {program.syllabus.map((subject, index) => (
                      <div key={index} className="flex items-center space-x-2 text-gray-700">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span>{subject}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Career Prospects */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="card"
                >
                  <h2 className="text-2xl font-heading font-bold text-neutral-dark mb-4">
                    Career Prospects
                  </h2>
                  <ul className="space-y-2">
                    {program.careerProspects.map((career, index) => (
                      <li key={index} className="flex items-center space-x-3 text-gray-700">
                        <GraduationCap className="w-5 h-5 text-primary flex-shrink-0" />
                        <span>{career}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                {/* Recruiters */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="card"
                >
                  <h2 className="text-2xl font-heading font-bold text-neutral-dark mb-4">
                    Top Recruiters
                  </h2>
                  <div className="flex flex-wrap gap-3">
                    {program.recruiters.map((recruiter, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium"
                      >
                        {recruiter}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="card sticky top-24"
                >
                  <h3 className="text-xl font-heading font-bold text-neutral-dark mb-6">
                    Program Details
                  </h3>
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center space-x-3">
                      <Clock className="w-5 h-5 text-primary" />
                      <div>
                        <p className="text-sm text-gray-500">Duration</p>
                        <p className="font-semibold text-neutral-dark">{program.duration}</p>
                      </div>
                    </div>
                    {program.intake && (
                      <div className="flex items-center space-x-3">
                        <Users className="w-5 h-5 text-primary" />
                        <div>
                          <p className="text-sm text-gray-500">Intake</p>
                          <p className="font-semibold text-neutral-dark">{program.intake}</p>
                        </div>
                      </div>
                    )}
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Eligibility</p>
                      <p className="text-sm text-gray-700">{program.eligibility}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Fee Range</p>
                      <p className="text-sm font-semibold text-neutral-dark">{program.feeRange}</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Link to="/admissions" className="block w-full btn-accent text-center">
                      Apply Now
                    </Link>
                    <Link to="/admissions" className="block w-full btn-outline text-center">
                      <Download className="w-4 h-4 inline mr-2" />
                      Download Prospectus
                    </Link>
                    <Link to="/contact" className="block w-full text-center text-primary font-medium hover:text-primary-dark transition-colors">
                      Enquire Now
                    </Link>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default ProgramDetail

