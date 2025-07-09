import React from "react";
import logo from '../../../../../Assets/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from "../../pages/Auth/AuthContext"; // Adjust path as needed

export default function Header() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="w-full bg-[#F8F9FB] border-b border-[#E6E8EB]">
      <div className="max-w-[1280px] h-[94px] mx-auto flex items-center justify-between px-8">
        {/* Left: Logo and Title */}
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center">
            <img src={logo} alt="Logo" className="w-10 h-10 mr-2" />
            <span className="font-lexend font-bold text-[18px] text-[#0D1C17]">LMS</span>
          </Link>
        </div>
        {/* Center: Navigation */}
        <nav className="flex items-center gap-8 ml-8">
          <Link to="/" className="font-lexend font-medium text-[14px] text-[#0D1C17] hover:text-[#1FDEAB] transition-colors">Home</Link>
          <Link to="/" className="font-lexend font-medium text-[14px] text-[#0D1C17] hover:text-[#1FDEAB] transition-colors">Mentors</Link>
          <Link to="/courses" className="font-lexend font-medium text-[14px] text-[#0D1C17] hover:text-[#1FDEAB] transition-colors">Courses</Link>
          <Link to={isAuthenticated ? "/my-courses" : "/login"} state={{ message: 'Please login to see your courses' }} className="font-lexend font-medium text-[14px] text-[#0D1C17] hover:text-[#1FDEAB] transition-colors">
            My Courses
          </Link>
        </nav>
        {/* Right: Auth Buttons */}
        <div className="flex items-center gap-2 ml-8">
          {isAuthenticated ? (
            <button
              className="px-6 h-10 bg-[#E8F2F0] rounded-lg font-lexend font-bold text-[14px] text-[#0D1C17] shadow-sm hover:bg-[#d3ebe5] transition"
              onClick={logout}
            >
              Log Out
            </button>
          ) : (
            <>
              <button
                className="px-6 h-10 bg-[#1FDEAB] rounded-lg font-lexend font-bold text-[14px] text-[#ffffff] shadow-sm hover:bg-[#19be94] transition"
                onClick={() => navigate('/register')}
              >
                Register
              </button>
              <button
                className="px-6 h-10 bg-[#E8F2F0] rounded-lg font-lexend font-bold text-[14px] text-[#0D1C17] shadow-sm hover:bg-[#d3ebe5] transition"
                onClick={() => navigate('/login')}
              >
                Sign In
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
