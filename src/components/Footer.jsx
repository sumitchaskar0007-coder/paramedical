import { Link } from "react-router-dom"
import {
  GraduationCap,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Linkedin,
} from "lucide-react"

import logo from "/assets/logo/logo1.png"

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const quickLinks = [
    { path: "/about", label: "About Us" },
    { path: "/programs", label: "Programs" },
    { path: "/admissions", label: "Admissions" },
    { path: "/faculty", label: "Faculty" },
    { path: "/facilities", label: "Facilities" },
    { path: "/placements", label: "Placements" },
  ]

  return (
    <footer className="bg-neutral-dark text-white">
      <div className="container-custom section-padding">

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4">

          {/* BRAND WITH LOGO */}
          <div>
            <div className="mb-4 inline-block bg-white p-3 rounded-lg">
              <img
                src={logo}
                alt="Jadhavar Paramedical College Logo"
                className="h-14 w-auto object-contain"
              />
            </div>

            <p className="text-gray-300 text-sm mb-5">
              Empowering future healthcare professionals with quality education,
              hands-on clinical training, and ethical values.
            </p>

            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/people/Late-Uddhavrao-Tulshiram-Jadhavar-Foundations-College-of-Paramedical-Pune/61578349949545/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary-light"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://www.instagram.com/jadhavar_paramedical_college_/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary-light"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://www.linkedin.com/company/jadhavar-group-of-institutes/?originalSubdomain=in"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary-light"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h4 className="font-heading font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-300 hover:text-primary-light text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* PROGRAMS */}
          <div>
  <h4 className="font-heading font-semibold mb-4">Programs</h4>

  <ul className="space-y-2 text-sm text-gray-300">
    <li>
      <Link
        to="/departments#dmlt"
        className="hover:text-white transition-colors"
      >
        DMLT
      </Link>
    </li>

    <li>
      <Link
        to="/departments#dott"
        className="hover:text-white transition-colors"
      >
        DOTT
      </Link>
    </li>

    <li>
      <Link
        to="/departments#xray"
        className="hover:text-white transition-colors"
      >
        Diploma in X-Ray Technology
      </Link>
    </li>
  </ul>
</div>

          {/* CONTACT */}
          <div>
            <h4 className="font-heading font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex gap-3">
                <MapPin className="w-5 h-5 text-primary-light" />
                <span>Pune, Maharashtra, India</span>
              </li>
              <li className="flex gap-3">
                <Phone className="w-5 h-5 text-primary-light" />
                <span>+91 84597 27432</span>
              </li>
              <li className="flex gap-3">
                <Mail className="w-5 h-5 text-primary-light" />
                <span>dr.sjparamedicalcollege@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-400">
          © {currentYear} Trijja Media & Works. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

export default Footer
