import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { 
  GraduationCap, 
  Target, 
  Users, 
  Briefcase, 
  Heart,
  Globe,
  Languages,
  FlaskConical,
  Atom,
  Beaker,
  Calculator,
  Trophy,
  Music,
  Activity,
  MessageSquare,
  Compass,
  Library
} from 'lucide-react'

const Programs = () => {
  const developmentalPrograms = [
    {
      id: 1,
      icon: <Target className="w-8 h-8" />,
      title: "Performance Improvement Programme (PIP)",
      description: "Special coaching for Board Examination students to enhance their performance",
      features: [
        "Brushing up important topics",
        "Revision of difficult topics",
        "Three mock examinations (Preliminary Examination)",
        "Practice and master writing answers"
      ]
    },
    {
      id: 2,
      icon: <MessageSquare className="w-8 h-8" />,
      title: "Soft-skills Development",
      description: "Professional guidance for communication and remedial coaching",
      features: [
        "16-hour courses organized at different levels",
        "Remedial coaching for communication skills",
        "Professional guidance throughout academic year",
        "Individual attention to weak students"
      ]
    },
    {
      id: 3,
      icon: <Briefcase className="w-8 h-8" />,
      title: "Career Guidance",
      description: "Comprehensive career guidance and placement support",
      features: [
        "Well-established career guidance cell",
        "Coordination with placement cell",
        "Annual 'Master Mind' career fair",
        "Speakers from different vocations",
        "Guidance for students and parents"
      ]
    },
    {
      id: 4,
      icon: <Heart className="w-8 h-8" />,
      title: "Counseling Centre",
      description: "Professional counseling services for student wellbeing",
      features: [
        "Male and female counselors available",
        "Available on all working days (10:00 AM - 4:00 PM)",
        "Stress management and problem solving",
        "Aptitude, intelligence, and personality tests",
        "Personality development programs"
      ]
    },
    {
      id: 5,
      icon: <Users className="w-8 h-8" />,
      title: "Students' Council",
      description: "Student representation and activity coordination",
      features: [
        "Principal as Chairman",
        "Representatives from each class",
        "NSS, DLLE, Sports, and Cultural activities representatives",
        "One-year tenure",
        "Organizes and supervises student associations",
        "Addresses student grievances and welfare"
      ]
    }
  ]

  const associations = [
    {
      id: 1,
      icon: <Activity className="w-8 h-8" />,
      title: "Counseling Association",
      description: "Promotes counseling skills and mental wellbeing",
      features: [
        "Hosts lectures and interactive sessions",
        "Counseling skills workshops",
        "Field visits and practical training",
        "Regular workshops throughout the year"
      ]
    },
    {
      id: 2,
      icon: <Globe className="w-8 h-8" />,
      title: "Geography Association",
      description: "Provides firsthand experience of geographical concepts",
      features: [
        "Established in 1988",
        "Nature treks and field visits",
        "Film shows and educational talks",
        "Poster/slogan writing competitions",
        "Debate and elocution competitions"
      ]
    },
    {
      id: 3,
      icon: <Languages className="w-8 h-8" />,
      title: "English Literary Association",
      description: "Fosters love for English language and literature",
      features: [
        "Poetry recitation and appreciation",
        "Felicitation of dedicated litterateurs",
        "Workshops on literature and drama",
        "Book Circle activities",
        "Literary competitions"
      ]
    },
    {
      id: 4,
      icon: <Library className="w-8 h-8" />,
      title: "Marathi Vangmay Mandal",
      description: "Promotes Maharashtra's state language and literature",
      features: [
        "Dance-Music and Drama extravaganzas",
        "Literary works of Kusumagraj, Vinda Karandikar",
        "Sane Guruji literature celebrations",
        "Cultural unification activities"
      ]
    }
  ]

  const scienceAssociations = [
    {
      id: 1,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      ),
      title: "Biochemistry Association",
      description: "Exploring the chemical processes within living organisms",
      features: [
        "Enzyme kinetics and metabolic pathways",
        "Molecular biology techniques workshops",
        "Clinical biochemistry applications",
        "Research in biochemical disorders"
      ]
    },
    {
      id: 2,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
        </svg>
      ),
      title: "Microbiology Association",
      description: "Studying microorganisms and their impact on health and environment",
      features: [
        "Bacteriology and virology studies",
        "Microbial culture techniques",
        "Antibiotic sensitivity testing",
        "Industrial microbiology applications"
      ]
    },
    {
      id: 3,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      title: "Pathology Association",
      description: "Understanding disease mechanisms and diagnostic techniques",
      features: [
        "Clinical pathology and hematology",
        "Histopathology slide studies",
        "Cytology and biopsy analysis",
        "Forensic pathology basics"
      ]
    },
    {
      id: 4,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      title: "Anatomy Association",
      description: "Exploring human structure and physiological systems",
      features: [
        "Human anatomy and physiology",
        "Dissection and specimen studies",
        "Radiological anatomy imaging",
        "Embryology and developmental anatomy"
      ]
    }
  ]

  const extraActivities = [
    {
      id: 1,
      icon: <Trophy className="w-8 h-8" />,
      title: "SPORTS",
      description: "Comprehensive sports development program",
      features: [
        "Dedicated sports coordinator",
        "Reputed coaches for various sports",
        "Sports kits and allowances provided",
        "Training in heart of western suburbs",
        "Participation in intercollegiate competitions"
      ]
    },
    {
      id: 2,
      icon: <Music className="w-8 h-8" />,
      title: "CULTURAL ACTIVITIES",
      description: "Platform for artistic and cultural expression",
      features: [
        "Annual Talent Search program",
        "Theatre, Dance, and Music development",
        "Literary and Fine Arts activities",
        "Participation in Malhar, Mood Indigo, Umang",
        "Annual Mega festival 'Jaloosh'",
        "Intra and intercollegiate competitions"
      ]
    }
  ]

  return (
    <>
      <Helmet>
        <title>Programs & Activities | Uddavrao Tulshiram Foundation College</title>
        <meta name="description" content="Explore our comprehensive developmental programs, student associations, science clubs, and extracurricular activities for holistic student development." />
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
              <GraduationCap className="w-16 h-16 mx-auto mb-4" />
              <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
                Programs & Activities
              </h1>
              <p className="text-xl text-gray-100">
                Comprehensive developmental programs and activities for holistic student growth
              </p>
            </motion.div>
          </div>
        </section>

        {/* Paramedical Courses Section */}
        <section className="section-padding bg-gray-50">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <h1 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">
                Courses in – Aditya Education Foundation's College of Paramedical, Pune
              </h1>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Jadhavar Paramedical College, Pune offers industry-oriented diploma courses such as
                <strong> DMLT, DOTT and Diploma in X-Ray Technician </strong>
                with hospital-based practical training and career opportunities in the healthcare sector.
              </p>
            </motion.div>

            {/* Courses Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* DMLT Card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border-t-4 border-primary"
              >
                <div className="p-6">
                  <h2 className="text-xl font-heading font-bold text-gray-900 mb-2">
                    DMLT – Diploma in Medical Laboratory Technician
                  </h2>
                  <p className="text-primary font-semibold mb-3">
                    Duration: 2 Years
                  </p>
                  <p className="text-gray-600 mb-4">
                    The Diploma in Medical Laboratory Technician (DMLT) course focuses on
                    diagnostic laboratory techniques including pathology, microbiology,
                    hematology and clinical biochemistry.
                  </p>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span>Blood testing & laboratory diagnostics</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span>Pathology & microbiology basics</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span>Hospital & diagnostic lab training</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span>Career opportunities in medical laboratories</span>
                    </li>
                  </ul>
                </div>
              </motion.div>

              {/* DOTT Card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border-t-4 border-primary"
              >
                <div className="p-6">
                  <h2 className="text-xl font-heading font-bold text-gray-900 mb-2">
                    DOTT – Diploma in Operation Theatre Technician
                  </h2>
                  <p className="text-primary font-semibold mb-3">
                    Duration: 2 Years
                  </p>
                  <p className="text-gray-600 mb-4">
                    The Diploma in Operation Theatre Technician (DOTT) program prepares students
                    to assist surgeons and healthcare professionals during surgical procedures
                    in hospitals.
                  </p>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span>Operation theatre assistance</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span>Surgical instruments handling</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span>Pre & post-operative care</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span>OT technician career opportunities</span>
                    </li>
                  </ul>
                </div>
              </motion.div>

              {/* X-Ray Technician Card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border-t-4 border-primary"
              >
                <div className="p-6">
                  <h2 className="text-xl font-heading font-bold text-gray-900 mb-2">
                    Diploma in X-Ray Technician
                  </h2>
                  <p className="text-primary font-semibold mb-3">
                    Duration: 2 Years
                  </p>
                  <p className="text-gray-600 mb-4">
                    The Diploma in X-Ray Technician course trains students in radiology and
                    imaging techniques including X-Ray positioning, radiation safety
                    and diagnostic imaging procedures.
                  </p>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span>X-Ray & radiology techniques</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span>Patient positioning & safety</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span>Hospital imaging department training</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span>Career in diagnostic imaging centers</span>
                    </li>
                  </ul>
                </div>
              </motion.div>
            </div>

            {/* SEO Footer Text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-center mt-12 text-gray-600 max-w-4xl mx-auto"
            >
              <p>
                These paramedical diploma courses are ideal for students seeking
                healthcare careers after 12th pass. Jadhavar Paramedical College, Pune
                emphasizes practical training, hospital exposure, and employability
                in the medical and healthcare industry.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Developmental Programs Section */}
        <section className="section-padding">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">
                Developmental Programmes
              </h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Our comprehensive developmental programs ensure academic excellence and personal growth
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {developmentalPrograms.map((program, index) => (
                <motion.div
                  key={program.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="p-3 bg-primary/10 text-primary rounded-lg mr-4">
                        {program.icon}
                      </div>
                      <h3 className="text-xl font-heading font-bold text-gray-900">
                        {program.title}
                      </h3>
                    </div>
                    
                    <p className="text-gray-600 mb-4">
                      {program.description}
                    </p>
                    
                    <ul className="space-y-2">
                      {program.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Associations Section */}
        <section className="section-padding bg-gray-50">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <div className="flex items-center justify-center mb-4">
                <Compass className="w-10 h-10 text-primary mr-3" />
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900">
                  Student Associations
                </h2>
              </div>
              <p className="text-gray-600 max-w-3xl mx-auto italic mb-2">
                "Real Learning Happens outside the Classroom"
              </p>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Paradise College offers students ample opportunities to develop and sustain their interest in interdisciplinary fields of knowledge
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {associations.map((association, index) => (
                <motion.div
                  key={association.id}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border-l-4 border-primary"
                >
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="p-3 bg-primary/10 text-primary rounded-lg mr-4">
                        {association.icon}
                      </div>
                      <h3 className="text-xl font-heading font-bold text-gray-900">
                        {association.title}
                      </h3>
                    </div>
                    
                    <p className="text-gray-600 mb-4">
                      {association.description}
                    </p>
                    
                    <ul className="space-y-2">
                      {association.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Science Club Section - UPDATED */}
        <section className="section-padding">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <div className="flex items-center justify-center mb-4">
                <FlaskConical className="w-10 h-10 text-primary mr-3" />
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900">
                  Science Club
                </h2>
              </div>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Promoting scientific temper and practical application of scientific concepts
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {scienceAssociations.map((science, index) => (
                <motion.div
                  key={science.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="p-3 bg-primary/10 text-primary rounded-lg mr-4">
                        {science.icon}
                      </div>
                      <h3 className="text-xl font-heading font-bold text-gray-900">
                        {science.title}
                      </h3>
                    </div>
                    
                    <p className="text-gray-600 mb-4">
                      {science.description}
                    </p>
                    
                    <ul className="space-y-2">
                      {science.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Extra Activities Section */}
        <section className="section-padding bg-gray-50">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">
                Extra-curricular Activities
              </h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Developing talents beyond academics for overall personality development
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {extraActivities.map((activity, index) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="p-8">
                    <div className="flex items-center mb-6">
                      <div className="p-4 bg-white text-primary rounded-xl shadow-md mr-6">
                        {activity.icon}
                      </div>
                      <div>
                        <h3 className="text-2xl font-heading font-bold text-gray-900">
                          {activity.title}
                        </h3>
                        <p className="text-gray-600 mt-2">
                          {activity.description}
                        </p>
                      </div>
                    </div>
                    
                    <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6">
                      <h4 className="font-heading font-bold text-gray-800 mb-4">
                        Key Features:
                      </h4>
                      <ul className="space-y-3">
                        {activity.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start">
                            <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <span className="text-gray-700">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding bg-gradient-to-r from-primary to-primary-dark text-white">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-3xl mx-auto"
            >
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
                Join Our Vibrant Campus Life
              </h2>
              <p className="text-xl text-gray-100 mb-8">
                Experience holistic development through our diverse programs and activities designed to nurture your talents and shape your future.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-primary px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-colors duration-300 shadow-lg hover:shadow-xl"
              >
                Explore More Opportunities
              </motion.button>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  )
}

export default Programs