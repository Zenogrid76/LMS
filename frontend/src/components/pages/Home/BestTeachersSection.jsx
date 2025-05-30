// BestTeachersSection.jsx
import React from "react";

const teachers = [
  {
    name: "Dr. Eleanor Harper",
    desc: "Dr. Eleanor Harper is a renowned expert in mathematics and physics with over 15 years of teaching experience.",
    expertise: "Mathematics, Physics",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    name: "Prof. Samuel Bennett",
    desc: "Prof. Samuel Bennett is a seasoned computer science professor specializing in software engineering and algorithm design.",
    expertise: "Computer Science, Software Engineering",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Dr. Olivia Carter",
    desc: "Dr. Olivia Carter is a leading researcher in biology and chemistry, known for her innovative teaching methods.",
    expertise: "Biology, Chemistry",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Prof. Ethan Walker",
    desc: "Prof. Ethan Walker is an expert in statistics and data science, with a focus on practical applications of data analysis.",
    expertise: "Statistics, Data Science",
    avatar: "https://randomuser.me/api/portraits/men/85.jpg",
  },
];

export default function BestTeachersSection() {
  return (
    <section className="w-full max-w-[1280px] mx-auto py-10">
      <h2 className="text-2xl font-bold mb-6">Choose From Our Best</h2>
      <div className="flex flex-col gap-6">
        {teachers.map((teacher) => (
          <div key={teacher.name} className="flex items-center bg-white rounded-xl p-4 shadow-sm hover:scale-105 + transition">
            <img src={teacher.avatar} alt={teacher.name} className="w-14 h-14 rounded-full object-cover mr-4" />
            <div className="flex-1">
              <div className="font-semibold">{teacher.name}</div>
              <div className="text-sm text-gray-600">{teacher.desc}</div>
              <div className="text-sm text-teal-600">Expertise: {teacher.expertise}</div>
            </div>
            <button className="ml-4 px-4 py-2 bg-[#F3F6F6] text-[#151515] font-semibold rounded hover:bg-[#e0e5e5] transition">
              View Profile
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
