import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from "../../../common/Api/api"; // <-- Your custom Axios instance
import { useAuth } from '../../Auth/AuthContext'; // Adjust path as needed
export default function StudentRegister() {


  const { login } = useAuth(); // <-- This is your context function to update the auth state
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
    setGeneralError('');
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.username.trim()) newErrors.username = 'Username is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email address';
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const response = await api.post("/api/users/register/student/", {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        confirm_password: formData.confirmPassword,
      });

      if (response.status === 201 || response.status === 200) {
        const data = response.data;
        localStorage.setItem('access_token', data.access);
        localStorage.setItem('refresh_token', data.refresh);
        login(data.access); // <-- This updates the context!
        navigate('/register/student/step1'); // or your next step/page
      }


      
    } catch (error) {
      if (error.response && error.response.data) {
        const errorData = error.response.data;
        if (errorData.email) setErrors((prev) => ({ ...prev, email: errorData.email[0] }));
        if (errorData.username) setErrors((prev) => ({ ...prev, username: errorData.username[0] }));
        if (errorData.password) setErrors((prev) => ({ ...prev, password: errorData.password[0] }));
        if (errorData.non_field_errors) setGeneralError(errorData.non_field_errors[0]);
        if (errorData.confirm_password) setErrors((prev) => ({ ...prev, confirmPassword: errorData.confirm_password[0] }));
      } else {
        setGeneralError('An unexpected error occurred. Please try again.');
        console.error('Registration error:', error);
      }
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#fcf8f9]" style={{ fontFamily: 'Lexend, "Noto Sans", sans-serif' }}>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-[512px] max-w-[512px] py-5 px-8 bg-white rounded-2xl shadow-lg"
        noValidate
      >
        <h2 className="text-[#101816] tracking-light text-[28px] font-bold leading-tight text-center pb-3 pt-5">
          Student Registration
        </h2>

        {generalError && (
          <div className="text-red-600 text-center mb-4 font-semibold">{generalError}</div>
        )}

        {/* Username */}
        <div className="flex flex-wrap items-end gap-4 py-3">
          <label className="flex flex-col min-w-40 flex-1">
            <p className="text-[#101816] text-base font-medium leading-normal pb-2">Username</p>
            <input
              type="text"
              name="username"
              placeholder="Choose a username"
              className={`form-input w-full rounded-xl text-[#101816] bg-[#eaf1ef] h-14 p-4 text-base font-normal leading-normal ${errors.username ? 'border border-red-500' : ''}`}
              value={formData.username}
              onChange={handleChange}
              required
            />
            {errors.username && <p className="text-red-600 mt-1 text-sm">{errors.username}</p>}
          </label>
        </div>

        {/* Email */}
        <div className="flex flex-wrap items-end gap-4 py-3">
          <label className="flex flex-col min-w-40 flex-1">
            <p className="text-[#101816] text-base font-medium leading-normal pb-2">Email</p>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className={`form-input w-full rounded-xl text-[#101816] bg-[#eaf1ef] h-14 p-4 text-base font-normal leading-normal ${errors.email ? 'border border-red-500' : ''}`}
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && <p className="text-red-600 mt-1 text-sm">{errors.email}</p>}
          </label>
        </div>

        {/* Password */}
        <div className="flex flex-wrap items-end gap-4 py-3">
          <label className="flex flex-col min-w-40 flex-1 relative">
            <p className="text-[#101816] text-base font-medium leading-normal pb-2">Password</p>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Create a password"
                className={`form-input w-full rounded-xl text-[#101816] bg-[#eaf1ef] h-14 p-4 text-base font-normal leading-normal pr-12 ${errors.password ? 'border border-red-500' : ''}`}
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2"
                tabIndex={-1}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <img width="24" height="24" src="https://img.icons8.com/material-outlined/24/hide.png" alt="hide" />
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
                    <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
                  </svg>
                )}
              </button>
            </div>
            {errors.password && <p className="text-red-600 mt-1 text-sm">{errors.password}</p>}
          </label>
        </div>

        {/* Confirm Password */}
        <div className="flex flex-wrap items-end gap-4 py-3">
          <label className="flex flex-col min-w-40 flex-1 relative">
            <p className="text-[#101816] text-base font-medium leading-normal pb-2">Confirm Password</p>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                placeholder="Confirm your password"
                className={`form-input w-full rounded-xl text-[#101816] bg-[#eaf1ef] h-14 p-4 text-base font-normal leading-normal pr-12 ${errors.confirmPassword ? 'border border-red-500' : ''}`}
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2"
                tabIndex={-1}
                aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
              >
                {showConfirmPassword ? (
                  <img width="24" height="24" src="https://img.icons8.com/material-outlined/24/hide.png" alt="hide" />
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
                    <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
                  </svg>
                )}
              </button>
            </div>
            {errors.confirmPassword && <p className="text-red-600 mt-1 text-sm">{errors.confirmPassword}</p>}
          </label>
        </div>

        {/* Submit Button */}
        <div className="flex py-3">
          <button
            type="submit"
            className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 flex-1 bg-[#a3e0d0] text-[#101816] text-sm font-bold leading-normal tracking-[0.015em]"
          >
            Register as Student
          </button>
        </div>
        {/* Already have an account? */}
        <div className="flex justify-center text-[#101816] text-sm font-normal leading-normal tracking-[0.015em]">
            <p className="text-center">
                Already have an account?{' '}
                <a href="/login" className="text-[#1d4ed8] hover:underline">
                Login
                </a>
            </p>
        </div>
      </form>
    </div>
  );
}
