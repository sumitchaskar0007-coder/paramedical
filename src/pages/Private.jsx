import React from "react";
import { useNavigate } from "react-router-dom";

export default function Private() {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("privateAuth");
    navigate("/private-login");
  };

  const pdfs = [
    {
      name: "7/12 document",
      file: "/assets/7/12.pdf"
    },
    {
      name: "Kharedi Khat",
      file: "/assets/7/kharedi_khat.pdf"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-10 mt-16">

      {/* Top Bar */}
      <div className="flex justify-between items-center mb-8">

        <h1 className="text-3xl font-bold">
          Private Documents
        </h1>

        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-5 py-2 rounded hover:bg-red-700"
        >
          Logout
        </button>

      </div>

      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">

        {pdfs.map((pdf, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-lg text-center"
          >

            <h2 className="text-xl font-semibold mb-4">
              {pdf.name}
            </h2>

            <a
              href={pdf.file}
              download
              className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
            >
              Download PDF
            </a>

          </div>
        ))}

      </div>

    </div>
  );
}