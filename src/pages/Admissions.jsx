import { Helmet } from 'react-helmet-async'
import { useState } from 'react'

import { motion } from 'framer-motion'
import { FileText, Download, CheckCircle, ChevronDown, ChevronUp, Calendar, DollarSign, FileCheck } from 'lucide-react'

const Admissions = () => {
  const [openFaq, setOpenFaq] = useState(null)

  const admissionSteps = [
    { step: 1, title: 'Application', description: 'Fill out the online application form or download and submit the offline form', icon: FileText },
    { step: 2, title: 'Document Verification', description: 'Submit required documents for verification (marksheets, certificates, ID proof)', icon: FileCheck },
    { step: 3, title: 'Entrance Test/Interview', description: 'Appear for entrance examination or interview as per program requirements', icon: CheckCircle },
    { step: 4, title: 'Fee Payment', description: 'Pay the admission fees and secure your seat', icon: DollarSign },
    { step: 5, title: 'Enrollment', description: 'Complete enrollment formalities and receive admission confirmation', icon: CheckCircle },
  ]

  const faqs = [
  {
    question: 'What are the eligibility criteria for admission?',
    answer: 'Eligibility varies by program. For most paramedical courses, candidates must have passed 10+2 (HSC) with Science stream (Physics, Chemistry, Biology) from a recognized board with a minimum of 45–50% aggregate marks. For ANM, students from any stream with English subject are eligible, and for GNM, Science stream is preferred. Minimum age required is 17 years as on 31st December of the admission year. All applicants must be medically fit as per institute norms.'
  },
  {
    question: 'When does the admission process start?',
    answer: 'The admission process at Late Uddhavrao Tulshiram Jadhavar Foundation’s College of Paramedical, Pune, usually begins in March–April for the academic year starting in July or August. Admission notifications are published on the official college website and notice boards. Students are encouraged to apply early as seats are limited and admissions are strictly based on merit and eligibility.'
  },
  {
    question: 'Is there an entrance examination?',
    answer: 'Generally, admissions are based on merit in the qualifying examination (10+2). However, for select programs, the college may conduct interviews or screening rounds to assess aptitude and communication skills. Detailed information regarding entrance or merit lists is announced by the Admission Cell during the admission cycle.'
  },
  {
    question: 'What documents are required for admission?',
    answer: 'Applicants must submit the following documents at the time of admission: 10th and 12th mark sheets, passing certificates, transfer certificate, migration certificate (if applicable), caste certificate (for reserved category candidates), income certificate (for fee concessions), passport-size photographs, Aadhaar card or valid ID proof, and medical fitness certificate. All documents must be verified and attested copies submitted to the admission office.'
  },
  {
    question: 'Are there any scholarships or fee concessions available?',
    answer: 'Yes, the college provides various scholarships and fee concessions as per Government of Maharashtra norms. Eligible students can apply for EBC, SC/ST/OBC, and minority scholarships through the MahaDBT portal. The institute also supports students with guidance in applying for private and central government scholarship schemes.'
  },
  {
    question: 'Can I apply for multiple programs?',
    answer: 'Yes, students can apply for multiple paramedical programs such as DMLT, ANM, and GNM, provided they meet the eligibility criteria for each course. Separate application forms and required documents must be submitted for each program.'
  },
  {
    question: 'What is the fee structure?',
    answer: 'The fee structure at Late Uddhavrao Tulshiram Jadhavar Foundation’s College of Paramedical, Pune, is affordable and regulated as per Savitribai Phule Pune University and Maharashtra Paramedical Council guidelines. Fees vary depending on the course (ANM, GNM, DMLT, etc.). Detailed fee information is available at the college office and in the official prospectus.'
  },
  {
    question: 'Is hostel accommodation available?',
    answer: 'Yes, the college provides well-maintained hostel facilities for both male and female students. Hostels are located within or near the campus and include mess services, 24-hour security, and basic amenities for comfortable living. Hostel admissions are offered on a first-come, first-served basis, and students can contact the hostel warden or administration office for fee details and availability.'
  }
];

  return (
    <>
      <Helmet>
        <title>Admissions | Uddavrao Tulshiram Foundation College of Paramedical</title>
        <meta name="description" content="Admission process, eligibility criteria, fee structure, and application forms for paramedical programs at UT Foundation College." />
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
                Admissions
              </h1>
              <p className="text-xl text-gray-100">
                Start your journey towards a rewarding healthcare career
              </p>
            </motion.div>
          </div>
        </section>

        {/* Admission Steps */}
        <section className="section-padding">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-neutral-dark mb-4">
                Admission Process
              </h2>
              <p className="text-lg text-gray-600">
                Follow these simple steps to secure your admission
              </p>
            </motion.div>

            <div className="max-w-4xl mx-auto">
              <div className="space-y-6">
                {admissionSteps.map((step, index) => (
                  <motion.div
                    key={step.step}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start space-x-4 p-6 bg-white rounded-xl shadow-lg border-l-4 border-primary"
                  >
                    <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center flex-shrink-0 font-heading font-bold">
                      {step.step}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <step.icon className="w-6 h-6 text-primary" />
                        <h3 className="text-xl font-heading font-semibold text-neutral-dark">
                          {step.title}
                        </h3>
                      </div>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Important Dates */}
        <section className="section-padding bg-neutral">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto"
            >
              <h2 className="text-3xl font-heading font-bold text-neutral-dark mb-8 text-center">
                Important Dates
              </h2>
              <div className="card space-y-4">
                <div className="flex items-center justify-between p-4 bg-primary/5 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-6 h-6 text-primary" />
                    <div>
                      <p className="font-semibold text-neutral-dark">Application Start Date</p>
                      <p className="text-sm text-gray-600">After 12th, Result</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 bg-primary/5 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-6 h-6 text-primary" />
                    <div>
                      <p className="font-semibold text-neutral-dark">Last Date for Application</p>
                      <p className="text-sm text-gray-600">July 30, 2026</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 bg-primary/5 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-6 h-6 text-primary" />
                    <div>
                      <p className="font-semibold text-neutral-dark">Entrance Examination</p>
                      <p className="text-sm text-gray-600">May 30, 2026</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 bg-primary/5 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-6 h-6 text-primary" />
                    <div>
                      <p className="font-semibold text-neutral-dark">Academic Session Begins</p>
                      <p className="text-sm text-gray-600">August 01, 2026</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Download Section */}
        <section className="section-padding">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-8"
            >
              <h2 className="text-3xl font-heading font-bold text-neutral-dark mb-4">
                Download Documents
              </h2>
            </motion.div>
            <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="card text-center hover:shadow-xl transition-shadow"
              >
                <Download className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-heading font-semibold text-neutral-dark mb-2">
                  Prospectus 2025
                </h3>
                <p className="text-gray-600 mb-4 text-sm">
                  Complete information about programs, fees, and admission process
                </p>
                <a
                  href="/assets/images/prospectus.png"
                  download="Aditya_Educational_Foundation_Prospectus.png"
                  className="inline-flex items-center justify-center bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-dark transition-colors"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download Prospectus
                </a>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="card text-center hover:shadow-xl transition-shadow"
              >
                <FileText className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-heading font-semibold text-neutral-dark mb-2">
                  Application Form
                </h3>
                <p className="text-gray-600 mb-4 text-sm">
                  Download and fill the admission application form
                </p>
                <button className="btn-primary">
                  Download PDF
                </button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="section-padding bg-neutral">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-heading font-bold text-neutral-dark mb-4">
                Frequently Asked Questions
              </h2>
            </motion.div>
            <div className="max-w-3xl mx-auto space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="card"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full flex items-center justify-between text-left"
                  >
                    <h3 className="text-lg font-heading font-semibold text-neutral-dark pr-4">
                      {faq.question}
                    </h3>
                    {openFaq === index ? (
                      <ChevronUp className="w-5 h-5 text-primary flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-primary flex-shrink-0" />
                    )}
                  </button>
                  {openFaq === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4 pt-4 border-t"
                    >
                      <p className="text-gray-700">{faq.answer}</p>
                    </motion.div>
                  )}
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
                Ready to Apply?
              </h2>
              <p className="text-xl mb-8 text-gray-100">
                Start your application process today or contact us for more information
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="/admissions" className="btn-accent">
                  Apply Now
                </a>
                <a href="/contact" className="bg-white text-primary px-6 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors">
                  Contact Admission Office
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  )
}

export default Admissions