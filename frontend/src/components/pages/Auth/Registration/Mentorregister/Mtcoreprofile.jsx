import React, { useState } from "react";
import timezonesData from "../../../../common/Data/timezones.json"; // Adjust the path as necessary
import AvatarUploader from "../../../../common/Form/AvatarUploader"; // Assuming you have an AvatarUploader component
import FormField from "../../../../common/Form/Formfield"; // Assuming you have a reusable FormField component
import axios from "axios";

const timezones = timezonesData.timezones; // Assuming timezones.json has a 'name' field for each timezone

const MtCoreprofile = ({ onNext }) => {
  const [form, setForm] = useState({
    name: "",
    photo: null,
    email: "",
    phone: "",
    timezone: "",
    bio: "",
  });


  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

 const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Convert photo blob to File if needed
      const formData = new FormData();
      formData.append('name', form.name);
      formData.append('email', form.email);
      formData.append('phone', form.phone);
      formData.append('timezone', form.timezone);
      formData.append('bio', form.bio);
      
      if (form.photo) {
        formData.append('photo', form.photo, 'profile.jpg');
      }
        if (form.password !== form.confirmPassword) {
    alert("Passwords don't match!");
    return;
  }
  
  if (form.password.length < 8) {
    alert("Password must be at least 8 characters");
    return;
  }

      // Send to Django backend
      const response = await axios.post(
        '/api/mentor/signup/step1/',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      console.log('Step 1 saved:', response.data);
      onNext(form); // Proceed to next step
    } catch (error) {
      console.error('Submission failed:', error.response?.data || error.message);
      // Show error to user
    }
  };



  const [preview, setPreview] = useState(null);

  const handleImageChange = (blob) => {
    setForm((prev) => ({
      ...prev,
      photo: blob,
    }));

    // Optional: Create preview URL
    setPreview(URL.createObjectURL(blob));
  };

  useEffect(() => {
  async function fetchSavedData() {
    const sessionId = localStorage.getItem('signupSessionId');
    if (sessionId) {
      const response = await axios.get(`/api/mentor/signup/session/${sessionId}/`);
      if (response.data.step1_data) {
        setForm(response.data.step1_data);
      }
    }
  }
  fetchSavedData();
}, []);



  return (
    <div className="min-h-screen bg-[#F7FAFA] font-['Lexend']">
      {/* Main Form */}
      <main className="flex flex-col items-center py-8">
        <div className="w-full max-w-4xl">
          {/* Progress Bar */}
          <div className="flex flex-col gap-2 px-4 mt-4">
            <div className="flex flex-row items-center justify-between">
              <span className="text-base font-medium text-[#0D1C17]">
                Step 1 of 4
              </span>
            </div>
            <div className="w-full h-2 bg-[#D1E6E0] rounded">
              <div
                className="h-2 rounded bg-[#1FE0AB]"
                style={{ width: "25%" }}
              />
            </div>
          </div>

          {/* Heading */}
          <h2 className="text-2xl md:text-3xl font-bold text-center text-[#0D1C17] mt-8 mb-6">
            Create your mentor profile
          </h2>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center gap-6"
          >
            {/* Full Name */}
            <FormField
              label="Full Name"
              name="name"
              type="text"
              placeholder="Enter your full name"
              value={form.name}
              onChange={handleChange}
            />

            {/* Profile Photo - Replaced with AvatarUploader */}
            <div className="w-full max-w-xl flex flex-col gap-2 ">
              <label className="text-base font-medium text-[#0D1C17] ">
                Profile Photo
              </label>
              <AvatarUploader onImageChange={handleImageChange} />
              {preview && (
                <div className="mt-4">
                  <p className="text-sm text-[#4F9682]">Preview:</p>
                  <img
                    src={preview}
                    alt="Profile preview"
                    className="w-32 h-32 rounded-full object-cover border-2 border-[#D1E6E0] mt-2"
                  />
                </div>
              )}
            </div>

            {/* Contact Email */}
            <FormField
              label="Contact Email"
              name="email"
              type="email"
              placeholder="Enter your email address"
              value={form.email}
              onChange={handleChange}
            />

            // Add password fields after email field
<FormField
  label="Password"
  name="password"
  type="password"
  placeholder="Enter your password"
  value={form.password}
  onChange={handleChange}
  required
/>

<FormField
  label="Confirm Password"
  name="confirmPassword"
  type="password"
  placeholder="Confirm your password"
  value={form.confirmPassword}
  onChange={handleChange}
  required
/>

            {/* Phone Number */}
            <FormField
              label="Phone Number"
              name="phone"
              type="tel"
              placeholder="Enter your phone number"
              value={form.phone}
              onChange={handleChange}
            />

            {/* Timezone */}
            <div className="w-full max-w-xl flex flex-col gap-2">
              <label className="text-base font-medium text-[#0D1C17]">
                Timezone
              </label>
              <select
                name="timezone"
                value={form.timezone}
                onChange={handleChange}
                className="w-full p-3 pr-5 bg-[#F7FAFA] border border-[#D1E6E0] rounded-xl text-[#0D1C17] focus:outline-none"
                required
              >
                <option value="">Select your timezone</option>
                {timezones.map((tz) => (
                  <option key={tz} value={tz}>
                    {tz}
                  </option>
                ))}
              </select>
            </div>

            {/* Professional Bio */}
            <div className="w-full max-w-xl flex flex-col gap-2">
              <label className="text-base font-medium text-[#0D1C17]">
                Professional Bio
              </label>
              <textarea
                name="bio"
                value={form.bio}
                onChange={handleChange}
                placeholder="Tell us about your professional background and expertise"
                className="w-full p-3 bg-[#F7FAFA] border border-[#D1E6E0] rounded-xl min-h-[120px] text-[#0D1C17] focus:outline-none"
                required
                maxLength={200}
              />
              <div className="text-right text-xs text-[#4F9682]">
                {form.bio.length}/200 characters
              </div>
            </div>

            {/* Next Button */}
            <div className="w-full max-w-xl flex justify-end mt-4">
              <button
                type="submit"
                className="px-6 py-3 bg-[#1FE0AB] rounded-full text-sm font-bold text-[#0D1C17] hover:bg-[#13c89a] transition"
              >
                Next
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default MtCoreprofile;
