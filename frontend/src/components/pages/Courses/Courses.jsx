import React from "react";
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import { Link } from 'react-router-dom'; // Import Link for navigation
import PopularCoursesSection from "../Home/PopularCoursesSection";

export default function Courses() {

return (
<div className="bg-[#F8F9FB] min-h-screen flex flex-col w-full flex-2 font-lexend">
    
    <PopularCoursesSection />
    </div>
)
}

