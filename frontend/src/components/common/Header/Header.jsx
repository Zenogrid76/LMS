import React from "react";
import logo from '../../../../../Assets/logo.png';

export default function Header() {
  return (
    <header className="w-full bg-[#F8F9FB] border-b border-[#E6E8EB]">
      <div className="max-w-[1280px] h-[94px] mx-auto flex items-center justify-between px-8">
        {/* Left: Logo and Title */}
        <div className="flex items-center gap-3">
            {/* Logo */}
          <img src ={logo} alt="Logo" className="w-10 h-10 mr-2" />
          <span className="font-lexend font-bold text-[18px] text-[#0D1C17]">
            LMS
          </span>
        </div>
        {/* Center: Navigation */}
        <nav className="flex items-center gap-8 ml-8">
          <a
            href="#"
            className="font-lexend font-medium text-[14px] text-[#0D1C17] hover:text-[#1FDEAB] transition-colors"
          >
            Home
          </a>
          <a
            href="#"
            className="font-lexend font-medium text-[14px] text-[#0D1C17] hover:text-[#1FDEAB] transition-colors"
          >
            Mentors
          </a>
          <a
            href="#"
            className="font-lexend font-medium text-[14px] text-[#0D1C17] hover:text-[#1FDEAB] transition-colors"
          >
            Courses
          </a>
          <a
            href="#"
            className="font-lexend font-medium text-[14px] text-[#0D1C17] hover:text-[#1FDEAB] transition-colors"
          >
            My Courses
          </a>
        </nav>
        {/* Right: Register & Sign In */}
        <div className="flex items-center gap-2 ml-8">
          <button className="px-6 h-10 bg-[#1FDEAB] rounded-lg font-lexend font-bold text-[14px] text-[#ffffff] shadow-sm hover:bg-[#19be94] transition">
            Register
          </button>
          <button className="px-6 h-10 bg-[#E8F2F0] rounded-lg font-lexend font-bold text-[14px] text-[#0D1C17] shadow-sm hover:bg-[#d3ebe5] transition">
            Sign In
          </button>
        </div>
      </div>
    </header>
  );
}

