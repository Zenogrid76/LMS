import React from "react";

const testimonials = [
  {
    name: "Sophia Clark",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    time: "2 months ago",
    rating: 5,
    text: "This platform has transformed my learning experience! The mentors are incredibly knowledgeable and supportive.",
    likes: 12,
    dislikes: 2,
  },
  {
    name: "Liam Foster",
    avatar: "https://randomuser.me/api/portraits/men/43.jpg",
    time: "3 months ago",
    rating: 4,
    text: "I've learned so much from the courses offered here. The content is well-structured and engaging.",
    likes: 8,
    dislikes: 1,
  },
  {
    name: "Ava Bennett",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    time: "4 months ago",
    rating: 5,
    text: "The community is fantastic, and the resources are top-notch. Highly recommend!",
    likes: 15,
    dislikes: 3,
  },
];

function StarRating({ count }) {
  return (
    <div className="flex mb-1">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`w-5 h-5 ${i < count ? "text-[#1FDEAB]" : "text-gray-300"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <polygon points="10,1 12,7 18,7 13,11 15,17 10,13 5,17 7,11 2,7 8,7" />
        </svg>
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  return (
    <section className="w-full max-w-[700px] mx-auto py-10 pr-20">
      <h2 className="text-2xl font-bold mb-6">See what others are saying</h2>
      <div className="flex flex-col gap-7">
        {testimonials.map((t, idx) => (
          <div key={idx} className="flex items-start gap-4">
            <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full object-cover" />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-semibold">{t.name}</span>
                <span className="text-xs text-gray-400">{t.time}</span>
              </div>
              <StarRating count={t.rating} />
              <div className="mb-2 text-gray-800">{t.text}</div>
              <div className="flex gap-4 text-gray-500 text-sm">
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 9l-5 5-5-5" />
                  </svg>
                  {t.likes}
                </span>
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 15l5-5 5 5" />
                  </svg>
                  {t.dislikes}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
