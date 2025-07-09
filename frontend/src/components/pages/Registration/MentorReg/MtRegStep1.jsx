import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import defaultProfilePic from "../../../../assets/images/default.jpg";

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

export default function MentorApplicationStep1() {
  const navigate = useNavigate();

  // Profile fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [profilePreview, setProfilePreview] = useState(defaultProfilePic);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [bio, setBio] = useState("");
  // Education fields (managed via educations API)
  const [educations, setEducations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch profile and educations on mount
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError("");
      try {
        const token = localStorage.getItem("access_token");
        if (!token) {
          navigate("/login");
          return;
        }
        // Fetch profile
        const res = await fetch(`${API_URL}/api/mentors/application/step1/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          setFirstName(data.first_name || "");
          setLastName(data.last_name || "");
          setPhoneNumber(data.phone_number || "");
          setBio(data.bio || "");
          if (data.profile_picture) {
            if (
              data.profile_picture.startsWith("blob:") ||
              data.profile_picture.startsWith("data:")
            ) {
              setProfilePreview(data.profile_picture);
            } else if (data.profile_picture.startsWith("http")) {
              setProfilePreview(data.profile_picture);
            } else {
              setProfilePreview(`${API_URL}${data.profile_picture}`);
            }
          } else {
            setProfilePreview(defaultProfilePic);
          }
        } else {
          setError("Failed to load profile data. Please login again.");
          navigate("/login");
        }

        // Fetch educations
        const eduRes = await fetch(`${API_URL}/api/mentors/educations/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (eduRes.ok) {
          const eduData = await eduRes.json();
          setEducations(Array.isArray(eduData) && eduData.length > 0 ? eduData : []);
        } else {
          setEducations([]);
        }
      } catch {
        setError("An error occurred while fetching data.");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [navigate]);

  // Education CRUD handlers
  const handleEducationChange = (index, field, value) => {
    setEducations(prev =>
      prev.map((edu, i) =>
        i === index ? { ...edu, [field]: value } : edu
      )
    );
  };

  // Add new education (POST)
const addEducation = () => {
  setEducations([
    ...educations,
    { degree: "", institution: "", from_year: "", to_year: "" }
  ]);
};
const saveEducation = async (index) => {
  const token = localStorage.getItem("access_token");
  const edu = educations[index];
  // Validate fields here...

  if (edu.id) {
    // PATCH existing education
    await fetch(`${API_URL}/api/mentors/educations/${edu.id}/`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        degree: edu.degree,
        institution: edu.institution,
        from_year: Number(edu.from_year),
        to_year: Number(edu.to_year),
      }),
    });
  } else {
    // POST new education
    const res = await fetch(`${API_URL}/api/mentors/educations/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        degree: edu.degree,
        institution: edu.institution,
        from_year: Number(edu.from_year),
        to_year: Number(edu.to_year),
      }),
    });
    if (res.ok) {
      // Replace the local entry with the one returned from backend (which includes the new id)
      const created = await res.json();
      setEducations(prev =>
        prev.map((e, i) => (i === index ? created : e))
      );
    }
  }
};

  // Remove education (DELETE)
  const removeEducation = async (index) => {
    if (educations.length === 1) return;
    const token = localStorage.getItem("access_token");
    const edu = educations[index];
    try {
      const res = await fetch(`${API_URL}/api/mentors/educations/${edu.id}/`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setEducations(educations.filter((_, i) => i !== index));
      } else {
        setError("Failed to delete education.");
      }
    } catch {
      setError("Network error while deleting education.");
    }
  };

  // Profile picture upload
  const handleProfilePictureChange = (e) => {
    const file = e.target.files && e.target.files[0];
    setProfilePicture(file);
    if (file) {
      setProfilePreview(URL.createObjectURL(file));
    } else {
      setProfilePreview(defaultProfilePic);
    }
  };

  const validate = () => {
    if (!firstName.trim()) {
      setError("First name is required");
      return false;
    }
    if (!lastName.trim()) {
      setError("Last name is required");
      return false;
    }
    setError("");
    return true;
  };

  // Save profile fields only
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setError("");

    // Save all educations
  for (let i = 0; i < educations.length; i++) {
    await saveEducation(i); // This function should POST or PATCH as needed
  }
    try {
      const token = localStorage.getItem("access_token");
      if (!token) {
        navigate("/login");
        return;
      }
      const formDataToSend = new FormData();
      formDataToSend.append("first_name", firstName);
      formDataToSend.append("last_name", lastName);
      formDataToSend.append("phone_number", phoneNumber);
      formDataToSend.append("bio", bio);
      if (profilePicture) {
        formDataToSend.append("profile_picture", profilePicture);
      }
      // Do NOT append educations here!

      const res = await fetch(`${API_URL}/api/mentors/application/step1/`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
        body: formDataToSend,
      });

      if (res.ok) {
        navigate("/mentor/application/step2");
      } else {
        const data = await res.json();
        setError(data.detail || "Failed to save data. Please check your inputs.");
      }
    } catch {
      setError("An error occurred while saving data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f9fbfa]" style={{ fontFamily: 'Lexend, "Noto Sans", sans-serif' }}>
      <form onSubmit={handleSubmit} className="flex flex-col w-4xl max-w-4xl py-5 px-8 bg-white rounded-2xl shadow-lg items-justified" encType="multipart/form-data">
        <h2 className="text-[#101816] tracking-light text-[32px] font-bold leading-tight text-center pb-3 pt-5">Become a Mentor</h2>
        {error && <div className="text-red-600 text-center mb-4 font-semibold">{error}</div>}

        {/* First Name */}
        <div className="flex max-w-4xl flex-wrap items-end gap-4 px-4 py-3">
          <label className="flex flex-col min-w-40 flex-1">
            <p className="text-[#101816] text-base font-medium leading-normal pb-2">First Name</p>
            <input
              type="text"
              placeholder="Enter your first name"
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#101816] border border-[#d4e2df] bg-[#f9fbfa] focus:outline-0 focus:ring-0 focus:border-[#d4e2df] h-14 placeholder:text-[#5c8a7d] p-[15px] text-base font-normal leading-normal"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </label>
        </div>

        {/* Last Name */}
        <div className="flex max-w-4xl flex-wrap items-end gap-4 px-4 py-3">
          <label className="flex flex-col min-w-40 flex-1">
            <p className="text-[#101816] text-base font-medium leading-normal pb-2">Last Name</p>
            <input
              type="text"
              placeholder="Enter your last name"
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#101816] border border-[#d4e2df] bg-[#f9fbfa] focus:outline-0 focus:ring-0 focus:border-[#d4e2df] h-14 placeholder:text-[#5c8a7d] p-[15px] text-base font-normal leading-normal"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </label>
        </div>

        {/* Profile Picture Upload and Preview */}
        <div className="flex flex-col p-4">
          <div className="flex flex-col items-center gap-6 rounded-xl border-2 border-dashed border-[#d4e2df] px-6 py-14">
            <img
              src={profilePreview}
              alt="Profile Preview"
              className="rounded-full object-cover w-24 h-24 border border-[#d4e2df] mb-4"
            />
            <div className="flex max-w-[480px] flex-col items-center gap-2">
              <p className="text-[#101816] text-lg font-bold leading-tight tracking-[-0.015em] max-w-[480px] text-center">Upload Profile Picture</p>
              <p className="text-[#101816] text-sm font-normal leading-normal max-w-[480px] text-center">Recommended size: 1:1 aspect ratio</p>
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleProfilePictureChange}
              className="hidden"
              id="profilePictureInput"
            />
            <label htmlFor="profilePictureInput" className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-[#eaf1ef] text-[#101816] text-sm font-bold leading-normal tracking-[0.015em]">
              <span className="truncate">Upload</span>
            </label>
          </div>
        </div>

        {/* Phone Number */}
        <div className="flex max-w-4xl flex-wrap items-end gap-4 px-4 py-3">
          <label className="flex flex-col min-w-40 flex-1">
            <p className="text-[#101816] text-base font-medium leading-normal pb-2">Phone Number</p>
            <input
              type="tel"
              placeholder="Enter your phone number"
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#101816] border border-[#d4e2df] bg-[#f9fbfa] focus:outline-0 focus:ring-0 focus:border-[#d4e2df] h-14 placeholder:text-[#5c8a7d] p-[15px] text-base font-normal leading-normal"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </label>
        </div>

        {/* Educational Background Header */}
        <h3 className="text-[#101816] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">Educational Background</h3>

        {/* Educational Background Entries */}
        {educations.map((edu, index) => (
          <div key={edu.id || index} className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
            <label className="flex flex-col min-w-80 flex-1">
              <p className="text-[#101816] text-base font-medium leading-normal pb-2">Degree</p>
              <input
                type="text"
                placeholder="e.g., Bachelor of Science"
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#101816] border border-[#d4e2df] bg-[#f9fbfa] focus:outline-0 focus:ring-0 focus:border-[#d4e2df] h-14 placeholder:text-[#5c8a7d] p-[15px] text-base font-normal leading-normal"
                value={edu.degree}
                onChange={e => handleEducationChange(index, "degree", e.target.value)}
                onBlur={() => edu.id && saveEducation(index)}
                required
              />
            </label>
            <label className="flex flex-col min-w-80 flex-1">
              <p className="text-[#101816] text-base font-medium leading-normal pb-2">Institution</p>
              <input
                type="text"
                placeholder="e.g., University of Technology"
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#101816] border border-[#d4e2df] bg-[#f9fbfa] focus:outline-0 focus:ring-0 focus:border-[#d4e2df] h-14 placeholder:text-[#5c8a7d] p-[15px] text-base font-normal leading-normal"
                value={edu.institution}
                onChange={e => handleEducationChange(index, "institution", e.target.value)}
                onBlur={() => edu.id && saveEducation(index)}
                required
              />
            </label>
            <label className="flex flex-col min-w-40 flex-1">
              <p className="text-[#101816] text-base font-medium leading-normal pb-2">From Year</p>
              <input
                type="number"
                placeholder="e.g., 2018"
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#101816] border border-[#d4e2df] bg-[#f9fbfa] focus:outline-0 focus:ring-0 focus:border-[#d4e2df] h-14 placeholder:text-[#5c8a7d] p-[15px] text-base font-normal leading-normal"
                value={edu.from_year}
                onChange={e => handleEducationChange(index, "from_year", e.target.value)}
                onBlur={() => edu.id && saveEducation(index)}
                required
              />
            </label>
            <label className="flex flex-col min-w-40 flex-1">
              <p className="text-[#101816] text-base font-medium leading-normal pb-2">To Year</p>
              <input
                type="number"
                placeholder="e.g., 2022"
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#101816] border border-[#d4e2df] bg-[#f9fbfa] focus:outline-0 focus:ring-0 focus:border-[#d4e2df] h-14 placeholder:text-[#5c8a7d] p-[15px] text-base font-normal leading-normal"
                value={edu.to_year}
                onChange={e => handleEducationChange(index, "to_year", e.target.value)}
                onBlur={() => edu.id && saveEducation(index)}
                required
              />
            </label>
            {educations.length > 1 && (
              <button
                type="button"
                onClick={() => removeEducation(index)}
                className="text-red-600 font-bold text-xl leading-none px-3"
                aria-label="Remove education"
              >
                &times;
              </button>
            )}
          </div>
        ))}

        {/* Add Education Button */}
        <div className="flex px-4 py-3 justify-start">
          <button
            type="button"
            onClick={addEducation}
            className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-[#eaf1ef] text-[#101816] text-sm font-bold leading-normal tracking-[0.015em]"
          >
            <span className="truncate">Add Education</span>
          </button>
        </div>

        {/* Bio */}
        <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
          <label className="flex flex-col min-w-40 flex-1">
            <p className="text-[#101816] text-base font-medium leading-normal pb-2">Bio</p>
            <textarea
              placeholder="Write a short bio about yourself (150-200 characters)"
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#101816] border border-[#d4e2df] bg-[#f9fbfa] focus:outline-0 focus:ring-0 focus:border-[#d4e2df] min-h-36 placeholder:text-[#5c8a7d] p-[15px] text-base font-normal leading-normal"
              value={bio}
              onChange={e => setBio(e.target.value)}
              maxLength={200}
            />
          </label>
        </div>

        {/* Next Button */}
        <div className="flex px-4 py-3">
          <button
            type="submit"
            disabled={loading}
            className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-12 px-5 flex-1 bg-[#a3e0d0] text-[#101816] text-base font-bold leading-normal tracking-[0.015em] disabled:opacity-50"
          >
            {loading ? "Saving..." : "Next"}
          </button>
        </div>
      </form>
    </div>
  );
}
