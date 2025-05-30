import React from "react";
import herobanner from './Hero banner image.jpg';


export default function HeroBanner() 
{
  return (
  <section className="w-full bg-[#F8F9FB] py-16">
    <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row items-center gap-12 px-6">
      {/* Left: Bigger Illustration */}
      <div className="flex-shrink-0">
        <img
          src={herobanner}
          alt="Learning Illustration"
          className="w-[420px] h-[350px] object-cover rounded-xl shadow-md"
        />
      </div>
      {/* Right: Wider Content */}
      <div className="flex-1 flex flex-col items-start max-w-3xl">
        <h1 className="text-5xl font-extrabold text-[#151515] leading-tight mb-4 font-lexend ">
          Transform Your<br />Learning Experience
        </h1>
        <p className="text-lg text-[#232323] mb-8">
          Our platform offers a comprehensive suite of tools and resources designed to enhance the learning journey for both mentors and students. Connect with experts, access a wide range of courses, and track your progress effectively.
        </p>
        <div className="flex gap-4">
          <button className="px-6 py-3 bg-[#19E3AE] text-[#ffffff] font-bold rounded-lg shadow hover:bg-[#0fc89b] transition">
            Find Course
          </button>
          <button className="px-6 py-3 bg-[#F3F6F6] text-[#151515] font-bold rounded-lg shadow hover:bg-[#e0e5e5] transition">
            Find Mentor
          </button>
        </div>
      </div>
    </div>
  </section>
  )
}
