import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown } from 'lucide-react'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [udanOpen, setUdanOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Main nav links
  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/programs', label: 'Programs' },
    { path: '/admissions', label: 'Admissions' },
    { path: '/departments', label: 'Departments' },
  ]

  // Campus dropdown links
  const campusLinks = [
    { path: '/facilities', label: 'Facilities' },
    { path: '/events', label: 'Events' },
    { path: '/gallery', label: 'Gallery' },
        { path: '/blog', label: 'Blogs' },

    { path: '/announcement', label: 'Announcement' },
  ]

  // Career links
  const careerLinks = [
    { path: '/careers', label: 'Careers' },
    { path: '/placements', label: 'Placements' },
    { path: '/contact', label: 'Contact' },
  ]

  // ✅ FIXED UDAN LINKS (IMPORTANT PART)
  const udanLinks = Array.from({ length: 8 }, (_, i) => ({
    path: `/udan/${i + 1}`,   // 👈 MUST BE THIS FORMAT
    label: `Udan ${i + 1}`,
  }))

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-lg' : 'bg-white/95 backdrop-blur-sm'
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src="/assets/logo/logo1.png"
              alt="College Logo"
              className="h-12 w-auto object-contain"
            />
          </Link>

          {/* ================= DESKTOP NAV ================= */}
          <div className="hidden lg:flex items-center space-x-1">

            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 rounded-lg text-sm font-medium ${
                  location.pathname === link.path
                    ? 'text-primary bg-primary/10'
                    : 'text-neutral-dark hover:text-primary hover:bg-neutral/10'
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* ===== UDAN DROPDOWN ===== */}
            <div className="relative group">
              <button className="flex items-center px-3 py-2 rounded-lg text-sm font-medium text-neutral-dark hover:text-primary hover:bg-neutral/10">
                Udan <ChevronDown className="ml-1 w-4 h-4" />
              </button>

              <div className="absolute left-0 mt-2 w-40 bg-white rounded-lg shadow-lg border
                              opacity-0 invisible group-hover:opacity-100 group-hover:visible
                              transition-all duration-200 z-50">
                {udanLinks.map(link => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="block px-4 py-2 text-sm hover:bg-neutral/10 hover:text-primary"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* ===== CAMPUS DROPDOWN ===== */}
            <div className="relative group">
              <button className="flex items-center px-3 py-2 rounded-lg text-sm font-medium text-neutral-dark hover:text-primary hover:bg-neutral/10">
                Campus <ChevronDown className="ml-1 w-4 h-4" />
              </button>

              <div className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border
                              opacity-0 invisible group-hover:opacity-100 group-hover:visible
                              transition-all duration-200 z-50">
                {campusLinks.map(link => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="block px-4 py-2 text-sm hover:bg-neutral/10 hover:text-primary"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {careerLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 rounded-lg text-sm font-medium ${
                  location.pathname === link.path
                    ? 'text-primary bg-primary/10'
                    : 'text-neutral-dark hover:text-primary hover:bg-neutral/10'
                }`}
              >
                {link.label}
              </Link>
            ))}

            <Link
              to="/admissions"
              className="ml-2 px-4 py-2 bg-accent text-white rounded-lg text-sm font-medium hover:bg-accent/90"
            >
              Apply Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden p-2">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* ================= MOBILE NAV ================= */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t"
          >
            <div className="container-custom py-4 space-y-2">

              {[...navLinks, ...campusLinks, ...careerLinks].map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-2 rounded-lg text-sm hover:bg-neutral/10"
                >
                  {link.label}
                </Link>
              ))}

              {/* Mobile UDAN */}
              <button
                onClick={() => setUdanOpen(!udanOpen)}
                className="w-full flex justify-between px-4 py-2 text-sm font-medium"
              >
                Udan <ChevronDown />
              </button>

              {udanOpen && udanLinks.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="block pl-8 py-1 text-sm hover:text-primary"
                >
                  {link.label}
                </Link>
              ))}

              <Link
                to="/admissions"
                onClick={() => setIsOpen(false)}
                className="block mt-4 px-4 py-2 bg-accent text-white rounded-lg text-center text-sm"
              >
                Apply Now
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

export default Navbar
