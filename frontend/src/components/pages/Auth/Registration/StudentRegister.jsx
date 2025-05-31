import React, { useRef, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function StudentRegister() {
  const [dragActive, setDragActive] = useState(false);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const inputRef = useRef();
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  // Form state
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
    institution: "",
    gradelevel: "",
    dateofbirth: "",
    contact: "",
    country: "",
    profile_photo: null,
    terms: false,
  });

  // Password visibility toggles
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // File validation
  function validateFile(file) {
    const validTypes = ["image/jpeg", "image/png"];
    if (!validTypes.includes(file.type)) {
      setError("Only JPG and PNG files are allowed.");
      setPreview(null);
      return false;
    }
    setError("");
    return true;
  }

  // Drag and drop handlers
  function handleDrag(e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }

  function handleDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (validateFile(file)) {
        setPreview(URL.createObjectURL(file));
        setFormData({ ...formData, profile_photo: file });
      }
    }
  }

  // Input change handler
  function handleChange(e) {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else if (type === "file" && files && files[0]) {
      const file = files[0];
      if (validateFile(file)) {
        setPreview(URL.createObjectURL(file));
        setFormData({ ...formData, profile_photo: file });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  }

  // Password toggle handlers
  const togglePassword = () => setShowPassword((v) => !v);
  const toggleConfirmPassword = () => setShowConfirmPassword((v) => !v);

  // Submit handler with Axios
  async function handleSubmit(e) {
    e.preventDefault();
    // Basic validation
     
    if (!formData.fullname || !formData.email || !formData.password) {
      setError("Please fill in all required fields.");
        setSuccess("");
        return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      setSuccess("");
      return;
    }
  
    setError("");
    setSuccess("");

    // Prepare form data for file upload
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key !== "confirmPassword") {
        data.append(key, value);
      }
    });

    try {
      // Change the URL to match your Django endpoint
      const response = await axios.post(
        `${API_URL}/api/students/register/`,
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setSuccess("Registration successful!");
      setError("");
      // Optionally redirect to login or clear form
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      let message =
        "Registration failed. Please check your input and try again.";

      if (err.response?.data) {
        // If it's a string (rare, but possible)
        if (typeof err.response.data === "string") {
          message = err.response.data;
        }
        // If it's an object (most DRF validation errors)
        else if (typeof err.response.data === "object") {
          // Collect all error messages into a single string
          message = Object.values(err.response.data).flat().join(" ");
        }
      }

      setError(message);
      setSuccess("");
    }
  }

  return (
    <div
      className="relative flex min-h-screen flex-col bg-[#f8fbfb] overflow-x-hidden"
      style={{ fontFamily: 'Lexend, "Noto Sans", sans-serif' }}
    >
      <div className="flex flex-row justify-center items-center bg-[#f8fbfb] py-5">
        <div className="px-40 flex flex-1 justify-center py-5">
          <form
            className="flex flex-col w-[512px] max-w-[512px] py-5 flex-1"
            onSubmit={handleSubmit}
          >
            <h2 className="text-[#0e1b17] text-[28px] font-bold leading-tight px-4 text-center pb-3 pt-5">
              Create Your Student Account
            </h2>
            {/* Full Name */}
            <div className="flex max-w-3xl flex-wrap items-end gap-4 px-4 py-3">
              <label className="flex flex-col min-w-40 flex-1">
                <p className="text-[#0e1b17] text-base font-medium pb-2">
                  Full Name
                </p>
                <input
                  name="fullname"
                  value={formData.fullname}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="form-input w-full rounded-xl text-[#0e1b17] bg-[#e8f3f0] h-14 placeholder:text-[#4f9683] p-4 text-base font-normal focus:outline-0 focus:ring-0 border-none"
                  required
                />
              </label>
            </div>
            {/* Email Address */}
            <div className="flex max-w-3xl flex-wrap items-end gap-4 px-4 py-3">
              <label className="flex flex-col min-w-40 flex-1">
                <p className="text-[#0e1b17] text-base font-medium pb-2">
                  Email Address
                </p>
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                  className="form-input w-full rounded-xl text-[#0e1b17] bg-[#e8f3f0] h-14 placeholder:text-[#4f9683] p-4 text-base font-normal focus:outline-0 focus:ring-0 border-none"
                  required
                />
              </label>
            </div>
            {/* Password */}
            <div className="flex max-w-3xl flex-wrap items-end gap-4 px-4 py-3">
              <label className="flex flex-col min-w-40 flex-1">
                <p className="text-[#0e1b17] text-base font-medium pb-2">
                  Password
                </p>
                <div className="flex w-full items-stretch rounded-xl">
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create a password"
                    className="form-input w-full rounded-xl text-[#0e1b17] bg-[#e8f3f0] h-14 placeholder:text-[#4f9683] p-4 pr-2 text-base font-normal focus:outline-0 focus:ring-0 border-none rounded-r-none border-r-0"
                    required
                  />
                  <div
                    className="text-[#4f9683] flex items-center justify-center pr-4 bg-[#e8f3f0] rounded-r-xl cursor-pointer"
                    onClick={togglePassword}
                    tabIndex={0}
                    role="button"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {/* Eye Icon */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24px"
                      height="24px"
                      fill="currentColor"
                      viewBox="0 0 256 256"
                    >
                      <path d="M247.31,124.76c-.35-.79-8.82-19.58-27.65-38.41C194.57,61.26,162.88,48,128,48S61.43,61.26,36.34,86.35C17.51,105.18,9,124,8.69,124.76a8,8,0,0,0,0,6.5c.35.79,8.82,19.57,27.65,38.4C61.43,194.74,93.12,208,128,208s66.57-13.26,91.66-38.34c18.83-18.83,27.3-37.61,27.65-38.4A8,8,0,0,0,247.31,124.76ZM128,192c-30.78,0-57.67-11.19-79.93-33.25A133.47,133.47,0,0,1,25,128,133.33,133.33,0,0,1,48.07,97.25C70.33,75.19,97.22,64,128,64s57.67,11.19,79.93,33.25A133.46,133.46,0,0,1,231.05,128C223.84,141.46,192.43,192,128,192Zm0-112a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Z" />
                    </svg>
                  </div>
                </div>
              </label>
            </div>
            {/* Confirm Password */}
            <div className="flex max-w-3xl flex-wrap items-end gap-4 px-4 py-3">
              <label className="flex flex-col min-w-40 flex-1">
                <p className="text-[#0e1b17] text-base font-medium pb-2">
                  Confirm Password
                </p>
                <div className="flex w-full items-stretch rounded-xl">
                  <input
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    className="form-input w-full rounded-xl text-[#0e1b17] bg-[#e8f3f0] h-14 placeholder:text-[#4f9683] p-4 pr-2 text-base font-normal focus:outline-0 focus:ring-0 border-none rounded-r-none border-r-0"
                    required
                  />
                  <div
                    className="text-[#4f9683] flex items-center justify-center pr-4 bg-[#e8f3f0] rounded-r-xl cursor-pointer"
                    onClick={toggleConfirmPassword}
                    tabIndex={0}
                    role="button"
                    aria-label={
                      showConfirmPassword ? "Hide password" : "Show password"
                    }
                  >
                    {/* Eye Icon */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24px"
                      height="24px"
                      fill="currentColor"
                      viewBox="0 0 256 256"
                    >
                      <path d="M247.31,124.76c-.35-.79-8.82-19.58-27.65-38.41C194.57,61.26,162.88,48,128,48S61.43,61.26,36.34,86.35C17.51,105.18,9,124,8.69,124.76a8,8,0,0,0,0,6.5c.35.79,8.82,19.57,27.65,38.4C61.43,194.74,93.12,208,128,208s66.57-13.26,91.66-38.34c18.83-18.83,27.3-37.61,27.65-38.4A8,8,0,0,0,247.31,124.76ZM128,192c-30.78,0-57.67-11.19-79.93-33.25A133.47,133.47,0,0,1,25,128,133.33,133.33,0,0,1,48.07,97.25C70.33,75.19,97.22,64,128,64s57.67,11.19,79.93,33.25A133.46,133.46,0,0,1,231.05,128C223.84,141.46,192.43,192,128,192Zm0-112a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Z" />
                    </svg>
                  </div>
                </div>
              </label>
            </div>
            {/* Institution Name */}
            <div className="flex max-w-3xl flex-wrap items-end gap-4 px-4 py-3">
              <label className="flex flex-col min-w-40 flex-1">
                <p className="text-[#0e1b17] text-base font-medium pb-2">
                  Institution Name
                </p>
                <input
                  name="institution"
                  value={formData.institution}
                  onChange={handleChange}
                  placeholder="Enter your institution name"
                  className="form-input w-full rounded-xl text-[#0e1b17] bg-[#e8f3f0] h-14 placeholder:text-[#4f9683] p-4 text-base font-normal focus:outline-0 focus:ring-0 border-none"
                />
              </label>
            </div>
            {/* Current Grade / Year / Level */}
            <div className="flex max-w-3xl flex-wrap items-end gap-4 px-4 py-3">
              <label className="flex flex-col min-w-40 flex-1">
                <p className="text-[#0e1b17] text-base font-medium pb-2">
                  Current Grade / Year / Level
                </p>
                <select
                  name="gradelevel"
                  value={formData.gradelevel}
                  onChange={handleChange}
                  className="form-input w-full rounded-xl text-[#0e1b17] bg-[#e8f3f0] h-14 p-4 text-base font-normal focus:outline-0 focus:ring-0 border-none"
                >
                  <option value="">Select your current grade</option>
                  <option value="grade10">Grade 10</option>
                  <option value="grade12">Grade 12</option>
                  <option value="ug1">Undergraduate - 1st Year</option>
                  <option value="ug2">Undergraduate - 2nd Year</option>
                  <option value="pg1">Postgraduate - 1st Year</option>
                </select>
              </label>
            </div>
            {/* Date of Birth */}
            <div className="flex max-w-3xl flex-wrap items-end gap-4 px-4 py-3">
              <label className="flex flex-col min-w-40 flex-1">
                <p className="text-[#0e1b17] text-base font-medium pb-2">
                  Date of Birth
                </p>
                <input
                  name="dateofbirth"
                  dateFormat="dd-MM-yyyy"
                  type="date"
                  value={formData.dateofbirth}
                  onChange={handleChange}
                  className="form-input w-full rounded-xl text-[#0e1b17] bg-[#e8f3f0] h-14 p-4 text-base font-normal focus:outline-0 focus:ring-0 border-none"
                />
              </label>
            </div>
            {/* Contact Number (Optional) */}
            <div className="flex max-w-3xl flex-wrap items-end gap-4 px-4 py-3">
              <label className="flex flex-col min-w-40 flex-1">
                <p className="text-[#0e1b17] text-base font-medium pb-2">
                  Contact Number (Optional)
                </p>
                <input
                  name="contact"
                  type="tel"
                  value={formData.contact}
                  onChange={handleChange}
                  placeholder="Enter your contact number"
                  className="form-input w-full rounded-xl text-[#0e1b17] bg-[#e8f3f0] h-14 placeholder:text-[#4f9683] p-4 text-base font-normal focus:outline-0 focus:ring-0 border-none"
                />
              </label>
            </div>
            {/* Country */}
            <div className="flex max-w-3xl flex-wrap items-end gap-4 px-4 py-3">
              <label className="flex flex-col min-w-40 flex-1">
                <p className="text-[#0e1b17] text-base font-medium pb-2">
                  Country
                </p>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="form-input w-full rounded-xl text-[#0e1b17] bg-[#e8f3f0] h-14 p-4 text-base font-normal focus:outline-0 focus:ring-0 border-none"
                >
                  <option value="">Select your country</option>
                  <option value="india">India</option>
                  <option value="usa">USA</option>
                  <option value="uk">UK</option>
                  <option value="other">Other</option>
                </select>
              </label>
            </div>
            {/* Profile Photo (Optional) */}
            <div className="flex flex-col p-4">
              <div
                className={`flex flex-col items-center gap-6 rounded-xl border-2 border-dashed border-[#d0e6e0] px-6 py-14 transition-colors duration-200 ${
                  dragActive ? "bg-[#e8f3f0] border-[#1ee0ac]" : ""
                }`}
                onDragEnter={handleDrag}
                onDragOver={handleDrag}
                onDragLeave={handleDrag}
                onDrop={handleDrop}
                style={{ cursor: "pointer" }}
              >
                <div className="flex flex-col items-center gap-2 max-w-[480px]">
                  <p className="text-[#0e1b17] text-lg font-bold leading-tight tracking-[-0.015em] text-center">
                    Profile Photo (Optional)
                  </p>
                  <p className="text-[#0e1b17] text-sm font-normal text-center">
                    Drag &amp; drop or click to upload a JPG or PNG photo
                  </p>
                </div>
                {preview && (
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-24 h-24 object-cover rounded-full border border-[#d0e6e0] shadow"
                  />
                )}
                <input
                  type="file"
                  id="profilePhoto"
                  name="profile_photo"
                  accept="image/jpeg,image/png"
                  className="hidden"
                  ref={inputRef}
                  onChange={handleChange}
                />
                <label
                  htmlFor="profilePhoto"
                  className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-[#e8f3f0] text-[#0e1b17] text-sm font-bold leading-normal tracking-[0.015em]"
                >
                  <span className="truncate">Upload</span>
                </label>
              </div>
            </div>
            {/* Terms and Privacy Policy */}
            <div className="px-4">
              <label className="flex gap-x-3 py-3 flex-row items-center">
                <input
                  type="checkbox"
                  name="terms"
                  checked={formData.terms}
                  onChange={handleChange}
                  className="h-5 w-5 rounded border-[#d0e6e0] border-2 bg-transparent text-[#1ee0ac] checked:bg-[#1ee0ac] checked:border-[#1ee0ac] focus:ring-0 focus:ring-offset-0 focus:border-[#d0e6e0] focus:outline-none"
                  required
                />
                <p className="text-[#0e1b17] text-base font-normal">
                  I agree to the Terms of Service and Privacy Policy
                </p>
              </label>
            </div>
            {/* Error/Success Message */}
            <div className="my-2">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded text-center text-sm font-medium">
                  {error.split("\n").map((line, idx) => (
                    <div key={idx}>{line}</div>
                  ))}
                </div>
              )}
              {success && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded text-center text-sm font-medium">
                  {success}
                </div>
              )}
            </div>

            {/* Register Button */}
            <div className="flex px-4 py-3">
              <button
                className="flex min-w-[84px] max-w-[480px] items-center justify-center overflow-hidden rounded-full h-12 px-5 flex-1 bg-[#1ee0ac] text-[#0e1b17] text-base font-bold leading-normal tracking-[0.015em]"
                type="submit"
              >
                <span className="truncate">Register</span>
              </button>
            </div>
            {/* Already have an account */}
            <p className="text-[#4f9683] text-sm font-normal pb-3 pt-1 px-4 text-center underline cursor-pointer">
              <Link to="/login">Already have an account? Log In</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
