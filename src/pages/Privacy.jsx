import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { Shield } from 'lucide-react'

const Privacy = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy | Uddavrao Tulshiram Foundation College of Paramedical</title>
        <meta name="description" content="Privacy policy for Uddavrao Tulshiram Foundation College of Paramedical website." />
      </Helmet>

      <div className="pt-20">
        <section className="bg-gradient-to-r from-primary to-primary-dark text-white py-16">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-3xl mx-auto"
            >
              <Shield className="w-16 h-16 mx-auto mb-4" />
              <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
                Privacy Policy
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
              
              <h2 className="text-2xl font-heading font-bold text-neutral-dark mb-4">Introduction</h2>
              <p className="text-gray-700 mb-6">
                Uddavrao Tulshiram Foundation College of Paramedical ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.
              </p>

              <h2 className="text-2xl font-heading font-bold text-neutral-dark mb-4">Information We Collect</h2>
              <p className="text-gray-700 mb-4">We may collect information that you provide directly to us, including:</p>
              <ul className="list-disc pl-6 text-gray-700 mb-6 space-y-2">
                <li>Name and contact information</li>
                <li>Email address and phone number</li>
                <li>Educational background and qualifications</li>
                <li>Program interests and preferences</li>
                <li>Any other information you choose to provide</li>
              </ul>

              <h2 className="text-2xl font-heading font-bold text-neutral-dark mb-4">How We Use Your Information</h2>
              <p className="text-gray-700 mb-4">We use the information we collect to:</p>
              <ul className="list-disc pl-6 text-gray-700 mb-6 space-y-2">
                <li>Process and respond to your enquiries</li>
                <li>Send you information about our programs and services</li>
                <li>Improve our website and services</li>
                <li>Comply with legal obligations</li>
              </ul>

              <h2 className="text-2xl font-heading font-bold text-neutral-dark mb-4">Data Security</h2>
              <p className="text-gray-700 mb-6">
                We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
              </p>

              <h2 className="text-2xl font-heading font-bold text-neutral-dark mb-4">Contact Us</h2>
              <p className="text-gray-700">
                If you have questions about this Privacy Policy, please contact us at info@utfoundation.edu.in
              </p>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  )
}

export default Privacy

