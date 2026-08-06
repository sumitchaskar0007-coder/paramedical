import React from "react";
import { useParams } from "react-router-dom";
import { Download } from "lucide-react";

const udanBooks = {
  1: {
    title: "Udan 1",
    cover: "/assets/books/udan.png",
    pdf: "/assets/books/Udan 1.pdf",
    desc: "Introductory academic book for first-year paramedical students. Covers basic medical terminology and ethics."
  },
  2: {
    title: "Udan 2",
    cover: "/assets/books/udan.png",
    pdf: "/assets/books/Udan 2.pdf",
    desc: "Focuses on human anatomy and physiology fundamentals essential for healthcare education."
  },
  3: {
    title: "Udan 3",
    cover: "/assets/books/udan.png",
    pdf: "/assets/books/Udan 3.pdf",
    desc: "Covers pathology basics, disease processes, and diagnostic concepts."
  },
  4: {
    title: "Udan 4",
    cover: "/assets/books/udan.png",
    pdf: "/assets/books/Udan 4.pdf",
    desc: "Introduces clinical practices, patient care techniques, and hospital safety."
  },
  5: {
    title: "Udan 5",
    cover: "/assets/books/udan.png",
    pdf: "/assets/books/Udan 5.pdf",
    desc: "Explains laboratory procedures and diagnostic equipment handling."
  },
  6: {
    title: "Udan 6",
    cover: "/assets/books/udan.png",
    pdf: "/assets/books/Udan 6.pdf",
    desc: "Radiology fundamentals, X-ray principles, and imaging safety."
  },
  7: {
    title: "Udan 7",
    cover: "/assets/books/udan.png",
    pdf: "/assets/books/Udan 7.pdf",
    desc: "Emergency care, first aid, trauma handling, and patient management."
  },
  8: {
    title: "Udan 8",
    cover: "/assets/books/udan.png",
    pdf: "/assets/books/Udan 8.pdf",
    desc: "Professional ethics, hospital administration, and career readiness."
  },
  9: {
    title: "Udan 9",
    cover: "/assets/books/udan.png",
    pdf: "/assets/books/Udan 9.pdf",
    desc: "The ninth edition in the Udan academic book series for paramedical students."
  }
};

export default function Udan() {
  const { id } = useParams();
  const book = udanBooks[id];

  if (!book) {
    return (
      <div className="pt-32 text-center">
        <h2 className="text-2xl font-bold">Udan Book Not Found</h2>
      </div>
    );
  }

  return (
    <section className="min-h-screen pt-24 sm:pt-28 pb-10 sm:pb-16 px-4 bg-gradient-to-b from-blue-50/60 to-gray-50">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-5 sm:p-8 grid md:grid-cols-2 gap-6 sm:gap-8 items-center border border-blue-100">

        {/* LEFT: COVER */}
        <div className="flex justify-center">
          <img
            src={book.cover}
            alt={book.title}
            className="w-52 sm:w-64 md:w-72 rounded-xl shadow-md"
          />
        </div>

        {/* RIGHT: INFO */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-blue-700 mb-3 sm:mb-4">
            {book.title}
          </h1>

          <p className="text-sm sm:text-base text-gray-600 mb-5 sm:mb-6 leading-relaxed">
            {book.desc}
          </p>

          <a
            href={book.pdf}
            download
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            <Download className="w-5 h-5" />
            Download PDF
          </a>
        </div>
      </div>
    </section>
  );
}
