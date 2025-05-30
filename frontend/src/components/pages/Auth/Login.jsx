import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function Login() {

  const location = useLocation();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (location.state?.message) {
      // Set the message from state
      setMessage(location.state.message);
      // Clear the navigation state immediately
      navigate(location.pathname, { replace: true, state: {} });
      setTimeout(() => { setMessage('') }, 2000);
    }
  }, [location, navigate]);

  return (
    <div className="min-h-.8 flex flex- bg-[#f8fbfb] font-lexend">
      {/* Main Content */}
      <div className="flex flex-1 w-fit justify-center gap-1 pl-6 py-5">
        {/* Left: Banner */}
        <div className="flex flex-1 max-w-2xl flex-col justify-end shadow-lg">
          <div
            className="flex min-h-[800px] w-full flex-col justify- overflow-visible bg-[#f8fbfb] bg-cover bg-center bg-no-repeat rounded-xl"
            style={{
              backgroundImage:
                'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDRoGabU02vmwxSv52AETg4D6ZEBFtW2dHbGNm98lhJ-V_0HfstwNxOYBc5xsOV_TeRUPPGHl6FEcSq1NiHXfA_SgbrMMspTyr8whJPaVJbftK8Mwoe-3lEfXEReSbEnt7fxSCzgfH4Gl3-JXP8-E4pRo4sSt8Ilz5CXSDBLaJ1hgGc7MqEnESRPNFAkGWra5584XMqQITJh3fUGYnQfYAgeQvCYzoczRnJ_InFJjgODpa2nZCbCFh5rZ8kolu_ANI0ezVDaHJLzBA")',
            }}
          ></div>
        </div>
        {/* Right: Login Form */}
        <div className="flex w-xl flex-col justify-center rounded-xl bg-white shadow-lg">


          {/* Temporary Message */}

          {message && (
            <div className="mx-4 mt-4 p-3 bg-blue-50 border border-blue-200 text-blue-600 rounded-lg text-sm flex items-center">
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v4a1 1 0 102 0V7zm-1 7a1 1 0 100-2 1 1 0 000 2z" />
              </svg>
              {message}
            </div>
          )}


          {/* Welcome Message */}
          <h2 className="px-4 pt-5 pb-3 justify-center text-center text-[28px] leading-tight font-bold text-[#0e1b17]">
            Welcome back
          </h2>
          <form className="flex flex-col items-end w-full max-w-[480px] mx-auto">
            <div className="w-full flex flex-col gap-4">
              <label className="flex flex-col w-full">
                <input
                  type="email"
                  placeholder="Enter your email"
                  id="email"
                  className="form-input h-14 w-full rounded-xl border border-[#d0e6e0] bg-[#f8fbfb] p-[15px] text-base text-[#0e1b17] placeholder:text-[#4f9683] focus:border-[#d0e6e0] focus:ring-0 focus:outline-0"
                />
              </label>
              <label className="flex flex-col w-full">
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="form-input h-14 w-full rounded-xl border border-[#d0e6e0] bg-[#f8fbfb] p-[15px] text-base text-[#0e1b17] placeholder:text-[#4f9683] focus:border-[#d0e6e0] focus:ring-0 focus:outline-0"
                />
              </label>
            </div>
            <button
              type="submit"
              className="mt-6 h-10 w-[100px] flex items-center justify-center rounded-xl bg-[#1ee0ac] px-4 text-sm font-bold tracking-[0.015em] text-[#1f2221] hover:bg-[#19be94] transition"
            >
              <span className="truncate"> Sign In </span>
            </button>
            <div className="flex gap-4 mt-4">
              <p className="text-sm text-[#4f9683] underline cursor-pointer">
                <Link to="/register">
                Don't have an account? Sign Up
                </Link>
              </p>
              <p className="text-sm text-[#4f9683] underline cursor-pointer">
                Forgot Password?
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
