import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const TARGET_STUDENTS = [
  { value: "high_school", label: "High School" },
  { value: "college", label: "College" },
  { value: "undergraduate", label: "Undergraduate" },
  { value: "graduate", label: "Graduate" },
  { value: "professional", label: "Professional" },
  { value: "other", label: "Other" },
];

const LANGUAGES = [
  { value: "english", label: "English" },
  { value: "spanish", label: "Spanish" },
  { value: "french", label: "French" },
  { value: "bangla", label: "Bangla" },
  { value: "hindi", label: "Hindi" },
  { value: "arabic", label: "Arabic" },
  { value: "chinese", label: "Chinese" },
  { value: "german", label: "German" },
  { value: "japanese", label: "Japanese" },
  { value: "portuguese", label: "Portuguese" },
  { value: "russian", label: "Russian" },
  { value: "other", label: "Other" },
];

const TIME_SLOTS = [
  { label: "Morning (8 AM - 12 PM)", from: "08:00", to: "12:00" },
  { label: "Afternoon (12 PM - 4 PM)", from: "12:00", to: "16:00" },
  { label: "Evening (4 PM - 8 PM)", from: "16:00", to: "20:00" },
  { label: "Night (8 PM - 12 AM)", from: "20:00", to: "00:00" },
];

const DAYS = [
  "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
];

const DAY_MAP = {
  Sunday: 0,
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6,
};

export default function MtRegStep3() {
  const navigate = useNavigate();
  const [targetStudent, setTargetStudent] = useState("");
  const [language, setLanguage] = useState("");
  const [selectedTimeSlots, setSelectedTimeSlots] = useState([]);
  const [otherChecked, setOtherChecked] = useState(false);
  const [otherFrom, setOtherFrom] = useState("");
  const [otherTo, setOtherTo] = useState("");
  const [days, setDays] = useState([]);
  const [okWithDiversity, setOkWithDiversity] = useState(false);
  const [okWithDisability, setOkWithDisability] = useState(false);
  const [terms, setTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleTimeSlotChange = (slotLabel) => {
    setSelectedTimeSlots((prev) =>
      prev.includes(slotLabel)
        ? prev.filter((s) => s !== slotLabel)
        : [...prev, slotLabel]
    );
  };

  const handleDayChange = (day) => {
    setDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const handleOtherCheckbox = () => {
    setOtherChecked((prev) => !prev);
    if (otherChecked) {
      setOtherFrom("");
      setOtherTo("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!terms) return setError("Please agree to the terms and conditions.");
    if (!targetStudent || !language) return setError("Please select all required fields.");
    if (days.length === 0) return setError("Please select at least one available day.");
    if (selectedTimeSlots.length === 0 && !otherChecked)
      return setError("Please select at least one time slot or specify your own.");
    if (otherChecked && (!otherFrom || !otherTo))
      return setError("Please specify both From and To times for your custom slot.");

    setLoading(true);

    let availabilities = [];
    days.forEach((day) => {
      selectedTimeSlots.forEach((slotLabel) => {
        const slot = TIME_SLOTS.find((s) => s.label === slotLabel);
        if (slot) {
          availabilities.push({
            day: DAY_MAP[day],
            from_time: slot.from,
            to_time: slot.to,
          });
        }
      });
      if (otherChecked && otherFrom && otherTo) {
        availabilities.push({
          day: DAY_MAP[day],
          from_time: otherFrom,
          to_time: otherTo,
        });
      }
    });

    const preference = {
      target_students: targetStudent,
      preferred_language: language,
      ok_with_diversity: okWithDiversity,
      ok_with_disabilities: okWithDisability,
    };

    try {
      const token = localStorage.getItem("access_token");
      const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";
      const res = await fetch(`${API_URL}/api/mentors/application/step3/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          availabilities,
          preference,
          onboarding_step: 4,
          is_onboarding_complete: true,
        }),
      });
      if (res.ok) {
        navigate("/mentor/dashboard");
      } else {
        const data = await res.json();
        setError(data.detail || "Failed to submit. Please check your entries.");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate("/mentor/application/step2");
  };

  function StepperImage() {
    return (
      <div className="flex items-center justify-center gap-2">
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 rounded-full bg-[#a3e0d0] flex items-center justify-center text-[#101816] font-bold text-lg">1</div>
          <span className="text-xs mt-1 text-[#5c8a7d]">Profile</span>
        </div>
        <div className="w-8 h-1 bg-[#a3e0d0] mx-1 rounded"></div>
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 rounded-full bg-[#a3e0d0] flex items-center justify-center text-[#101816] font-bold text-lg">2</div>
          <span className="text-xs mt-1 text-[#5c8a7d]">Expertise</span>
        </div>
        <div className="w-8 h-1 bg-[#1fe0ab] mx-1 rounded"></div>
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 rounded-full bg-[#1fe0ab] flex items-center justify-center text-[#101816] font-bold text-lg">3</div>
          <span className="text-xs mt-1 text-[#5c8a7d]">Preferences</span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-[#f9fbfa] font-['Lexend','Noto Sans',sans-serif]">
      <div className="flex flex-col items-center pt-8 pb-2">
        <StepperImage />
        <div className="w-[320px] mt-3">
          <div className="h-2 w-full rounded-full bg-[#d4e2df]">
            <div className="h-2 rounded-full bg-[#1fe0ab]" style={{ width: "100%" }} />
          </div>
          <div className="text-center text-xs text-[#5c8a7d] mt-1 font-medium">
            Step 3 of 3
          </div>
        </div>
      </div>

      <form
        className="flex flex-1 justify-center py-5"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col w-[512px]  py-5 max-w-[960px] flex-1">
          <h2 className="text-[#101816] tracking-light text-[28px] font-bold leading-tight px-4 text-center pb-3 pt-5">
            Set your preferences
          </h2>

          {error && (
            <div className="text-[#ff5a5f] font-medium text-center py-2">{error}</div>
          )}

          {/* Target Students */}
          <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
            <label className="flex flex-col min-w-40 flex-1">
              <p className="text-[#101816] text-base font-medium leading-normal pb-2">Target Students</p>
              <select
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#101816] focus:outline-0 focus:ring-0 border border-[#d4e2df] bg-[#f9fbfa] focus:border-[#d4e2df] h-14 bg-[image:--select-button-svg] placeholder:text-[#5c8a7d] p-[15px] text-base font-normal leading-normal"
                value={targetStudent}
                onChange={e => setTargetStudent(e.target.value)}
                required
              >
                <option value="">Select target students</option>
                {TARGET_STUDENTS.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </label>
          </div>
          {/* Preferred Language */}
          <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
            <label className="flex flex-col min-w-40 flex-1">
              <p className="text-[#101816] text-base font-medium leading-normal pb-2">Preferred Language</p>
              <select
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#101816] focus:outline-0 focus:ring-0 border border-[#d4e2df] bg-[#f9fbfa] focus:border-[#d4e2df] h-14 bg-[image:--select-button-svg] placeholder:text-[#5c8a7d] p-[15px] text-base font-normal leading-normal"
                value={language}
                onChange={e => setLanguage(e.target.value)}
                required
              >
                <option value="">Select preferred language</option>
                {LANGUAGES.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </label>
          </div>
          {/* Available Time */}
          <h3 className="text-[#101816] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">Available Time</h3>
          <div className="px-4">
            {TIME_SLOTS.map(slot => (
              <label key={slot.label} className="flex gap-x-3 py-3 flex-row">
                <input
                  type="checkbox"
                  className="h-5 w-5 rounded border-[#d4e2df] border-2 bg-transparent text-[#a3e0d0] checked:bg-[#a3e0d0] checked:border-[#a3e0d0] checked:bg-[image:--checkbox-tick-svg] focus:ring-0 focus:ring-offset-0 focus:border-[#d4e2df] focus:outline-none"
                  checked={selectedTimeSlots.includes(slot.label)}
                  onChange={() => handleTimeSlotChange(slot.label)}
                />
                <p className="text-[#101816] text-base font-normal leading-normal">{slot.label}</p>
              </label>
            ))}
            <label className="flex gap-x-3 py-3 flex-row items-center">
              <input
                type="checkbox"
                className="h-5 w-5 rounded border-[#d4e2df] border-2 bg-transparent text-[#a3e0d0] checked:bg-[#a3e0d0] checked:border-[#a3e0d0] checked:bg-[image:--checkbox-tick-svg] focus:ring-0 focus:ring-offset-0 focus:border-[#d4e2df] focus:outline-none"
                checked={otherChecked}
                onChange={handleOtherCheckbox}
              />
              <p className="text-[#101816] text-base font-normal leading-normal">Other</p>
              {otherChecked && (
                <div className="flex gap-2 items-center ml-2">
                  <input
                    type="time"
                    className="form-input w-28 rounded-xl border border-[#d4e2df] bg-[#f9fbfa] text-base text-[#101816] px-2"
                    value={otherFrom}
                    onChange={e => setOtherFrom(e.target.value)}
                  />
                  <span className="text-[#101816] text-base font-normal">to</span>
                  <input
                    type="time"
                    className="form-input w-28 rounded-xl border border-[#d4e2df] bg-[#f9fbfa] text-base text-[#101816] px-2"
                    value={otherTo}
                    onChange={e => setOtherTo(e.target.value)}
                  />
                </div>
              )}
            </label>
          </div>
          {/* Available Days */}
          <h3 className="text-[#101816] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">Available Days</h3>
          <div className="px-4">
            {DAYS.map(day => (
              <label key={day} className="flex gap-x-3 py-3 flex-row">
                <input
                  type="checkbox"
                  className="h-5 w-5 rounded border-[#d4e2df] border-2 bg-transparent text-[#a3e0d0] checked:bg-[#a3e0d0] checked:border-[#a3e0d0] checked:bg-[image:--checkbox-tick-svg] focus:ring-0 focus:ring-offset-0 focus:border-[#d4e2df] focus:outline-none"
                  checked={days.includes(day)}
                  onChange={() => handleDayChange(day)}
                />
                <p className="text-[#101816] text-base font-normal leading-normal">{day}</p>
              </label>
            ))}
          </div>

          {/* Okay with Diversity & Disability */}
          <h3 className="text-[#101816] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">Preferences</h3>
          <div className="px-4">
            <label className="flex gap-x-3 py-2 flex-row items-center">
              <input
                type="checkbox"
                className="h-5 w-5 rounded border-[#d4e2df] border-2 bg-transparent text-[#1fe0ab] checked:bg-[#1fe0ab] checked:border-[#1fe0ab] focus:ring-0 focus:ring-offset-0 focus:border-[#d4e2df] focus:outline-none"
                checked={okWithDiversity}
                onChange={() => setOkWithDiversity(!okWithDiversity)}
              />
              <p className="text-[#101816] text-base font-normal leading-normal">Okay with Diversity</p>
            </label>
            <label className="flex gap-x-3 py-2 flex-row items-center">
              <input
                type="checkbox"
                className="h-5 w-5 rounded border-[#d4e2df] border-2 bg-transparent text-[#1fe0ab] checked:bg-[#1fe0ab] checked:border-[#1fe0ab] focus:ring-0 focus:ring-offset-0 focus:border-[#d4e2df] focus:outline-none"
                checked={okWithDisability}
                onChange={() => setOkWithDisability(!okWithDisability)}
              />
              <p className="text-[#101816] text-base font-normal leading-normal">Okay with Disability</p>
            </label>
          </div>

          {/* Terms */}
          <h3 className="text-[#101816] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">Terms &amp; Conditions</h3>
          <div className="px-4">
            <label className="flex gap-x-3 py-3 flex-row">
              <input
                type="checkbox"
                className="h-5 w-5 rounded border-[#d4e2df] border-2 bg-transparent text-[#a3e0d0] checked:bg-[#a3e0d0] checked:border-[#a3e0d0] checked:bg-[image:--checkbox-tick-svg] focus:ring-0 focus:ring-offset-0 focus:border-[#d4e2df] focus:outline-none"
                checked={terms}
                onChange={() => setTerms(!terms)}
              />
              <p className="text-[#101816] text-base font-normal leading-normal">I agree to the terms and conditions</p>
            </label>
          </div>
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
              <span className="truncate">{loading ? "Submitting..." : "Submit Application"}</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
