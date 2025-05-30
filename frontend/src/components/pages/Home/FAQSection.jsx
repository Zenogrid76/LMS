import React, { useState } from "react";

const faqs = [
  {
    question: "How do I find a mentor?",
    answer: "Browse our mentor directory or use the search feature to find a mentor by subject, expertise, or availability.",
  },
  {
    question: "What courses are available?",
    answer: "We offer a wide range of courses across multiple disciplines. Visit the Courses page to see the full catalog.",
  },
  {
    question: "How does the platform support collaboration?",
    answer: "Our platform offers discussion forums, group projects, and messaging tools to facilitate collaboration between students and mentors.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="w-full max-w-[700px] mx-auto py-10">
      <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
      <div className="flex flex-col gap-3">
        {faqs.map((faq, idx) => (
          <div key={idx} className="bg-white rounded-lg shadow-sm">
            <button
              className="w-full flex justify-between items-center p-4 font-medium text-left focus:outline-none"
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
            >
              <span>{faq.question}</span>
              <span>{openIndex === idx ? "▲" : "▼"}</span>
            </button>
            {openIndex === idx && (
              <div className="px-4 pb-4 text-gray-700">{faq.answer}</div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
