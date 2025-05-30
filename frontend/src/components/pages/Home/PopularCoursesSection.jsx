import React from "react";

const courses = [
  {
    title: "Mathematics Fundamentals",
    teacher: "Dr. Eleanor Harper",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
  },
  {
    title: "Introduction to Programming",
    teacher: "Prof. Samuel Bennett",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80",
  },
  {
    title: "Advanced Science Concepts",
    teacher: "Dr. Olivia Carter",
    image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80",
  },
  {
    title: "Data Analysis Techniques",
    teacher: "Prof. Ethan Walker",
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
  },
];

export default function PopularCoursesSection() {
  return (
    <section className="w-full max-w-[1280px] mx-auto py-10">
      <h2 className="text-2xl font-bold mb-6">Most Popular Courses Right Now</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 items-stretch ">
        {courses.map((course) => (
          <div key={course.title} className="bg-white rounded-xl shadow-sm overflow-hidden flex flex-col hover:scale-110 + transition">
            <img src={course.image} alt={course.title} className="w-full h-50 object-cover" />
            <div className="p-4">
              <div className="font-semibold text-base">{course.title}</div>
              <div className="text-sm text-gray-500">{course.teacher}</div>
            </div>
          </div>
        ))}
        </div>
        {/* Button aligned with last card */}
        <div className="hidden md:flex col-span-1 items-last justify-end mt-5">
          <button className="px-4 py-2 bg-[#1fdeabcb] text-white font-semibold rounded hover:bg-[#19be94] transition">
            View All Courses
          </button>
        </div>
      
      {/* For mobile, show the button below the grid */}
      <div className="flex md:hidden justify-center mt-6">
        <button className="px-4 py-2 bg-[#1fdeabcb] text-white font-semibold rounded hover:bg-[#19be94] transition">
          View All Courses
        </button>
      </div>
    </section>
  );
}
