import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { Target, Eye, Award, Users, Heart, BookOpen, GraduationCap, Building, Star, Shield, Users as UsersIcon, Globe } from 'lucide-react'

// Import images from assets
import presidentImage from '/assets/images/president.png'
import vicePresidentImage from '/assets/images/vice-president.png'
import treasurerImage from '/assets/images/treasurer.png'

const About = () => {
  const values = [
    { icon: Heart, title: 'Compassion', description: 'We instill empathy and care in every healthcare professional we train.' },
    { icon: Award, title: 'Excellence', description: 'We maintain the highest standards in education and clinical training.' },
    { icon: BookOpen, title: 'Innovation', description: 'We embrace modern teaching methods and cutting-edge technology.' },
    { icon: Users, title: 'Integrity', description: 'We promote ethical practices and professional responsibility.' },
  ]

  const institutes = [
    "Aditya Institute of Management (MBA)",
    "Paradise Kids, Narhe, Pune",
    "Paradise English Medium Primary School, Narhe, Pune",
    "Paradise English Medium Secondary High School, Narhe, Pune",
    "Paradise Arts, Science, Commerce Jr. College, Narhe, Pune",
    "Prin. Dr. Sudhakarrao Jadhavar Primary School (Marathi Medium), Dhankawdi, Pune",
    "Prin. Dr. Sudhakarrao Jadhavar Secondary High School (Marathi Medium), Dhankawdi, Pune",
    "Paradise English Medium Pre-Primary School, Dhankawdi, Pune",
    "Paradise English Medium Primary School, Dhankawdi, Pune",
    "Dr. Sudhakarrao Jadhavar Arts (B.A/M.A) College, Narhe, Pune",
    "Dr. Sudhakarrao Jadhavar Commerce (B.Com/M.Com) College, Narhe, Pune",
    "Dr. Sudhakarrao Jadhavar Science (B.Sc) College, Narhe, Pune",
    "Institute of Nursing (R.A.N.M./R.G.N.M), Narhe, Pune",
    "Institute of Nursing (R.A.N.M./R.G.N.M), Terkheda, Osmanabad",
    "Swami Vivekanand Pre-Primary School, Terkheda, Osmanabad",
    "Swami Vivekanand Primary School, Terkheda, Osmanabad",
    "Jadhavar Kids (C.B.S.E), Narhe, Pune",
    "Jadhavar International Primary School (C.B.S.E), Narhe, Pune",
    "Prin. Dr. Sudhakar Jadhavar Pre-Primary School (Marathi Medium), Narhe, Pune",
    "Prin. Dr. Sudhakar Jadhavar Primary School (Marathi Medium), Narhe, Pune",
    "Prin. Dr. Sudhakar Jadhavar Secondary High School (Marathi Medium), Narhe, Pune",
    "Yeshwantrao Chavan Maharashtra Open University Center, Narhe, Pune",
    "Jai Ganesh Pre-Primary School (English Medium), Narhe, Pune",
    "Jai Ganesh Primary School (English Medium), Narhe, Pune",
    "Dr. Sudhakar Jadhavar College of Education, Narhe, Pune",
    "Jai Ganesh D.Ed. College, Narhe, Pune",
    "Jadhavar College Of Law, Narhe, Pune",
    "Adv. Shardulrao Sudhakarrao Jadhavar College of LAW, Narhe, Pune"
  ]

  return (
    <>
      <Helmet>
        <title>About Us | Uddavrao Tulshiram Foundation College of Paramedical</title>
        <meta name="description" content="Learn Aditya Educational Foudation's
College of Paramedical College of Paramedical, our mission, vision, values, and commitment to training skilled healthcare professionals." />
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
              <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
                 About Aditya Educational Foudation's

              </h1>
              <p className="text-xl text-gray-100">
                College of Paramedical, Pune
              </p>
            </motion.div>
          </div>
        </section>

        {/* About Content */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="max-w-6xl mx-auto">
              {/* College Overview */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="prose prose-lg max-w-none mb-12"
              >
                <h2 className="text-3xl font-heading font-bold text-neutral-dark mb-6">About the College</h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Aditya Educational Foudation's
College of Paramedical was established in the year 2011 with an aim of enhancing healthcare professionals in such a way that they can succeed in the modern system of healthcare and research.
                </p>
              </motion.div>

              {/* Philosophy Section */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="card bg-gradient-to-r from-primary/10 to-primary-light/10 mb-12"
              >
                <div className="flex items-center space-x-3 mb-6">
                  <Heart className="w-8 h-8 text-primary" />
                  <h2 className="text-2xl font-heading font-bold text-neutral-dark">Our Philosophy</h2>
                </div>
                <div className="space-y-4 text-gray-700">
                  <p>
                    Health is a fundamental human right. Maintenance of optimum level of health entails individual as well as social responsibility. However health can never be adequately protected by health services without active involvement of the community.
                  </p>
                  <p className="italic border-l-4 border-primary pl-4 py-2">
                    Our institution believes in the concept of health as laid down by the World Health Organization: "Health is a state of complete physical, mental, social and spiritual wellbeing not merely the absence of disease or deformity."
                  </p>
                </div>
              </motion.div>

              {/* Mission & Vision */}
              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="card"
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <Target className="w-8 h-8 text-primary" />
                    <h2 className="text-2xl font-heading font-bold text-neutral-dark">Our Vision</h2>
                  </div>
                  <p className="text-gray-700">
                    Our statement 'Education for strength intellect & wisdom', to educate all students to the highest levels of academic achievement to enable them to reach & expand their potential & to prepare them to become productive, responsible, ethical, creative & compassionate members of society.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="card"
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <Eye className="w-8 h-8 text-primary" />
                    <h2 className="text-2xl font-heading font-bold text-neutral-dark">Our Mission</h2>
                  </div>
                  <div className="space-y-3 text-gray-700">
                    <p>• To encourage students to draw inspiration from their ethos and culture and broaden their horizons to embrace a world view</p>
                    <p>• To teach students the important values of life like honesty, humility and humanity</p>
                    <p>• To dream big and strive to achieve their highest potential</p>
                    <p>• To have underprivileged children along with privileged children, through such efforts we will contribute to develop our rural communities</p>
                  </div>
                </motion.div>
              </div>

              {/* Founder's Message */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-12"
              >
                <h2 className="text-3xl font-heading font-bold text-neutral-dark mb-8 text-center">
                  Leadership Team
                </h2>
                
                <div className="grid md:grid-cols-3 gap-8">
                  {/* President */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="card hover:shadow-xl transition-shadow duration-300"
                  >
                    <div className="text-center mb-4">
                      <div className="w-32 h-32 mx-auto mb-4 overflow-hidden rounded-full border-4 border-primary/20 shadow-lg">
                        <img 
                          src={presidentImage} 
                          alt="Prin. Dr. Sudhakarrao Jadhavar"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h3 className="text-xl font-heading font-bold text-neutral-dark">President</h3>
                      <p className="text-primary font-semibold">Prin. Dr. Sudhakarrao Jadhavar</p>
                      <p className="text-sm text-gray-600 mt-1">M.Com, M.A., L.L.M., M.P.M., D.T.L., D.L.L. & L. W., G.D.C. & A., Ph. D.</p>
                    </div>
                    <div className="space-y-2 text-sm text-gray-700">
                      <p className="flex items-start">
                        <Star className="w-4 h-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
                        Member of management council: Savitribai Phule Pune University, Pune
                      </p>
                      <p className="flex items-start">
                        <Star className="w-4 h-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
                        Former Dean: Department of Commerce, Savitribai Phule Pune University
                      </p>
                      <p className="flex items-start">
                        <Star className="w-4 h-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
                        General secretary: Principle forum (SPPU)
                      </p>
                      <p className="flex items-start">
                        <Star className="w-4 h-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
                        Member: Maharashtra Nursing Council, Maharashtra state
                      </p>
                    </div>
                    <div className="mt-4 pt-4 border-t">
                      <p className="text-gray-700 italic">
                        "Education for strength, wisdom and intellect" with this vision Institute Of Nursing has emerged as knowledge hub since its inception. Situated in rural area the college provides a value based education to the youth to develop into the winning personality and a complete human being.
                      </p>
                    </div>
                  </motion.div>

                  {/* Vice-President */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="card hover:shadow-xl transition-shadow duration-300"
                  >
                    <div className="text-center mb-4">
                      <div className="w-32 h-32 mx-auto mb-4 overflow-hidden rounded-full border-4 border-primary/20 shadow-lg">
                        <img 
                          src={vicePresidentImage} 
                          alt="Adv. Shardul Sudhakarrao Jadhavar"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h3 className="text-xl font-heading font-bold text-neutral-dark">Vice-President</h3>
                      <p className="text-primary font-semibold">Adv. Shardul Sudhakarrao Jadhavar</p>
                      <p className="text-sm text-gray-600 mt-1">M.B.A., P.G.D.H.R.M., B.Com., D.H.R.&L., D.C.L., D.CP.L., APCL, DIPL, CMED., D.LL&L.W., L.L.M.</p>
                    </div>
                    <div className="space-y-3 text-gray-700">
                      <p>
                        Present education is undergoing a rapid change and it is quite understandable that it becomes difficult to make decision about which course and which college to choose. In any case the ultimate aim of education is to make a person knowledgeable and well informed.
                      </p>
                      <p>
                        Our college looks at education differently. An extremely efficient and competent faculty is the guiding force behind grooming students.
                      </p>
                    </div>
                    <div className="mt-4 pt-4 border-t">
                      <p className="text-gray-700 italic">
                        "Our focus is on creating well-rounded professionals who are not only academically excellent but also ethically sound and socially responsible."
                      </p>
                    </div>
                  </motion.div>

                  {/* Treasurer */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="card hover:shadow-xl transition-shadow duration-300"
                  >
                    <div className="text-center mb-4">
                      <div className="w-32 h-32 mx-auto mb-4 overflow-hidden rounded-full border-4 border-primary/20 shadow-lg">
                        <img 
                          src={treasurerImage} 
                          alt="Mrs. Surekha Sudhakarrao Jadhavar"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h3 className="text-xl font-heading font-bold text-neutral-dark">Treasurer</h3>
                      <p className="text-primary font-semibold">Mrs. Surekha Sudhakarrao Jadhavar</p>
                      <p className="text-sm text-gray-600 mt-1">B.A., B.Ed., Social Activist</p>
                    </div>
                    <div className="space-y-3 text-gray-700">
                      <p>
                        Mrs. Surekha S. Jadhavar lauded the efforts of Jadhavar Institution in taking a proactive step towards bringing the staff, students and parents from different branches together under one roof.
                      </p>
                      <p>
                        She is an inspirational idol of the Jadhavar Department. Her true motivation makes the entire team of Jadhavar Institution feel at home and acquaint them to the traditional and cultural activities.
                      </p>
                      <p>
                        She actively runs the women cell section which gives all the support and security to the women of the Jadhavar Institution.
                      </p>
                    </div>
                    <div className="mt-4 pt-4 border-t">
                      <p className="text-gray-700 italic">
                        "Empowering women through education and providing a safe, supportive environment for all students is our priority."
                      </p>
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              {/* About Jadhavar Group */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="card bg-gradient-to-br from-primary/5 to-primary-light/5 mb-12"
              >
                <div className="flex items-center space-x-3 mb-6">
                  <Building className="w-8 h-8 text-primary" />
                  <h2 className="text-2xl font-heading font-bold text-neutral-dark">About Jadhavar Group of Institutes</h2>
                </div>
                <div className="space-y-4 text-gray-700">
                  <p>
                    Education is focused on bringing social, intellectual and quality Education under the Umbrella of Prin. Dr. Sudhakarrao Jadhavar Group of Educational Institutes. Once a student takes admission in any of our standards which start from nursery to post graduation in different disciplines, we believe in translating aims into action with perfection.
                  </p>
                  <p>
                    We believe in the divinity inherent in everyone which is the natural quality of mankind. Within no time, the brand name "Jadhavar - Symbol of Success" has been created as over eleven thousand students and their parents with seven hundred plus employees have trusted it.
                  </p>
                  <p>
                    We have different disciplines such as Arts, Commerce, Science, Nursing, D.Ed., B.Ed., Open University education centre and last but not least, two years Masters in Business Administration.
                  </p>
                </div>
              </motion.div>

              {/* Core Values */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-12"
              >
                <h2 className="text-3xl font-heading font-bold text-neutral-dark mb-8 text-center">
                  Our Core Values
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {values.map((value, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start space-x-4 p-6 bg-neutral rounded-xl hover:shadow-lg transition-shadow duration-300"
                    >
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <value.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-heading font-semibold text-neutral-dark mb-2">
                          {value.title}
                        </h3>
                        <p className="text-gray-600">{value.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Institutes List */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-12"
              >
                <div className="flex items-center space-x-3 mb-6">
                  <Globe className="w-8 h-8 text-primary" />
                  <h2 className="text-2xl font-heading font-bold text-neutral-dark">Jadhavar Group of Educational Institutes</h2>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {institutes.map((institute, index) => (
                    <div key={index} className="p-4 bg-white rounded-lg border border-gray-200 hover:border-primary transition-colors duration-300">
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700">{institute}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Why Choose Us */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="card bg-gradient-to-br from-primary/5 to-primary-light/5"
              >
                <h2 className="text-3xl font-heading font-bold text-neutral-dark mb-6">
                  Why Choose Us?
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <ul className="space-y-4 text-gray-700">
                      <li className="flex items-start space-x-3">
                        <span className="text-primary font-bold mt-1">✓</span>
                        <span><strong>Experienced Faculty:</strong> Our faculty members bring years of clinical and academic experience to the classroom.</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <span className="text-primary font-bold mt-1">✓</span>
                        <span><strong>Modern Facilities:</strong> State-of-the-art laboratories and simulation centers for hands-on learning.</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <span className="text-primary font-bold mt-1">✓</span>
                        <span><strong>Industry Partnerships:</strong> Strong ties with leading hospitals and healthcare institutions for clinical training.</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <span className="text-primary font-bold mt-1">✓</span>
                        <span><strong>Placement Support:</strong> Dedicated placement cell with 95% placement rate and ongoing career guidance.</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <ul className="space-y-4 text-gray-700">
                      <li className="flex items-start space-x-3">
                        <span className="text-primary font-bold mt-1">✓</span>
                        <span><strong>Comprehensive Curriculum:</strong> Industry-relevant programs designed to meet current healthcare demands.</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <span className="text-primary font-bold mt-1">✓</span>
                        <span><strong>Student Support:</strong> Holistic development through extracurricular activities, counseling, and mentorship.</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <span className="text-primary font-bold mt-1">✓</span>
                        <span><strong>Value-Based Education:</strong> Focus on developing winning personalities and complete human beings.</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <span className="text-primary font-bold mt-1">✓</span>
                        <span><strong>Women Empowerment:</strong> Special fee concessions and support for women students.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default About