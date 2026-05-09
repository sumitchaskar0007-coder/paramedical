import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { FileText } from 'lucide-react'

const Terms = () => {
  return (
    <>
      <Helmet>
        <title>Terms & Conditions | Uddavrao Tulshiram Foundation College of Paramedical</title>
        <meta name="description" content="Terms and conditions for Uddavrao Tulshiram Foundation College of Paramedical website." />
      </Helmet>

      <div className="pt-20">
        <section className="bg-gradient-to-r from-primary to-primary-dark text-white py-16">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-3xl mx-auto"
            >
              <FileText className="w-16 h-16 mx-auto mb-4" />
              <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
                Terms & Conditions
              </h1>
            </motion.div>
          </div>
        </section>

        <section className="section-padding">
          <div className="container-custom max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="prose prose-lg max-w-none"
            >
              <p className="text-gray-600 mb-6">Last updated: {new Date().toLocaleDateString()}</p>
              
              <h2 className="text-2xl font-heading font-bold text-neutral-dark mb-4">Acceptance of Terms</h2>
              <p className="text-gray-700 mb-6">
                By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.
              </p>

              <h2 className="text-2xl font-heading font-bold text-neutral-dark mb-4">Use License</h2>
              <p className="text-gray-700 mb-4">Permission is granted to temporarily download one copy of the materials on our website for personal, non-commercial transitory viewing only.</p>

              <h2 className="text-2xl font-heading font-bold text-neutral-dark mb-4">Disclaimer</h2>
              <p className="text-gray-700 mb-6">
                The materials on our website are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim all other warranties.
              </p>

              <h2 className="text-2xl font-heading font-bold text-neutral-dark mb-4">Limitations</h2>
              <p className="text-gray-700 mb-6">
                In no event shall Uddavrao Tulshiram Foundation College of Paramedical or its suppliers be liable for any damages arising out of the use or inability to use the materials on our website.
              </p>

              <h2 className="text-2xl font-heading font-bold text-neutral-dark mb-4">Contact Information</h2>
              <p className="text-gray-700">
                For questions regarding these Terms & Conditions, please contact us at info@utfoundation.edu.in
              </p>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  )
}

export default Terms

