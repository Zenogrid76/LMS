import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import api from "../../common/Api/api"; // <-- Your custom Axios instance
import { useAuth } from "../../pages/Auth/AuthContext"; // <-- Your AuthContext

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

export default function Login() {
  const location = useLocation();
  const navigate = useNavigate();
  const { login } = useAuth(); // <-- Get login from context
  const [message, setMessage] = useState("");
  const [form, setForm] = useState({ identifier: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (location.state?.message) {
      setMessage(location.state.message);
      navigate(location.pathname, { replace: true, state: {} });
      setTimeout(() => {
        setMessage("");
      }, 2000);
    }
  }, [location, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setLoginError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setLoginError("");
    try {
      // Login using email (or username if your backend supports it)
      const loginRes = await api.post(`/api/users/login/`, {
        email: form.identifier,
        password: form.password,
      });

      const data = loginRes.data;

      // Store JWT tokens and update context
      localStorage.setItem("access_token", data.access);
      localStorage.setItem("refresh_token", data.refresh);
      login(data.access); // <-- This will update context and header

      // Fetch mentor profile (returns a single object)
      const profileRes = await api.get(`/api/mentors/profiles/`, {
        headers: { Authorization: `Bearer ${data.access}` },
      });

      const mentorProfiles = profileRes.data;
      const mentor = mentorProfiles[0];

      if (mentor) {
        if (!mentor.is_onboarding_complete) {
          switch (mentor.onboarding_step) {
            case 1:
              navigate("/mentor/application/step1");
              break;
            case 2:
              navigate("/mentor/application/step2");
              break;
            case 3:
              navigate("/mentor/application/step3");
              break;
            default:
              navigate("/mentor/dashboard");
          }
        } else {
          navigate("/mentor/dashboard");
        }
      } else {
        navigate("/student/dashboard");
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.detail) {
        setLoginError(err.response.data.detail);
      } else {
        setLoginError("An unexpected error occurred. Please try again.");
      }
    }
    setLoading(false);
  };

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
          <h2 className="px-4 pt-5 pb-3 justify-center text-center text-[28px] leading-tight font-bold text-[#0e1b17]">
            Welcome back
          </h2>
          <form
            className="flex flex-col items-end w-full max-w-[480px] mx-auto"
            onSubmit={handleSubmit}
          >
            <div className="w-full flex flex-col gap-4">
              <label className="flex flex-col w-full">
                <input
                  type="text"
                  name="identifier"
                  placeholder="Enter your email or username"
                  id="identifier"
                  className="form-input h-14 w-full rounded-xl border border-[#d0e6e0] bg-[#f8fbfb] p-[15px] text-base text-[#0e1b17] placeholder:text-[#4f9683] focus:border-[#d0e6e0] focus:ring-0 focus:outline-0"
                  value={form.identifier}
                  onChange={handleChange}
                  required
                />
              </label>
              <label className="flex flex-col w-full relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  className="form-input h-14 w-full rounded-xl border border-[#d0e6e0] bg-[#f8fbfb] p-[15px] text-base text-[#0e1b17] placeholder:text-[#4f9683] focus:border-[#d0e6e0] focus:ring-0 focus:outline-0 pr-12"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                  tabIndex={-1}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
                      <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
                    </svg>
                  ) : (
                    <img
                      width="24"
                      height="24"
                      src="https://img.icons8.com/material-outlined/24/hide.png"
                      alt="hide"
                    />
                  )}
                </button>
              </label>
            </div>
            {loginError && (
              <div className="w-full text-sm text-red-600 mt-2 text-center">
                {loginError}
              </div>
            )}
            <button
              type="submit"
              disabled={loading}
              className="mt-6 h-10 w-[100px] flex items-center justify-center rounded-xl bg-[#1ee0ac] px-4 text-sm font-bold tracking-[0.015em] text-[#1f2221] hover:bg-[#19be94] transition"
            >
              <span className="truncate">
                {loading ? "Signing In..." : "Sign In"}
              </span>
            </button>
            <div className="flex gap-4 mt-4">
              <p className="text-sm text-[#4f9683] underline cursor-pointer">
                <Link to="/register">Don't have an account? Sign Up</Link>
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
