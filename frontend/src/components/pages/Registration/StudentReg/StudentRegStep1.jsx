import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../common/Api/api"; // <-- Your custom Axios instance

export default function StudentRegStep1() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    dateofbirth: "",
    profile_photo: null,
    gradelevel: "",
    institution: "",
    contact: "",
    country: "",
  });
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState("");

  // Handle changes for text/number/select inputs
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profile_photo" && files && files[0]) {
      setFormData((prev) => ({
        ...prev,
        profile_photo: files[0],
      }));
      setPreview(URL.createObjectURL(files[0]));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
    setError("");
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");
  try {
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) data.append(key, value);
    });

    await api.post("/api/students/register/", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    navigate("/student/dashboard");
  } catch (err) {
    let msg = "Failed to save profile.";
    if (err.response?.status === 401) {
      navigate("/login");
      return;
    }
    if (err.response?.data) {
      msg = Object.values(err.response.data).flat().join(" ");
    }
    setError(msg);
  }
};


  return (
    <div
      className="relative flex size-full min-h-screen flex-col bg-[#fcf8f9] group/design-root overflow-x-hidden"
      style={{
        fontFamily: 'Lexend, "Noto Sans", sans-serif',
      }}
    >
      <div className="layout-container flex h-full grow flex-col">
        <div className="px-40 flex flex-1 justify-center py-5">
          <form
            className="layout-content-container flex flex-col w-[512px] py-5 max-w-[960px] flex-1"
            onSubmit={handleSubmit}
            encType="multipart/form-data"
          >
            <h2 className="text-[#1b0e11] tracking-light text-[28px] font-bold leading-tight px-4 text-center pb-3 pt-5">
              Fill Your Student Info
            </h2>
            {/* First Name */}
            <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
              <label className="flex flex-col min-w-40 flex-1">
                <p className="text-[#1b0e11] text-base font-medium leading-normal pb-2">First Name</p>
                <input
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  placeholder="Enter your first name"
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#1b0e11] focus:outline-0 focus:ring-0 border border-[#e7d0d6] bg-[#fcf8f9] focus:border-[#e7d0d6] h-14 placeholder:text-[#974e62] p-[15px] text-base font-normal leading-normal"
                  required
                />
              </label>
            </div>
            {/* Last Name */}
            <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
              <label className="flex flex-col min-w-40 flex-1">
                <p className="text-[#1b0e11] text-base font-medium leading-normal pb-2">Last Name</p>
                <input
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  placeholder="Enter your last name"
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#1b0e11] focus:outline-0 focus:ring-0 border border-[#e7d0d6] bg-[#fcf8f9] focus:border-[#e7d0d6] h-14 placeholder:text-[#974e62] p-[15px] text-base font-normal leading-normal"
                  required
                />
              </label>
            </div>
            {/* Date of Birth */}
            <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
              <label className="flex flex-col min-w-40 flex-1">
                <p className="text-[#1b0e11] text-base font-medium leading-normal pb-2">Date of Birth</p>
                <input
                  name="dateofbirth"
                  type="date"
                  value={formData.dateofbirth}
                  onChange={handleChange}
                  placeholder="MM/DD/YYYY"
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#1b0e11] focus:outline-0 focus:ring-0 border border-[#e7d0d6] bg-[#fcf8f9] focus:border-[#e7d0d6] h-14 placeholder:text-[#974e62] p-[15px] text-base font-normal leading-normal"
                  required
                />
              </label>
            </div>
            {/* Profile Photo */}
            <div className="flex flex-col p-4">
              <div className="flex flex-col items-center gap-6 rounded-xl border-2 border-dashed border-[#e7d0d6] px-6 py-14">
                <div className="flex max-w-[480px] flex-col items-center gap-2">
                  <p className="text-[#1b0e11] text-lg font-bold leading-tight tracking-[-0.015em] max-w-[480px] text-center">Profile Photo</p>
                  <p className="text-[#1b0e11] text-sm font-normal leading-normal max-w-[480px] text-center">Drag and drop a photo here</p>
                </div>
                {preview && (
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-24 h-24 object-cover rounded-full border border-[#e7d0d6] shadow"
                  />
                )}
                <input
                  type="file"
                  name="profile_photo"
                  accept="image/*"
                  onChange={handleChange}
                  className="hidden"
                  id="profile_photo"
                />
                <label
                  htmlFor="profile_photo"
                  className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-[#f3e7ea] text-[#1b0e11] text-sm font-bold leading-normal tracking-[0.015em]"
                >
                  <span className="truncate">Upload a photo</span>
                </label>
              </div>
            </div>
            {/* Grade Level */}
            <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
              <label className="flex flex-col min-w-40 flex-1">
                <p className="text-[#1b0e11] text-base font-medium leading-normal pb-2">Grade Level</p>
                <select
                  name="gradelevel"
                  value={formData.gradelevel}
                  onChange={handleChange}
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#1b0e11] focus:outline-0 focus:ring-0 border border-[#e7d0d6] bg-[#fcf8f9] focus:border-[#e7d0d6] h-14 bg-[image:--select-button-svg] placeholder:text-[#974e62] p-[15px] text-base font-normal leading-normal"
                  required
                >
                  <option value="">Select your grade level</option>
                  <option value="grade10">Grade 10</option>
                  <option value="grade12">Grade 12</option>
                  <option value="ug1">Undergraduate - 1st Year</option>
                  <option value="ug2">Undergraduate - 2nd Year</option>
                  <option value="pg1">Postgraduate - 1st Year</option>
                </select>
              </label>
            </div>
            {/* Institution */}
            <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
              <label className="flex flex-col min-w-40 flex-1">
                <p className="text-[#1b0e11] text-base font-medium leading-normal pb-2">Institution</p>
                <input
                  name="institution"
                  value={formData.institution}
                  onChange={handleChange}
                  placeholder="Enter your institution"
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#1b0e11] focus:outline-0 focus:ring-0 border border-[#e7d0d6] bg-[#fcf8f9] focus:border-[#e7d0d6] h-14 placeholder:text-[#974e62] p-[15px] text-base font-normal leading-normal"
                  required
                />
              </label>
            </div>
            {/* Contact */}
            <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
              <label className="flex flex-col min-w-40 flex-1">
                <p className="text-[#1b0e11] text-base font-medium leading-normal pb-2">Contact</p>
                <input
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#1b0e11] focus:outline-0 focus:ring-0 border border-[#e7d0d6] bg-[#fcf8f9] focus:border-[#e7d0d6] h-14 placeholder:text-[#974e62] p-[15px] text-base font-normal leading-normal"
                  required
                />
              </label>
            </div>
            {/* Country */}
            <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
              <label className="flex flex-col min-w-40 flex-1">
                <p className="text-[#1b0e11] text-base font-medium leading-normal pb-2">Country</p>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#1b0e11] focus:outline-0 focus:ring-0 border border-[#e7d0d6] bg-[#fcf8f9] focus:border-[#e7d0d6] h-14 bg-[image:--select-button-svg] placeholder:text-[#974e62] p-[15px] text-base font-normal leading-normal"
                  required
                >
                  <option value="">Select your country</option>
                  <option value="India">India</option>
                  <option value="USA">USA</option>
                  <option value="UK">UK</option>
                  <option value="Other">Other</option>
                </select>
              </label>
            </div>
            {error && (
              <div className="text-red-600 text-center mb-4 font-semibold">{error}</div>
            )}
            <div className="flex px-4 py-3 justify-center">
              <button
                className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-[#ed6287] text-[#fcf8f9] text-sm font-bold leading-normal tracking-[0.015em]"
                type="submit"
              >
                <span className="truncate">Submit</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
