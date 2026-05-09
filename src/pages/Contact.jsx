import { Helmet } from 'react-helmet-async'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      const response = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (data.success) {
        setSubmitStatus({ type: 'success', message: 'Thank you! We will contact you soon.' })
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
      } else {
        setSubmitStatus({ type: 'error', message: 'Something went wrong. Please try again.' })
      }
    } catch (error) {
      setSubmitStatus({ type: 'error', message: 'Network error. Please try again later.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Helmet>
        <title>Contact Us | Uddavrao Tulshiram Foundation College of Paramedical</title>
        <meta
          name="description"
          content="Contact Uddavrao Tulshiram Foundation College of Paramedical, Narhe Pune. Enquiry form, phone number, email, and location map."
        />
      </Helmet>

      <div className="pt-20">
        {/* HERO SECTION */}
        <section className="bg-gradient-to-r from-primary to-primary-dark text-white py-16">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-3xl mx-auto"
            >
              <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
                Contact Us
              </h1>
              <p className="text-xl text-gray-100">
                We're here to help. Get in touch with us
              </p>
            </motion.div>
          </div>
        </section>

        {/* CONTACT INFO + FORM */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-8">

              {/* CONTACT INFO */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-3xl font-heading font-bold text-neutral-dark mb-6">
                    Get In Touch
                  </h2>
                  <p className="text-gray-600 mb-8">
                    Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-neutral-dark mb-1">Address</h3>
                      <p className="text-gray-600">
                        Narhe, Pune<br />
                        Maharashtra, India
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Phone className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-neutral-dark mb-1">Phone</h3>
                      <a href="tel:+918459727432" className="text-gray-600 hover:text-primary">
                        +91 84597 27432
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Mail className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-neutral-dark mb-1">Email</h3>
                      <a
                        href="mailto:dr.sjparamedicalcollege@gmail.com"
                        className="text-gray-600 hover:text-primary"
                      >
                        dr.sjparamedicalcollege@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Clock className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-neutral-dark mb-1">Office Hours</h3>
                      <p className="text-gray-600">
                        Monday - Friday: 9:00 AM - 5:00 PM<br />
                        Saturday: 9:00 AM - 1:00 PM
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* CONTACT FORM */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="card"
              >
                <h2 className="text-2xl font-heading font-bold text-neutral-dark mb-6">
                  Send Us a Message
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {['name', 'email', 'phone', 'subject'].map((field) => (
                    <div key={field}>
                      <label className="block text-sm font-medium text-neutral-dark mb-1">
                        {field.charAt(0).toUpperCase() + field.slice(1)} *
                      </label>
                      <input
                        type={field === 'email' ? 'email' : 'text'}
                        name={field}
                        required
                        value={formData[field]}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  ))}

                  <div>
                    <label className="block text-sm font-medium text-neutral-dark mb-1">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      rows="5"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  {submitStatus && (
                    <div
                      className={`p-3 rounded-lg ${
                        submitStatus.type === 'success'
                          ? 'bg-green-50 text-green-800'
                          : 'bg-red-50 text-red-800'
                      }`}
                    >
                      {submitStatus.message}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn-accent flex items-center justify-center gap-2"
                  >
                    <Send className="w-5 h-5" />
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              </motion.div>
            </div>

            {/* MAP SECTION */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-12"
            >
              <div className="card p-0 overflow-hidden">
                <h3 className="text-2xl font-heading font-bold text-neutral-dark p-6 pb-0">
                  Our Location
                </h3>
                <div className="w-full h-96">
                  <iframe
                    src="https://www.google.com/maps?q=Narhe,Pune&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Narhe Pune Location"
                  />
                </div>
              </div>
            </motion.div>

          </div>
        </section>
      </div>
    </>
  )
}

export default Contact
