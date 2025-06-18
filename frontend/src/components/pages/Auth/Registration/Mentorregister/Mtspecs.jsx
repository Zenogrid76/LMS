import React, { useState } from "react";

// Example options; replace or fetch as needed
const expertiseOptions = [
  "Mathematics", "Physics", "Chemistry", "Biology", "Computer Science",
  "Business", "Economics", "Languages", "Arts", "Other"
];
const skillOptions = [
  "Algebra", "React.js", "Public Speaking", "Data Analysis", "Writing", "Leadership", "Other"
];
const teachingMethods = ["1:1", "Group"];
const batchSizes = [2, 3, 5, 10];
const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const timesOfDay = ["Morning", "Afternoon", "Evening"];

const Mtspecs = ({ onBack, onNext, initialData = {} }) => {
  const [form, setForm] = useState({
    expertise: initialData.expertise || [],
    skills: initialData.skills || [],
    teachingMethods: initialData.teachingMethods || [],
    batchSize: initialData.batchSize || "",
    availabilityDays: initialData.availabilityDays || [],
    availabilityTimes: initialData.availabilityTimes || [],
    philosophy: initialData.philosophy || "",
  });

  const handleMultiSelect = (name, value) => {
    setForm((prev) => ({
      ...prev,
      [name]: prev[name].includes(value)
        ? prev[name].filter((v) => v !== value)
        : [...prev[name], value],
    }));
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? !prev[name] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add validation as needed
    onNext(form);
  };

  return (
    <div className="min-h-screen bg-[#F7FAFA] font-['Lexend'] flex flex-col items-center">
      <main className="w-full max-w-4xl py-8">
        {/* Progress Bar */}
        <div className="flex flex-col gap-2 px-4 mt-4">
          <div className="flex flex-row items-center justify-between">
            <span className="text-base font-medium text-[#0D1C17]">
              Step 2 of 4
            </span>
          </div>
          <div className="w-full h-2 bg-[#D1E6E0] rounded">
            <div className="h-2 rounded bg-[#1FE0AB]" style={{ width: "50%" }} />
          </div>
        </div>

        {/* Heading */}
        <h2 className="text-3xl font-bold text-[#0D1C17] mt-8 mb-6 px-4">
          What are your mentorship specifications?
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-8">

          {/* Areas of Expertise */}
          <div className="w-full max-w-xl flex flex-col gap-2 px-4">
            <label className="font-bold text-lg text-[#0D1C17]">Areas of Expertise</label>
            <span className="font-medium text-base text-[#0D1C17] mb-1">
              Select your areas of expertise
            </span>
            <div className="flex flex-wrap gap-2">
              {expertiseOptions.map((option) => (
                <button
                  type="button"
                  key={option}
                  className={`px-4 py-2 rounded-xl border ${form.expertise.includes(option) ? "bg-[#1FE0AB] text-[#0D1C17]" : "bg-[#F7FAFA] border-[#D1E6E0] text-[#4F9682]"} font-medium`}
                  onClick={() => handleMultiSelect("expertise", option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {/* Subjects/Skills */}
          <div className="w-full max-w-xl flex flex-col gap-2 px-4">
            <label className="font-bold text-lg text-[#0D1C17]">Subjects/Skills</label>
            <span className="font-medium text-base text-[#0D1C17] mb-1">
              Select subjects/skills
            </span>
            <div className="flex flex-wrap gap-2">
              {skillOptions.map((option) => (
                <button
                  type="button"
                  key={option}
                  className={`px-4 py-2 rounded-xl border ${form.skills.includes(option) ? "bg-[#1FE0AB] text-[#0D1C17]" : "bg-[#F7FAFA] border-[#D1E6E0] text-[#4F9682]"} font-medium`}
                  onClick={() => handleMultiSelect("skills", option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {/* Preferred Teaching Methods */}
          <div className="w-full max-w-xl flex flex-col gap-2 px-4">
            <label className="font-bold text-lg text-[#0D1C17]">Preferred Teaching Methods</label>
            <div className="flex flex-wrap gap-2">
              {teachingMethods.map((method) => (
                <button
                  type="button"
                  key={method}
                  className={`px-4 py-2 rounded-xl border ${form.teachingMethods.includes(method) ? "bg-[#1FE0AB] text-[#0D1C17]" : "bg-[#F7FAFA] border-[#D1E6E0] text-[#4F9682]"} font-medium`}
                  onClick={() => handleMultiSelect("teachingMethods", method)}
                >
                  {method}
                </button>
              ))}
            </div>
          </div>

          {/* Batch Size (if Group selected) */}
          {form.teachingMethods.includes("Group") && (
            <div className="w-full max-w-xl flex flex-col gap-2 px-4">
              <label className="font-bold text-lg text-[#0D1C17]">Batch Size</label>
              <span className="font-medium text-base text-[#0D1C17] mb-1">
                Select batch size
              </span>
              <select
                name="batchSize"
                value={form.batchSize}
                onChange={handleChange}
                className="p-3 bg-[#F7FAFA] border border-[#D1E6E0] rounded-xl text-[#0D1C17] focus:outline-none"
              >
                <option value="">Select</option>
                {batchSizes.map((size) => (
                  <option key={size} value={size}>{size}</option>
                ))}
              </select>
            </div>
          )}

          {/* Weekly Availability - Days */}
          <div className="w-full max-w-xl flex flex-col gap-2 px-4">
            <label className="font-bold text-lg text-[#0D1C17]">Weekly Availability</label>
            <span className="font-medium text-base text-[#0D1C17] mb-1">
              Select days
            </span>
            <div className="flex flex-wrap gap-2">
              {daysOfWeek.map((day) => (
                <button
                  type="button"
                  key={day}
                  className={`px-4 py-2 rounded-xl border ${form.availabilityDays.includes(day) ? "bg-[#1FE0AB] text-[#0D1C17]" : "bg-[#F7FAFA] border-[#D1E6E0] text-[#4F9682]"} font-medium`}
                  onClick={() => handleMultiSelect("availabilityDays", day)}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>

          {/* Weekly Availability - Times */}
          <div className="w-full max-w-xl flex flex-col gap-2 px-4">
            <span className="font-medium text-base text-[#0D1C17] mb-1">
              Select times
            </span>
            <div className="flex flex-wrap gap-2">
              {timesOfDay.map((time) => (
                <button
                  type="button"
                  key={time}
                  className={`px-4 py-2 rounded-xl border ${form.availabilityTimes.includes(time) ? "bg-[#1FE0AB] text-[#0D1C17]" : "bg-[#F7FAFA] border-[#D1E6E0] text-[#4F9682]"} font-medium`}
                  onClick={() => handleMultiSelect("availabilityTimes", time)}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>

          {/* Teaching Philosophy */}
          <div className="w-full max-w-xl flex flex-col gap-2 px-4">
            <label className="font-bold text-lg text-[#0D1C17]">Teaching Philosophy</label>
            <span className="font-medium text-base text-[#0D1C17] mb-1">
              Briefly describe your teaching philosophy
            </span>
            <textarea
              name="philosophy"
              value={form.philosophy}
              onChange={handleChange}
              maxLength={300}
              placeholder="Share your core beliefs and approach to mentoring..."
              className="w-full p-3 bg-[#F7FAFA] border border-[#D1E6E0] rounded-xl min-h-[120px] text-[#0D1C17] focus:outline-none"
              required
            />
            <div className="text-right text-xs text-[#4F9682]">
              {form.philosophy.length}/300 characters
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex flex-row justify-between w-full max-w-xl mt-4 px-4">
            <button
              type="button"
              className="px-6 py-3 bg-[#E8F2F0] rounded-full text-sm font-bold text-[#0D1C17] hover:bg-[#d1e6e0] transition"
              onClick={onBack}
            >
              Back
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-[#1FE0AB] rounded-full text-sm font-bold text-[#0D1C17] hover:bg-[#13c89a] transition"
            >
              Next
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default Mtspecs;
