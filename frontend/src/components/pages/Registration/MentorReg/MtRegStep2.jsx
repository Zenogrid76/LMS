import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";
const STEP2_ENDPOINT = `${API_URL}/api/mentors/application/step2/`;

const TEACHING_METHODS = [
  { value: "one_on_one", label: "1:1" },
  { value: "group", label: "Group" },
];

// You can replace this SVG with your own stepper image if you have one
function StepperImage() {
  return (
    <div className="flex items-center justify-center gap-2">
      <div className="flex flex-col items-center">
        <div className="w-8 h-8 rounded-full bg-[#a3e0d0] flex items-center justify-center text-[#101816] font-bold text-lg">
          1
        </div>
        <span className="text-xs mt-1 text-[#5c8a7d]">Profile</span>
      </div>
      <div className="w-8 h-1 bg-[#a3e0d0] mx-1 rounded"></div>
      <div className="flex flex-col items-center">
        <div className="w-8 h-8 rounded-full bg-[#1fe0ab] flex items-center justify-center text-[#101816] font-bold text-lg">
          2
        </div>
        <span className="text-xs mt-1 text-[#5c8a7d]">Expertise</span>
      </div>
      <div className="w-8 h-1 bg-[#d4e2df] mx-1 rounded"></div>
      <div className="flex flex-col items-center">
        <div className="w-8 h-8 rounded-full bg-[#d4e2df] flex items-center justify-center text-[#101816] font-bold text-lg">
          3
        </div>
        <span className="text-xs mt-1 text-[#5c8a7d]">Preferences</span>
      </div>
    </div>
  );
}

export default function MtRegStep2() {
  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");

  // State for form fields (same as before)
  const [expertiseAt, setExpertiseAt] = useState("");
  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState("");
  const [teachingMethod, setTeachingMethod] = useState("");
  const [jobPosition, setJobPosition] = useState("");
  const [jobCompany, setJobCompany] = useState("");
  const [jobResponsibility, setJobResponsibility] = useState("");
  const [teachingPhilosophy, setTeachingPhilosophy] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch existing data on mount
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(STEP2_ENDPOINT, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          if (data.expertises && data.expertises.length > 0) {
            const exp = data.expertises[0];
            setExpertiseAt(exp.expert_at || "");
            setSkills((exp.skills || []).map((s) => s.name));
            setTeachingMethod(exp.teaching_method || "");
            setTeachingPhilosophy(exp.teaching_philosophy || "");
          }
          if (data.job_experiences && data.job_experiences.length > 0) {
            const job = data.job_experiences[0];
            setJobPosition(job.position || "");
            setJobCompany(job.company || "");
            setJobResponsibility(job.responsibility || "");
          }
        }
      } catch {
        setError("Failed to fetch data.");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [token]);

  // Handlers for skills
  const handleAddSkill = () => {
    if (skillInput.trim() && !skills.includes(skillInput.trim())) {
      setSkills([...skills, skillInput.trim()]);
      setSkillInput("");
    }
  };
  const handleRemoveSkill = (idx) => {
    setSkills(skills.filter((_, i) => i !== idx));
  };

  // Form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const payload = {
        expertises: [
          {
            expert_at: expertiseAt,
            teaching_method: teachingMethod,
            teaching_philosophy: teachingPhilosophy,
            skills: skills.map((name) => ({ name })),
          },
        ],
        job_experiences:
          jobPosition || jobCompany || jobResponsibility
            ? [
                {
                  position: jobPosition,
                  company: jobCompany,
                  responsibility: jobResponsibility,
                },
              ]
            : [],
        onboarding_step: 3,
        is_onboarding_complete: false,
      };
      const res = await fetch(STEP2_ENDPOINT, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        navigate("/mentor/application/step3");
      } else {
        const data = await res.json();
        setError(data.detail || "Failed to save. Please check your entries.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Navigation
  const handleBack = () => {
    navigate("/mentor/application/step1");
  };

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-[#f9fbfa] font-['Lexend','Noto Sans',sans-serif]">
      {/* Stepper and Progress Bar */}
      <div className="flex flex-col items-center pt-8 pb-2">
        <StepperImage />
        <div className="w-[320px] mt-3">
          <div className="h-2 w-full rounded-full bg-[#d4e2df]">
            <div
              className="h-2 rounded-full bg-[#1fe0ab]"
              style={{ width: "66%" }}
            />
          </div>
          <div className="text-center text-xs text-[#5c8a7d] mt-1 font-medium">
            Step 2 of 3
          </div>
        </div>
      </div>

      <form className="flex flex-1 justify-center py-5" onSubmit={handleSubmit}>
        <div className="flex flex-col w-[512px]  py-5 max-w-[960px] flex-1">
          {/* Expertise At */}
          <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
            <label className="flex flex-col min-w-40 flex-1">
              <p className="text-[#101816] text-base font-medium leading-normal pb-2">
                Expertise At
              </p>
              <input
                placeholder="e.g., Computer Science, Electrical Engineering, Math, Physics"
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#101816] focus:outline-0 focus:ring-0 border border-[#d4e2df] bg-[#f9fbfa] focus:border-[#d4e2df] h-14 placeholder:text-[#5c8a7d] p-[15px] text-base font-normal leading-normal"
                value={expertiseAt}
                onChange={(e) => setExpertiseAt(e.target.value)}
                required
              />
            </label>
          </div>

          {/* Subject/Skills */}
          <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
            <label className="flex flex-col min-w-40 flex-1">
              <p className="text-[#101816] text-base font-medium leading-normal pb-2">
                Subject/Skills
              </p>
              <div className="flex gap-2">
                <input
                  placeholder="e.g., Mathematics"
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#101816] focus:outline-0 focus:ring-0 border border-[#d4e2df] bg-[#f9fbfa] focus:border-[#d4e2df] h-14 placeholder:text-[#5c8a7d] p-[15px] text-base font-normal leading-normal"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                />
                <button
                  type="button"
                  className="rounded-full bg-[#a3e0d0] px-4 text-[#101816] font-bold"
                  onClick={handleAddSkill}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    fill="currentColor"
                    className="text-[#101816]"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                  </svg>
                </button>
              </div>
            </label>
          </div>
          <div className="flex gap-3 p-3 flex-wrap pr-4">
            {skills.map((skill, idx) => (
              <div
                key={skill}
                className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-full bg-[#eaf1ef] pl-4 pr-2"
              >
                <p className="text-[#101816] text-sm font-medium leading-normal">
                  {skill}
                </p>
                <button
                  type="button"
                  onClick={() => handleRemoveSkill(idx)}
                  className="text-[#ff5a5f] font-bold ml-2"
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          {/* Teaching Methods */}
          <h3 className="text-[#101816] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
            Preferred Teaching Methods
          </h3>
          <div className="flex flex-col gap-3 p-4">
            {TEACHING_METHODS.map((method) => (
              <label
                key={method.value}
                className={`flex items-center gap-4 rounded-xl border border-solid border-[#d4e2df] p-[15px]`}
              >
                <input
                  type="radio"
                  className="h-5 w-5 border-2 border-[#d4e2df] bg-transparent text-transparent checked:border-[#a3e0d0] checked:bg-[image:--radio-dot-svg] focus:outline-none focus:ring-0 focus:ring-offset-0 checked:focus:border-[#a3e0d0]"
                  name="teaching_method"
                  checked={teachingMethod === method.value}
                  value={method.value}
                  onChange={() => setTeachingMethod(method.value)}
                />
                <div className="flex grow flex-col">
                  <p className="text-[#101816] text-sm font-medium leading-normal">
                    {method.label}
                  </p>
                </div>
              </label>
            ))}
          </div>

          {/* Job Experience */}
          <h3 className="text-[#101816] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
            Job Experience (Optional)
          </h3>
          <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
            <label className="flex flex-col min-w-40 flex-1">
              <p className="text-[#101816] text-base font-medium leading-normal pb-2">
                Position
              </p>
              <input
                placeholder="e.g., Math Tutor"
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#101816] focus:outline-0 focus:ring-0 border border-[#d4e2df] bg-[#f9fbfa] focus:border-[#d4e2df] h-14 placeholder:text-[#5c8a7d] p-[15px] text-base font-normal leading-normal"
                value={jobPosition}
                onChange={(e) => setJobPosition(e.target.value)}
              />
            </label>
          </div>
          <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
            <label className="flex flex-col min-w-40 flex-1">
              <p className="text-[#101816] text-base font-medium leading-normal pb-2">
                Company
              </p>
              <input
                placeholder="e.g., EduPlatform"
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#101816] focus:outline-0 focus:ring-0 border border-[#d4e2df] bg-[#f9fbfa] focus:border-[#d4e2df] h-14 placeholder:text-[#5c8a7d] p-[15px] text-base font-normal leading-normal"
                value={jobCompany}
                onChange={(e) => setJobCompany(e.target.value)}
              />
            </label>
          </div>
          <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
            <label className="flex flex-col min-w-40 flex-1">
              <p className="text-[#101816] text-base font-medium leading-normal pb-2">
                Responsibility
              </p>
              <textarea
                placeholder="Describe your responsibilities"
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#101816] focus:outline-0 focus:ring-0 border border-[#d4e2df] bg-[#f9fbfa] focus:border-[#d4e2df] min-h-36 placeholder:text-[#5c8a7d] p-[15px] text-base font-normal leading-normal"
                value={jobResponsibility}
                onChange={(e) => setJobResponsibility(e.target.value)}
              />
            </label>
          </div>

          {/* Teaching Philosophy */}
          <h3 className="text-[#101816] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
            Teaching Philosophy
          </h3>
          <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
            <label className="flex flex-col min-w-40 flex-1">
              <textarea
                placeholder="Share your teaching philosophy"
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#101816] focus:outline-0 focus:ring-0 border border-[#d4e2df] bg-[#f9fbfa] focus:border-[#d4e2df] min-h-36 placeholder:text-[#5c8a7d] p-[15px] text-base font-normal leading-normal"
                value={teachingPhilosophy}
                onChange={(e) => setTeachingPhilosophy(e.target.value)}
                required
              />
            </label>
          </div>

          {/* Error */}
          {error && (
            <div className="text-[#ff5a5f] font-medium text-center py-2">
              {error}
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-1 gap-3 flex-wrap px-4 py-3 justify-between">
            <button
              type="button"
              className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-[#eaf1ef] text-[#101816] text-sm font-bold leading-normal tracking-[0.015em]"
              onClick={handleBack}
              disabled={loading}
            >
              <span className="truncate">Back</span>
            </button>
            <button
              type="submit"
              className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-[#a3e0d0] text-[#101816] text-sm font-bold leading-normal tracking-[0.015em]"
              disabled={loading}
            >
              <span className="truncate">{loading ? "Saving..." : "Next"}</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
