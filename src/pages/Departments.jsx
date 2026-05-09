import React from "react";
import { motion } from "framer-motion";

const Departments = () => {
  return (
    /* 🔥 TOP MARGIN FOR FIXED NAVBAR */
    <div className="min-h-screen bg-gray-50 mt-24">

      {/* ================= PAGE HEADER (UPDATED BG COLOR) ================= */}
      <section
        class="bg-gradient-to-r from-primary to-primary-dark text-white py-16"
      >
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-heading font-bold mb-4">
            Our Academic Departments
          </h1>
          <p className="max-w-3xl mx-auto text-lg opacity-95">
            Explore our professionally designed paramedical diploma programs
            focused on hands-on training, clinical exposure, and career-oriented
            education.
          </p>
        </div>
      </section>

      {/* ================= DEPARTMENTS SECTION ================= */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">

          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold text-gray-900 mb-3">
              Diploma Programs Offered
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our departments are equipped with modern laboratories, expert
              faculty, and hospital-based training to prepare students for
              real-world healthcare environments.
            </p>
          </div>

          {/* ================= CARDS GRID ================= */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

            {/* DMLT Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
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
                  The Diploma in Medical Laboratory Technician (DMLT) course
                  focuses on diagnostic laboratory techniques including
                  pathology, microbiology, hematology, and clinical
                  biochemistry.
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3"></span>
                    Blood testing & laboratory diagnostics
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3"></span>
                    Pathology & microbiology basics
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3"></span>
                    Hospital & diagnostic lab training
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3"></span>
                    Career opportunities in medical laboratories
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* DOTT Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
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
                  The Diploma in Operation Theatre Technician (DOTT) program
                  prepares students to assist surgeons and healthcare
                  professionals during surgical procedures in hospitals.
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3"></span>
                    Operation theatre assistance
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3"></span>
                    Surgical instruments handling
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3"></span>
                    Pre & post-operative care
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3"></span>
                    OT technician career opportunities
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* X-Ray Technician Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
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
                  This course trains students in radiology and imaging techniques
                  including X-Ray positioning, radiation safety, and diagnostic
                  imaging procedures.
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3"></span>
                    X-Ray & radiology techniques
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3"></span>
                    Patient positioning & safety
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3"></span>
                    Hospital imaging department training
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3"></span>
                    Career in diagnostic imaging centers
                  </li>
                </ul>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

    </div>
  );
};

export default Departments;
