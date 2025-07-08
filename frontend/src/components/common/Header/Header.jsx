import React from "react";
import logo from '../../../../../Assets/logo.png';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import Home from "../../pages/Home/Home"; // Adjust the path as needed
import { Routes, Route, BrowserRouter as Router } from "react-router-dom"; // Import necessary components for routing
import { Link } from 'react-router-dom'; // Import Link for navigation
import { useState } from "react";
import { useLocation } from 'react-router-dom';


export default function Header() {
  return (
    <header className="w-full bg-[#F8F9FB] border-b border-[#E6E8EB]">
      <div className="max-w-[1280px] h-[94px] mx-auto flex items-center justify-between px-8">
        {/* Left: Logo and Title */}
        <div className="flex items-center gap-3">
          {/* Logo */}
          <Link to="/" className="flex items-center">
          <img src={logo} alt="Logo" className="w-10 h-10 mr-2" />
          <span className="font-lexend font-bold text-[18px] text-[#0D1C17]">
            LMS
          </span>
          </Link>
        </div>
        {/* Center: Navigation */}
        <nav className="flex items-center gap-8 ml-8">
          <Link
            to="/" // Use Link for navigation to Home page
            className="font-lexend font-medium text-[14px] text-[#0D1C17] hover:text-[#1FDEAB] transition-colors"
          >
            Home
          </Link>
          <Link
            to="/" // Use Link for navigation to Login page
            className="font-lexend font-medium text-[14px] text-[#0D1C17] hover:text-[#1FDEAB] transition-colors"
          >
            Mentors
          </Link>
          <Link
            to='/courses' // Use Link for navigation to Courses page
            className="font-lexend font-medium text-[14px] text-[#0D1C17] hover:text-[#1FDEAB] transition-colors"
          >
            Courses
          </Link>
          <Link
            to="/login"
            state={{ message: 'Please login to see your courses' }}
            className="font-lexend font-medium text-[14px] text-[#0D1C17] hover:text-[#1FDEAB] transition-colors"
          >
            My Courses
          </Link>
        </nav>
        {/* Right: Register & Sign In */}
        <div className="flex items-center gap-2 ml-8">
          <button className="px-6 h-10 bg-[#1FDEAB] rounded-lg font-lexend font-bold text-[14px] text-[#ffffff] shadow-sm hover:bg-[#19be94] transition"
           
            onClick={() => window.location.href = '/register'}> {/* Redirect to Register page */}
            Register
          </button>
          <button className="px-6 h-10 bg-[#E8F2F0] rounded-lg font-lexend font-bold text-[14px] text-[#0D1C17] shadow-sm hover:bg-[#d3ebe5] transition"
            onClick={() => window.location.href = '/login'}> {/* Redirect to Login page */}
            Sign In
          </button>
        </div>
      </div>
    </header>
  );
}

